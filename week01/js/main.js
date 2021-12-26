import { sort } from "./mergeSort.js";
import { countInversionsBruteForse, countInversionsMergeSort } from "./divideAndConquer.js";

const submitBtn = document.getElementById('mergeSort');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const unsortedArrInput = document.getElementById('unsortedArr');

    console.log(unsortedArrInput.value);
    if (unsortedArrInput.value) {
        showErrorMsg(''); // remove error msg
        const unsortedArr = convertStrIntoArrayOfInts(unsortedArrInput.value);
        // merge sort
        showResultMsg("sortResult", `Merge Sort result: ${sort(unsortedArr)}`);

        // inversion counting in array
        showResultMsg("divideAndCBrutForseResult", `Brute Forse solution result: ${countInversionsBruteForse(unsortedArr)}`);
        showResultMsg("divideAndCResult", `Merge Sort solution result: ${countInversionsMergeSort(unsortedArr)}`);
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