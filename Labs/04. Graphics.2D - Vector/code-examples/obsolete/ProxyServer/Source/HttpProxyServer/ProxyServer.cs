// Copyright (c) 2012, Cristian IONITA
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
using System;
using System.IO;
using System.Net;

namespace HttpProxyServer
{
    class ProxyServer
    {
        const int ListenerThreads = 3;
        const int MaxResponseLength = 1024 * 1024;  // 1mb

        HttpListener listener;
        
        #region Public interface: Start, Stop
        public void Start()
        {
            this.listener = new HttpListener();
            this.listener.Prefixes.Add(HttpProxyServer.Properties.Settings.Default.ServerUrl);
            this.listener.Start();

            for (int i = 0; i < ListenerThreads; i++)
            {
                this.listener.BeginGetContext(this.AsyncHandler, null);
            }
        }

        public void Stop()
        {
            this.listener.Close();
        }
        #endregion

        #region Request processing
        private void AsyncHandler(IAsyncResult target)
        {
            try
            {
                HttpListenerContext context = null;
                lock (this.listener)
                {
                    try
                    {
                        context = this.listener.EndGetContext(target);
                        listener.BeginGetContext(
                            new AsyncCallback(this.AsyncHandler), null);
                    }
                    catch (HttpListenerException exception)
                    {
                        LogError(exception);
                    }
                }
                if (context != null)
                {
                    HttpListenerResponse response = context.Response;

                    // Check for query string
                    string uri = context.Request.Url.Query;
                    if (uri.StartsWith("?"))
                    {
                        uri = uri.Remove(0, 1);
                    }
                    uri = Uri.UnescapeDataString(uri);
                    if (string.IsNullOrWhiteSpace(uri))
                    {
                        response.StatusCode = 403;
                        context.Response.OutputStream.Close();
                        return;
                    }

                    // Create web request
                    WebRequest webRequest = WebRequest.Create(new Uri(uri));

                    if (!string.IsNullOrWhiteSpace(HttpProxyServer.Properties.Settings.Default.ProxyServerUrl))
                    {
                        webRequest.Proxy = new WebProxy(HttpProxyServer.Properties.Settings.Default.ProxyServerUrl);
                    }

                    webRequest.Method = context.Request.HttpMethod;

                    // Send the request to the server
                    WebResponse serverResponse = null;
                    try
                    {
                        serverResponse = webRequest.GetResponse();
                    }
                    catch (WebException webExc)
                    {
                        response.StatusCode = 500;
                        response.StatusDescription = webExc.Status.ToString();
                        context.Response.OutputStream.Close();
                        return;
                    }

                    // Exit if invalid response
                    if (serverResponse == null)
                    {
                        response.StatusCode = 500;
                        response.StatusDescription = "ERROR: Invalid server response.";
                        context.Response.OutputStream.Close();
                        return;
                    }

                    // Exit if response is too big
                    if (serverResponse.ContentLength > MaxResponseLength)
                    {
                        response.StatusCode = 500;
                        response.StatusDescription = "ERROR: Response is too big.";
                        context.Response.OutputStream.Close();
                        return;
                    }

                    // Configure reponse                     
                    response.ContentType = serverResponse.ContentType;
                    response.Headers.Add("Access-Control-Allow-Origin", "*");
                    response.Headers.Add("Access-Control-Allow-Headers", "*");
                    response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");
                    response.Headers.Add("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");

                    using (Stream responseStream = serverResponse.GetResponseStream())
                    {
                        responseStream.CopyTo(response.OutputStream);
                    }

                    response.OutputStream.Close();
                }
            }
            catch (Exception exception)
            {
                LogError(exception);
            }
        }
        #endregion

        #region Utilities: LogError
        private void LogError(Exception exception)
        {
            Console.WriteLine("ERROR: {0}", exception.Message);
        }
        #endregion
    }
}
