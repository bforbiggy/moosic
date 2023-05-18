import { invoke } from "@tauri-apps/api/tauri";

function getFiles(callback) {
	return invoke('get_files', { dir: "./" }).then(res => callback(res))
}

function startMusic(dir) {
	return invoke('start_music', { dir: dir });
}

function playMusic() {
	return invoke('play_music');
}

function pauseMusic() {
	return invoke('pause_music');
}

export { getFiles, startMusic, playMusic, pauseMusic }