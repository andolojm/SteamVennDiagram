import React, { useState, useEffect } from "react";
import "./App.css";
import Service from "./service";

let service;
function App() {
  const [apiData, setApiData] = useState([]);

  const getOwnedGames = async () =>
    setApiData(await service.getOwnedGames("76561198017600882"));

  useEffect(() => {
    service = new Service("http://localhost:3001");
    // test steamid: 76561198017600882

    getOwnedGames();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{apiData && apiData.map(entry => <div>{entry.name}</div>)}</p>
      </header>
    </div>
  );
}

export default App;
