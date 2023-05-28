import "./Playbar.scss";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai"
import { pauseMusic, playMusic, hasMusic } from "../../lib/Music"


function Playbar({ playing, setPlaying }) {
	const togglePlay = async () => {
		if (!await hasMusic())
			return;

		playing ? pauseMusic() : playMusic();
		setPlaying(!playing)
	};

	return <div className="playbar">
		{playing ? <AiOutlinePauseCircle onClick={togglePlay} /> : <AiOutlinePlayCircle onClick={togglePlay} />}
	</div>;
}

export default Playbar;