import "./MusicList.scss";
import { useContext } from "react";
import { Moosic } from "../App";
import { startMusic } from "../../lib/Music"
import { extractFileName } from "../../lib/Util";


const MusicList = ({ setPlaying }) => {
	const [moosic, setMoosic] = useContext(Moosic);

	const songs = [];
	for (let key in moosic.loaded) {
		const dirSongs = moosic.loaded[key];
		songs.push(...dirSongs)
	}

	const songClickHandler = (event) => {
		startMusic(event.target.getAttribute('data'));
		setPlaying(true);
	};

	return <div className="music">
		{songs.map(song => <div key={song} data={song} onClick={songClickHandler}> {extractFileName(song)}</div>)}
	</div>
}

export default MusicList;