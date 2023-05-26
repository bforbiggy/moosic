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
  });
  const [menu, setMenu] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loadedConfig, setLoadedConfig] = useState(false);

  const contextMemo = useMemo(() => {
    if (loadedConfig)
      saveConfig(moosic);
    return [moosic, setMoosic]
  }, [moosic]);

  useEffect(() => {
    loadConfig().then(config => {
      if (config !== undefined)
        setMoosic({ ...moosic, ...config });
      setLoadedConfig(true);
    }
    );
  }, [])

  return (
    <div className="container">
      <Moosic.Provider value={contextMemo}>
        <Menu menu={menu} setMenu={setMenu} />
        <MusicList setPlaying={setPlaying} />
        <Playbar playing={playing} setPlaying={setPlaying} />
      </Moosic.Provider>
    </div>

  );
}

export default App;
export { Moosic }