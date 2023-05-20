import { createContext, useState, useMemo } from "react";
import "./App.scss";
import { getMusicFiles, openFolder } from "../lib/Util";
import { AiOutlineFolderAdd } from "react-icons/ai"
import Playbar from "./components/Playbar";
import MusicList from "./components/MusicList"
import Directories from "./components/Directories";

const MusicContext = createContext();

function App() {
  const [musicContext, setMusicContext] = useState({
    loaded: {},
    playing: false,
  });
  const contextMemo = useMemo(() => [musicContext, setMusicContext], [musicContext, setMusicContext]);

  const addFolderHandler = () => {
    openFolder().then(folder => {
      // Ignore already opended directories
      if (Object.keys(musicContext.loaded).includes(folder))
        return;

      // Load folder and all songs within
      getMusicFiles(folder).then(songs =>
        setMusicContext({
          ...musicContext,
          loaded: {
            ...musicContext.loaded,
            [folder]: songs
          }
        })
      );
    });
  };


  return (
    <div className="container">
      <MusicContext.Provider value={contextMemo}>
        <div className="header">
          <h1>Welcome to Moosic!</h1>
          <AiOutlineFolderAdd onClick={addFolderHandler} />
        </div>

        <Directories />
        <MusicList />
        <Playbar />
      </MusicContext.Provider>
    </div>

  );
}

export default App;
export { MusicContext }