/**
 * Uses a setTimeout and Promise to simulate a sleep (inaccurate).
 * @param {number} milliseconds Time to sleep.
 * @returns {Promise} A promise that is resolved by a timeout.
 */
 function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
