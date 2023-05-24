import "./Directories.scss";
import { Moosic } from "../../../App/App";
import { getMusicFiles, openFolder } from "../../../lib/Util";
import { useContext } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai"

const Directories = () => {
	const [moosic, setMoosic] = useContext(Moosic);

	const addFolderHandler = async () => {
		const folder = await openFolder();
		if (!folder || folder in moosic.loaded) // Ignore invalid/already opended directories
			return;

		// Load folder and all songs within
		const songs = (await getMusicFiles(folder)) ?? [];
		setMoosic({
			...moosic,
			loaded: {
				...moosic.loaded,
				[folder]: songs
			}
		});
	};

	return <div className="directories">

		<div className="header">
			<h1>Music Folders</h1>
			<AiOutlineFolderAdd onClick={addFolderHandler} />
		</div>

		{Object.keys(moosic.loaded).map(d => <div key={d}>{d}</div>)}
	</div>;
};

export default Directories;