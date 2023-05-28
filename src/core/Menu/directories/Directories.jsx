import "./Directories.scss";
import { Moosic } from "../../../App/App";
import { getMusicFiles, openFolder, saveConfig } from "../../../lib/Util";
import { useContext } from "react";
import { AiOutlineFolderAdd, AiOutlineClose } from "react-icons/ai"

const Directories = () => {
	const [moosic, setMoosic] = useContext(Moosic);

	const addFolder = async () => {
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

	const removeFolder = (event) => {
		const folder = event.target.parentElement.getAttribute('data');
		const moo = { ...moosic };
		delete moo.loaded[folder];
		setMoosic(moo);
	};

	return <div className="directories">

		<div className="header">
			<h1>Music Folders</h1>
			<AiOutlineFolderAdd onClick={addFolder} />
		</div>

		{Object.keys(moosic.loaded).map(d => <div class="dir" key={d} data={d}><p>{d}</p> <AiOutlineClose onClick={removeFolder} /></div>)}
	</div>;
};

export default Directories;