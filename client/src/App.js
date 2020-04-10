import React, { useReducer, useEffect } from "react";
import deleteIcon from "./delete.svg";
import Service from "./service";

const service = new Service("http://localhost:3001");

const initialState = {
  userData: {
    "76561198039881304": [],
    "76561198085985595": []
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "setApiData":
      const newState = {
        ...initialState,
        userData: {
          ...state.userData,
          [action.data.steamId]: action.data.apiResponse
        }
      };

      return newState;

    case "changeSteamId":
      //todo
      return initialState;

    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const steamIds = Object.keys(state.userData);
  const steamIdHashForComparison = steamIds.join();

  useEffect(() => {
    queryAPIForGamesOwned(steamIds, dispatch);

    /* eslint-disable react-hooks/exhaustive-deps */
    // This is needed because useEffect hooks don't properly compare arrays, so we pass a string representation to compare
  }, [steamIdHashForComparison]);

  return (
    <div className="app">
      <LeftNav steamIds={steamIds} />
      {steamIds.map(steamId => (
        <SteamIDHeader key={steamId} steamId={steamId} />
      ))}
      {steamIds.map(steamId => (
        <GamesList key={steamId} games={state.userData[steamId]} />
      ))}
      <div></div>
    </div>
  );
}

const GamesList = props => (
  <div>
    {props.games.map(game => (
      <GameEntry key={`${game.name}-${props.key}`} game={game} />
    ))}
  </div>
);

const GameEntry = props => <div>{props.game.name}</div>;

const SteamIDHeader = props => <div>SteamID: {props.steamId}</div>;

const LeftNav = props => (
  <header className="fullheight">
    <div className="spinner">
      {fireEmoji()} STEAM VENN DIAGRAM {fireEmoji()}
    </div>
    <p className="after-spinner">yes hello welcome</p>
    <p>enter steam IDs below</p>
    <div className="steamid-container">
      {Object.keys(props.steamIds).map(key => (
        <div className="steamid">
          <input
            className="steamid-input"
            type="text"
            value={props.steamIds[key]}
          />
          <button className="delete-button">
            <img src={deleteIcon} className="delete-button-icon" alt="delete" />
          </button>
        </div>
      ))}
    </div>
  </header>
);

const fireEmoji = () => (
  <span role="img" aria-label="fire emoji">
    🔥
  </span>
);

const queryAPIForGamesOwned = async (steamIdList, dispatch) => {
  for (const steamId of steamIdList) {
    const apiResponse = await service.getOwnedGames(steamId);
    dispatch({ type: "setApiData", data: { steamId, apiResponse } });
  }
};

export default App;
