import { createContext, useState, useMemo, useEffect } from "react";
import "./App.scss";
import Menu from "../core/Menu/Menu";
import Playbar from "./components/Playbar";
import MusicList from "./components/MusicList"
import { loadConfig, saveConfig } from "../lib/Util";

const Moosic = createContext();

function App() {
  const [moosic, setMoosic] = useState({
    loaded: {},
    playing: false,
    loadedConfig: false,
  });
  const [menu, setMenu] = useState(false);

  const contextMemo = useMemo(() => {
    if (moosic.loadedConfig)
      saveConfig(moosic);
    return [moosic, setMoosic]
  }, [moosic]);

  useEffect(() => {
    loadConfig().then(config =>
      setMoosic({
        ...config,
        loadedConfig: true
      })
    );
  }, [])

  return (
    <div className="container">
      <Moosic.Provider value={contextMemo}>
        <Menu menu={menu} setMenu={setMenu} />
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