# How to set up HTTPS on localhost

__Note:__ This setup is necessary for the running of the `speech-api` section of the seminar.

## Step 1: Generate a CA certificate

Create a directory structure outside your project. 

__Note:__ __never__ share your own certificates, keys, etc. or commit them to version control!

__Note:__ on Windows, the below commands might hang or run into other issues when using Git Bash. Prefix your `openssl` commands with the `winpty` command in order to prevent these issues.

```
mkdir cert
cd cert
mkdir CA
cd CA
```

For the next step, a passphrase will be used. Remember to note it down! Use OpenSSL for this purpose.

```
openssl genrsa -out CA.key -des3 2048
```

## Step 2: Generating a certificate

Create a directory for localhost:

```
mkdir localhost
cd localhost
touch localhost.ext
```

Add the below content to the `localhost.ext` file:

```
authorityKeyIdentifier = keyid,issuer
basicConstraints = CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
IP.1 = 127.0.0.1
```

Now, let's generate a key:

```
openssl genrsa -out localhost.key -des3 2048
```

Now, let's create a CSR (certificate signing request):

```
openssl req -new -key localhost.key -out localhost.csr
```

Since we are the CA, we can fulfil the request using the below commands:

```
$ openssl x509 -req -in localhost.csr -CA ../CA.pem -CAkey ../CA.key -CAcreateserial -days 3650 -sha256 -extfile localhost.ext -out localhost.crt
```

Let's also export the key, since we will need it to decrypt the .crt file:

```
openssl rsa -in localhost.key -out localhost.decrypted.key
```

Save the .cer and .key files into a known location, in order to be easily accessible at step 4.

## Step 3: Trust your local CA (Windows)

While you have created a CA, it is not yet a trusted CA. You must add it to your system trusted root certification authorities:

1. Type `Manage computer certificates` into Windows search
2. Launch application `certlm` that shows up
3. Accept the UAC prompt
4. Navigate to `Trusted Root Certification Authorities`
5. Right click on `Certificates` and choose `All tasks` > `Import`
6. A wizard will start guiding you through the import process. Import the root CA (`CA.pem`), not the certificate you have issued!

## Step 4: Launch a local `http-server`

To launch http-server with HTTPS, in the root directory of the application, issue the command:

```
http-server -S -C <path to .crt> -o -K <path to decrypted .key>
```

__Note:__ there is no requirement for the certificate and the key to be present in the directory. In fact, it is best to keep them in a safe place, outside the application file structure.

## References

1. SpeechRecognition network error when working with electron / chromium browser, https://stackoverflow.com/questions/47226889/speechrecognition-network-error-when-working-with-electron-chromium-browser
2. How to Get SSL HTTPS for Localhost, https://www.section.io/engineering-education/how-to-get-ssl-https-for-localhost/