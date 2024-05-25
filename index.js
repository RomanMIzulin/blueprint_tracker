"use strict";
const server = Bun.serve({
    port: 8800,
    fetch(req) {
        return new Response(Bun.file("src/index.html"));
    },
});
console.log(`Listening on http://localhost:${server.port} ...`);
console.log("Hello via Bun!");
