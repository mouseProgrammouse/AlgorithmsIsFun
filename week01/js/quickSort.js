/**
 * Quick Sort implementation.
 * 
 * Complexity is O(n*log(n))
 */
export const quickSort = (unsortedArray, lowerBound, upperBound) => {
    if (lowerBound >= upperBound) {
        return; // base case. one element - no need to sort
    }

    // choose a pivot elem
    const pivot = unsortedArray[lowerBound]; // first element
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

export default { quickSort };