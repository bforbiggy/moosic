import { open } from '@tauri-apps/api/dialog';
import { appConfigDir } from '@tauri-apps/api/path';

const formats = ['.ogg', '.mp3', '.wav'];
function isAudio(fileName) {
	for (let format of formats) {
		if (fileName.endsWith(format))
			return true;
	}
	return false;
}

async function openFolder() {
	// Open a selection dialog for directories
	const selected = await open({
		directory: true,
		defaultPath: await appConfigDir(),
	});

	return selected;
}

export { isAudio, openFolder }