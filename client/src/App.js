import React, { useState, useEffect } from "react";
import deleteIcon from "./delete.svg";
import Service from "./service";

let service;

const SAMPLE_STEAM_IDS = ["76561198039881304", "76561198085985595"];

function App() {
  const [apiData, setApiData] = useState([]);
  //todo fix in next commit
  //eslint-disable-next-line
  const [steamIds, setSteamIds] = useState(SAMPLE_STEAM_IDS);

  useEffect(() => {
    service = new Service("http://localhost:3001");
  }, []);

  useEffect(() => {
    const getOwnedGames = async users => {
      Promise.all(
        users.map(async user => await service.getOwnedGames(user))
      ).then(setApiData);
    };

    getOwnedGames(steamIds);
  }, [steamIds]);

  return (
    <div className="app">
      <header className="header"></header>
      <section className="content">
        <div className="fullheight">
          <div className="spinner">
            {fireEmoji()} STEAM VENN DIAGRAM {fireEmoji()}
          </div>
          <p className="after-spinner">yes hello welcome</p>
          <p>enter steam IDs below</p>
          <div className="steamid-container">
            {steamIds.map(steamId => (
              <div className="steamid">
                <input className="steamid-input" type="text" value={steamId} />
                <button className="delete-button">
                  <img
                    src={deleteIcon}
                    className="delete-button-icon"
                    alt="delete"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        {steamIds && steamIds.map(entry => <div>SteamID: {entry}</div>)}
        {apiData &&
          apiData.map(entry => (
            <div>
              {entry.map(row => (
                <div>{row.name}</div>
              ))}
            </div>
          ))}
        <div></div>
      </section>
    </div>
  );
}

const fireEmoji = () => (
  <span role="img" aria-label="fire emoji">
    🔥
  </span>
);

export default App;
