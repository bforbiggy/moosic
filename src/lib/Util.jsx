import { open } from '@tauri-apps/api/dialog';
import { invoke } from "@tauri-apps/api/tauri";
import { appDataDir } from '@tauri-apps/api/path';

const formats = ['.ogg', '.mp3', '.wav'];
function isAudio(fileName) {
	for (let format of formats)
		if (fileName.endsWith(format))
			return true;
	return false;
}

function getMusicFiles(dir) {
	return invoke('get_files', { dir: dir }).then(
		res => res.filter(e => isAudio(e))
	)
}

function extractFileName(path) {
	const file = path.split('\\').pop();
	console.log(file);
	const [name, ext] = file.split('.');
	return name;
}

async function openFolder() {
	// Open a selection dialog for directories
	const selected = await open({
		directory: true,
		defaultPath: await appDataDir(),
	});

	return selected;
}

export { openFolder, getMusicFiles, extractFileName }