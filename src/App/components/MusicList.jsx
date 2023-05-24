import "./MusicList.scss";
import { useContext } from "react";
import { Moosic } from "../App";
import { startMusic } from "../../lib/Music"


const MusicList = () => {
	const [moosic, setMoosic] = useContext(Moosic);

	const songs = [];
	for (let key in moosic.loaded) {
		const dirSongs = moosic.loaded[key];
		songs.push(...dirSongs)
	}

	const songClickHandler = (event) => {
		startMusic(event.target.getAttribute('data'));
		setMoosic({
			...moosic,
			playing: true
		})
	};

	return <div className="music">
		{songs.map(song => <div key={song} data={song} onClick={songClickHandler}> {song}</div>)}
	</div>
}

export default MusicList;