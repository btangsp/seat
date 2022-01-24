export const clickHandler = (index, setIndex, UpdateAudio, setRefEnded, setFirstEnded, setSecondEnded, choice, response, setResponse, files) => {
	setIndex(index + 1);
	if (choice !== -1) {
		const newResponse = response.concat({ choice, file: files[choice], order_asked: index });
		setResponse(newResponse);
	}
	if (index < shuffledData.length - 1) {
		UpdateAudio();
	}
	if (index > -1 && index < shuffledData.length - 1) {
		updateChoice(-1);
		setRefEnded(false);
		setFirstEnded(false);
		setSecondEnded(false);
	}
};