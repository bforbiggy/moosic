import { createContext, useState, useMemo, useEffect } from "react";
import "./App.scss";
import Menu from "../core/Menu/Menu";
import Playbar from "../core/Playbar/Playbar";
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
    window.moosic = moosic;
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
    <>
      <Moosic.Provider value={contextMemo}>
        <Menu menu={menu} setMenu={setMenu} />
        <div className="container">

          <MusicList setPlaying={setPlaying} />
          <Playbar playing={playing} setPlaying={setPlaying} />
        </div>
      </Moosic.Provider>
    </>

  );
}

export default App;
export { Moosic }