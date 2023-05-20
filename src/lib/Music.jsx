import { invoke } from "@tauri-apps/api/tauri";

function getFiles(dir) {
	return invoke('get_files', { dir: dir })
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