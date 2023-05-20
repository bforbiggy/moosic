import "./Directories.scss";
import { useContext } from "react";
import { MusicContext } from "../App";


const Directories = () => {
	const [musicContext] = useContext(MusicContext);

	return <div className="directories">
		{Object.keys(musicContext.loaded).map(d => <div key={d}>{d}</div>)}
	</div>
};

export default Directories;