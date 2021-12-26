/**
 * Quick Sort implementation.
 * Complexity is O(n*log(n)) if we choose a mdeia pivot.
 * 
 * @param {Array} unsortedArray array to sort
 * @param {int} lowerBound lover boud of sorted part
 * @param {int} upperBound upper bound of sorted part
 */
export const quickSort = (unsortedArray, lowerBound, upperBound) => {
    if (lowerBound >= upperBound) {
        return; // base case. one element - no need to sort
    }

    // choose a pivot elem
    //const pivot = unsortedArray[lowerBound]; // first element ( Naive implementation) 
    const pivot = unsortedArray[getRandomIndex(upperBound, lowerBound)];
    /*
    The best scenarion if we choose the median pivot (media that pivot, 
    50% of array is in the left side, and 50% of array in the right side).

    Also we can use a magic of the random :)
     */
    // partioning (rearange) by using swaps
    let start = lowerBound,
        end = upperBound;
    while (start <= end) {
        if (unsortedArray[start] <= pivot) {
            start++;
        } else if (unsortedArray[end] > pivot) {
            end--;
        } else {
            // swap element
            const copy = unsortedArray[start];
            unsortedArray[start] = unsortedArray[end];
            unsortedArray[end] = copy;
            end--;
            start++;
        }
    }
    // swap pivot elem with end
    unsortedArray[lowerBound] = unsortedArray[end];
    unsortedArray[end] = pivot;
    end--;

    // rearange left
    quickSort(unsortedArray, lowerBound, end);
    // rearange right
    quickSort(unsortedArray, start, upperBound);
};

/**
 * Get a random index in ceratin range (lowerBound - upperBound).
 * @param {int} lowerBound min value
 * @param {int} upperBound max value
 */
const getRandomIndex = (lowerBound, upperBound) => {
    return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
};

export default { quickSort };