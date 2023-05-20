import { invoke } from "@tauri-apps/api/tauri";

function startMusic(dir) {
	return invoke('start_music', { dir: dir });
}

function playMusic() {
	return invoke('play_music');
}

function pauseMusic() {
	return invoke('pause_music');
}

export { startMusic, playMusic, pauseMusic }