export const shuffle = (arr, n) => {
	if (n === undefined) {
		n = arr.length;
	}
	else if (n <= 0) {
		n = arr.length;
		console.warn('Requested samples is not greater than 0. Using full array.');
	}
	else if (n > arr.length) {
		n = arr.length;
		console.warn('Requested more samples than there are available. Using full array.');
	}
	let nInd = n;

	let currIndex = arr.length, tempValue, randIndex;
	// While there remain elements to shuffle...
	while (0 !== currIndex) {
		// Pick a remaining element...
		randIndex = Math.floor(Math.random() * currIndex);
		currIndex -= 1;

		// And swap it with the current element.
		tempValue = arr[currIndex];
		arr[currIndex] = arr[randIndex];
		arr[randIndex] = tempValue;
	}
	return arr.slice(0, nInd);
};

export const shuffledFiles = file => (
    shuffle(['A/' + file.baseline, 'B/' + file.experimental])
);