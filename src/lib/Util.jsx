const formats = ['.ogg', '.mp3', '.wav'];
function isAudio(fileName) {
	for (let format of formats) {
		if (fileName.endsWith(format))
			return true;
	}
	return false;
}

export { isAudio }