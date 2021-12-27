/**
 * Get a random index in ceratin range (lowerBound - upperBound).
 * @param {int} lowerBound min value
 * @param {int} upperBound max value
 */
export const getRandomIndex = (lowerBound, upperBound) => {
    return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
};

export default { getRandomIndex }