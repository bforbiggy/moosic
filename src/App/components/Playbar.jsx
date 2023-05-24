import "./Playbar.scss";
import { useContext } from "react";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai"
import { Moosic } from "../App";
import { pauseMusic, playMusic } from "../../lib/Music"


function Playbar() {
	const [moosic, setMoosic] = useContext(Moosic);

	const togglePlay = () => {
		moosic.playing ? pauseMusic() : playMusic();
		setMoosic({
			...moosic,
			playing: !moosic.playing
		})
	};

	return <div className="playbar">
		{moosic.playing ? <AiOutlinePauseCircle onClick={togglePlay} /> : <AiOutlinePlayCircle onClick={togglePlay} />}
	</div>;
}

export default Playbar;