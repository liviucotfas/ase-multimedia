self.addEventListener("install", function() {
  console.log("install");
  //throw 'error';  fdfds
});

self.addEventListener("activate", function() {
  console.log("activate");
});

self.addEventListener("fetch", function(event) {
  if (event.request.url.includes("bootstrap.min.css")) {
    console.log("Fetch request for:", event.request.url);
    event.respondWith(
      new Response(
        ".hotel-slogan {background: green!important;} nav {display:none}",
        { headers: { "Content-Type": "text/css" }}
      )
    );
  }
});