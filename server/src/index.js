const http = require("http");
const steam = require("./steam");

const hostname = "127.0.0.1";
const port = 3001;

const server = http.createServer(async (request, response) => {
  const requestURL = new URL(request.url, `http://${request.headers.host}`);

  if (requestURL.pathname == "/getOwnedGames") {
    const apiData = await steam.getOwnedGames(
      requestURL.searchParams.get("id")
    );

    sendResponse(response, apiData);
  } else {
    sendResponse(response, {});
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const sendResponse = (response, body) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.end(JSON.stringify(body));
};
