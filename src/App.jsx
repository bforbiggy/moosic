import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

const formats = ['.ogg', '.mp3', '.wav'];
function isAudio(fileName) {
  for (let format of formats) {
    if (fileName.endsWith(format))
      return true;
  }
  return false;
}

function App() {
  const [dir, setDir] = useState([]);

  async function get_files() {
    const arr = await invoke('get_files', { dir: "./" });
    setDir(arr);
  }

  async function start_music(event) {
    let dir = event.target.getAttribute('data');
    invoke('start_music', { dir: dir });
  }

  useEffect(() => {
    get_files();
  }, [])

  return (
    <div className="container">
      <h1>Welcome to Moosic!</h1>
      {dir.filter(e => isAudio(e)).map(e =>
        <div key={e} data={e} onClick={start_music}>
          {e}
        </div>)}
    </div>
  );
}

export default App;
