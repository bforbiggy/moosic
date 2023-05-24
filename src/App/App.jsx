import { createContext, useState, useMemo } from "react";
import "./App.scss";
import Menu from "../core/Menu/Menu";
import Playbar from "./components/Playbar";
import MusicList from "./components/MusicList"

const Moosic = createContext();

function App() {
  const [moosic, setMoosic] = useState({
    loaded: {},
    playing: false,
    menu: false,
  });
  const contextMemo = useMemo(() => [moosic, setMoosic], [moosic, setMoosic]);

  return (
    <div className="container">
      <Moosic.Provider value={contextMemo}>
        <Menu />
        <div className="header">
          <h1>Welcome to Moosic!</h1>
        </div>
        <MusicList />
        <Playbar />
      </Moosic.Provider>
    </div>

  );
}

export default App;
export { Moosic }