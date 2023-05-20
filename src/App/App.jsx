import { useEffect, useState } from "react";
import "./App.scss";
import { getFiles, pauseMusic, playMusic, startMusic } from "../lib/Music"
import { isAudio, openFolder } from "../lib/Util";
import {
  AiOutlinePlayCircle, AiOutlinePauseCircle, AiOutlineFolderAdd
} from "react-icons/ai"


function App() {
  const [dirs, setDirs] = useState([]);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    playing ? pauseMusic() : playMusic();
    setPlaying(!playing);
  };

  const addFolderHandler = () => {
    openFolder().then(res => {
      if (dirs.includes(res))
        return;

      setDirs([...dirs, res])
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to Moosic!</h1>
        <AiOutlineFolderAdd
          onClick={addFolderHandler} />
      </div>


      <div className="dir">
        {
          dirs.map(d => <div key={d}>
            {d}
          </div>)
        }
      </div>

      {/* {dir.map(e =>
        <div key={e} data={e} onClick={(event) => { startMusic(event.target.getAttribute('data')); setPlaying(true) }}>
          {e}
        </div>)} */}

      <div className="playbar">
        {playing ? <AiOutlinePauseCircle onClick={togglePlay} /> : <AiOutlinePlayCircle onClick={togglePlay} />}

      </div>

    </div>
  );
}

export default App;
