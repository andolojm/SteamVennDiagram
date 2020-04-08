const fs = require("fs");
const axios = require("axios");
const Cache = require("./cache");

let STEAM_API_KEY;
const cache = new Cache();

const readFile = async (err, data) => {
  if (err) throw err;

  STEAM_API_KEY = data.trim();
};

fs.readFile("../.key", "utf8", readFile);

const getOwnedGames = async id => {
  if (!STEAM_API_KEY) {
    throw Error("Cannot read key");
  }

  if (!id) {
    throw Error("Querying steam Requires a steam ID");
  }

  const cachedValue = getOwnedGamesFromCache(id);
  if (cachedValue) return cachedValue;

  const apiValue = await getOwnedGamesFromSteamAPI(id);
  saveApiValueToCache(id, apiValue);
  return apiValue;
};

const saveApiValueToCache = (id, data) => {
  return cache.put(id, data);
};

const getOwnedGamesFromCache = id => {
  return cache.get(id);
};

const getOwnedGamesFromSteamAPI = async id => {
  console.log(`Querying Steam API for SteamID: ${id}`);

  try {
    const response = await axios.get(formatAPIUrl(id));
    const games = response.data.response.games;

    return games
      ? games
          .map(game => ({ name: game.name, playtime: game.playtime_forever }))
          .sort((a, b) => b.playtime - a.playtime)
      : [];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const formatAPIUrl = id =>
  `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`;

module.exports = { getOwnedGames };
