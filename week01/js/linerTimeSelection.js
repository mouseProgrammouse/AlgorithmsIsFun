import { getRandomIndex } from './commonUtils.js';
/**
 * RSelect. Linear time selection.
 * @param {Array} unsortedArr
 * @param {int} number the i
 * @return {int} the ith(number) smallest element of the unsorted array.
 */
export const RSelect = (unsortedArr, number) => {
    return select(unsortedArr, 0, unsortedArr.length - 1, unsortedArr[getRandomIndex(0, unsortedArr.length - 1)], number - 1);
};

/**
 * Main function for rSelect.
 * @param {Array} unsortedArr
 * @param {int} lowerBound lover boud of sorted part
 * @param {int} upBound upper bound of sorted part
 * @param {int} pivot upper bound of sorted part
 * @param {int} number the i
 * @return {int} the ith(number) smallest element of the unsorted array.
 */
const select = (unsortedArr, lowerBound, upBound, pivot, number) => {
    //rearange elemenets
    let i = lowerBound,
        j = upBound;
    while (i < j) {
        if (unsortedArr[i] < pivot) {
            i++;
        } else if (unsortedArr[j] > pivot) {
            j--;
        } else {
            // swap
            const temp = unsortedArr[i];
            unsortedArr[i] = unsortedArr[j];
            unsortedArr[j] = temp;
        }
    }
    if (pivot === unsortedArr[number]) {
        return pivot; // base case: we found the ith element
    }
    //select a part for continue
    if (number < i + 1) {
        // choose left
        // recursevelly call a RSelect
        return select(unsortedArr, lowerBound, i, unsortedArr[getRandomIndex(lowerBound, i)], number);
    } else {
        // choose right
        return select(unsortedArr, j, upBound, unsortedArr[getRandomIndex(j, upBound)], number);
    }
};

export default { RSelect };