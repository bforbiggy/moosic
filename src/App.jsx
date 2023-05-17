import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [dir, setDir] = useState([]);

  async function get_files() {
    const arr = await invoke('get_files', { dir: "./" });
    setDir(arr);
  }

  async function play_music(dir) {
    invoke('start_music', { dir: dir });
  }

  useEffect(() => {
    get_files();
    play_music("src/uwu.mp3");
  }, [])

  return (
    <div className="container">
      <h1>Welcome to Moosic!</h1>
      {dir.map(e =>
        <div key={e}>
          {e}
        </div>)}

    </div>
  );
}

export default App;
