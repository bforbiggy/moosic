import { useEffect, useState } from "react";
import "./App.scss";
import { getFiles, pauseMusic, playMusic, startMusic } from "../lib/Music"
import { isAudio, openFolder } from "../lib/Util";
import {
  AiOutlinePlayCircle, AiOutlinePauseCircle, AiFillFolderOpen
} from "react-icons/ai"


function App() {
  const [dir, setDir] = useState([]);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    playing ? pauseMusic() : playMusic();
    setPlaying(!playing);
  }

  useEffect(() => {
    getFiles(setDir);
  }, [])

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to Moosic!</h1>
        <AiFillFolderOpen onClick={openFolder} />
      </div>

      {dir.filter(e => isAudio(e)).map(e =>
        <div key={e} data={e} onClick={(event) => { startMusic(event.target.getAttribute('data')); setPlaying(true) }}>
          {e}
        </div>)}

      <div className="playbar">
        {playing ? <AiOutlinePauseCircle onClick={togglePlay} /> : <AiOutlinePlayCircle onClick={togglePlay} />}

      </div>

    </div>
  );
}

export default App;
