self.addEventListener("fetch", (event) => {
      // Intercept all requests and serve an empty response
      if (event.request.url.includes("https://server.kalbelajobs.com/api/v1")) {
            event.respondWith(
                  new Response(JSON.stringify({ message: "Intercepted request" }), {
                        headers: { "Content-Type": "application/json" },
                  })
            );
      }
});
