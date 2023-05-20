import "./MusicList.scss";
import { useContext } from "react";
import { MusicContext } from "../App";
import { startMusic } from "../../lib/Music"


const MusicList = () => {
	const [musicContext, setMusicContext] = useContext(MusicContext);

	const songs = [];
	for (let key in musicContext.loaded) {
		const dirSongs = musicContext.loaded[key];
		songs.push(...dirSongs)
	}

	const songClickHandler = (event) => {
		startMusic(event.target.getAttribute('data'));
		setMusicContext({
			...musicContext,
			playing: true
		})
	};

	return <div className="music">
		{songs.map(song => <div key={song} data={song} onClick={songClickHandler}> {song}</div>)}
	</div>
}

export default MusicList;