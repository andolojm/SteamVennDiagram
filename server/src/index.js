const http = require("http");
const steam = require("./steam");

const hostname = "127.0.0.1";
const port = 3001;

const server = http.createServer(async (request, response) => {
  const requestURL = new URL(request.url, `http://${request.headers.host}`);

  if (requestURL.pathname == "/getOwnedGames") {
    const steamId = requestURL.searchParams.get("id");
    console.log(`Request for SteamID (${steamId}) recieved`);

    const apiData = await steam.getOwnedGames(steamId);

    sendResponse(response, apiData);
    console.log(`Request for SteamID (${steamId}) handled`);
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
