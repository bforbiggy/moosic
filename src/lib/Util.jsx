import { open } from '@tauri-apps/api/dialog';
import { invoke } from "@tauri-apps/api/tauri";
import { appDataDir, appConfigDir } from '@tauri-apps/api/path';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';

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

async function loadConfig() {
	try {
		const path = `${await appConfigDir()}config.json`;
		const file = await readTextFile(path);
		return JSON.parse(file);
	}
	catch (e) {
		console.info('Config file was not found.');
		return {};
	}
}

async function saveConfig(config) {
	const path = `${await appConfigDir()}config.json`;
	await writeTextFile(path, JSON.stringify(config));
}

export { openFolder, getMusicFiles, extractFileName, loadConfig, saveConfig }