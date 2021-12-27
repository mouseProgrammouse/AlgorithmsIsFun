import { sort } from "./mergeSort.js";
import { countInversionsBruteForse, countInversionsMergeSort } from "./divideAndConquer.js";
import { quickSort } from "./quickSort.js";
import { RSelect } from "./linerTimeSelection.js";

const submitBtn = document.getElementById('mergeSort');
const IDs = {
    sort: "sortResult",
    divideBF: "divideAndCBrutForseResult",
    divide: "divideAndCResult",
    quickSort: "quickSortResult",
    rSelect: "rSelectResult"
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const unsortedArrInput = document.getElementById('unsortedArr');
    const elPositionInput = document.getElementById('elPosition');

    if (unsortedArrInput.value) {
        showErrorMsg(''); // remove error msg
        let unsortedArr = convertStrIntoArrayOfInts(unsortedArrInput.value);
        // merge sort
        showResultMsg(IDs.sort, `Merge Sort result: ${sort(unsortedArr)}`);

        // inversion counting in array
        showResultMsg(IDs.divideBF, `Brute Forse solution result: ${countInversionsBruteForse(unsortedArr)}`);
        showResultMsg(IDs.divide, `Merge Sort solution result: ${countInversionsMergeSort(unsortedArr)}`);

        // quick sort (for quick sort we will not copy array to avoid memory allocation)
        quickSort(unsortedArr, 0, unsortedArr.length - 1);
        showResultMsg(IDs.quickSort, `Result of Quick sort: ${unsortedArr}`);

        // rSelect
        let number = parseInt(elPositionInput.value);
        showResultMsg(IDs.rSelect, `Result of RSelect: the ${number}th element of the array is
         ${RSelect(convertStrIntoArrayOfInts(unsortedArrInput.value), number)} `)
    } else {
        showErrorMsg('Please enter the value');
        unsortedArrInput.focus();
    }
});

/**
 * Convert string into array of integers.
 * Note: All unparsed values will be filtered out.
 * 
 * @param {String} str string with numbers: 1,2,6.
 * @returns {Array} array of integers.
 */
const convertStrIntoArrayOfInts = (str) => {
    return str.split(",").map(item => parseInt(item.trim())).filter(value => !isNaN(value));
};

const showErrorMsg = (errorMsg) => {
    const inputError = document.getElementById('inputError');
    inputError.innerText = errorMsg;
};

const showResultMsg = (elemId, result) => {
    const sortingResult = document.getElementById(elemId);
    sortingResult.innerText = result;
};