/**
 * Week 01. Merge sort.
 */

/**
 * Main sorting function.
 *
 * @param   {Array} arrayToSort unsorted array.
 * @returns {Array} sorted array.
 */
export const sort = (arrayToSort) => {
    if (arrayToSort.length < 2) {
        return arrayToSort;
    }
    // find middle of the array to sort
    let middle = Math.floor(arrayToSort.length / 2);
    // sort right and left and merge together
    return merge(sort(arrayToSort.slice(0, middle)), sort(arrayToSort.slice(middle)));
};

/**
 * Function to merge two sorted array into one.
 * 
 * @param {Array} leftArray left "part" of the array.
 * @param {Array} rightArray right "part" of the array.
 * @returns {Array} sorted and merged array.
 */
const merge = (leftArray, rightArray) => {
    let result = [],
        i = 0,
        j = 0;

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] < rightArray[j]) {
            result.push(leftArray[i]);
            i = i + 1;
        } else {
            result.push(rightArray[j]);
            j = j + 1;
        }
    }

    // add rest of the arrays into result
    result = result.concat(leftArray.slice(i));
    result = result.concat(rightArray.slice(j));
    return result;
};

export default { sort };