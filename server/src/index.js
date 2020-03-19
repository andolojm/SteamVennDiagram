const http = require("http");
const steam = require("./steam");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (request, response) => {
  const requestURL = new URL(request.url, `http://${request.headers.host}`);

  switch (requestURL.pathname) {
    case "/":
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ hello: "world" }));

    case "/getOwnedGames":
      // test steamid: 76561198017600882
      const responseBody = await steam.getOwnedGames(
        requestURL.searchParams.get("id")
      );

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(responseBody));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
