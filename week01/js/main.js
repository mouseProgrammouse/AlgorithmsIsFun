import { sort } from "./mergeSort.js";

const submitBtn = document.getElementById('mergeSort');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const unsortedArrInput = document.getElementById('unsortedArr');

    console.log(unsortedArrInput.value);
    if (unsortedArrInput.value) {
        showErrorMsg(''); // remove error msg
        showResult(sort(convertStrIntoArrayOfInts(unsortedArrInput.value)));
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

const showResult = (result) => {
    const sortingResult = document.getElementById('sortResult');
    sortingResult.innerText = result;
};