import "./Playbar.scss";
import { useContext } from "react";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai"
import { MusicContext } from "../App";
import { pauseMusic, playMusic } from "../../lib/Music"


function Playbar() {
	const [musicContext, setMusicContext] = useContext(MusicContext);

	const togglePlay = () => {
		musicContext.playing ? pauseMusic() : playMusic();
		setMusicContext({
			...musicContext,
			playing: !musicContext.playing
		})
	};

	return <div className="playbar">
		{musicContext.playing ? <AiOutlinePauseCircle onClick={togglePlay} /> : <AiOutlinePlayCircle onClick={togglePlay} />}
	</div>;
}

export default Playbar;