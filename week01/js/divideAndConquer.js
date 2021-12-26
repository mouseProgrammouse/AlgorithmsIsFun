/**
 * Brute Forse solution of the inversion counting in array.
 * Complexity is O(n^2).
 * 
 * @param {Array} unsortedArr unsorted array.
 * @return {Int} count of inversion in the array.
 */
export const countInversionsBruteForse = (unsortedArr) => {
    let result = 0;
    for (let i = 0; i < unsortedArr.length; i++) {
        for (let j = i + 1; j < unsortedArr.length; j++) {
            if (unsortedArr[i] > unsortedArr[j]) {
                result += 1;
            }
        }
    }
    return result;
};


/**
 * Divide and Conquer solution. Basically implement a merge sort with calculation the inv.
 * Complexity is O(n*log(n)).
 * 
 * @param {Array} unsortedArr unsorted array.
 * @return {Int} count of inversion in the array.
 */
export const countInversionsMergeSort = (unsortedArr) => {
    return mergeSort({ unsortedArr, "countOfInv": 0 }).countOfInv;
}

const mergeSort = (arg) => {
    if (arg.unsortedArr.length < 2) {
        return {
            "unsortedArr": arg.unsortedArr,
            "countOfInv": arg.countOfInv
        };
    }

    const middle = Math.floor(arg.unsortedArr.length / 2);

    return merge(
        mergeSort({ "unsortedArr": arg.unsortedArr.slice(0, middle), "countOfInv": arg.countOfInv }),
        mergeSort({ "unsortedArr": arg.unsortedArr.slice(middle), "countOfInv": arg.countOfInv }));
};


const merge = (left, rigth) => {
    let result = [],
        i = 0,
        j = 0,
        countOfInv = left.countOfInv + rigth.countOfInv;

    while (i < left.unsortedArr.length && j < rigth.unsortedArr.length) {
        if (left.unsortedArr[i] < rigth.unsortedArr[j]) {
            result.push(left.unsortedArr[i]);
            i++;
        } else {
            result.push(rigth.unsortedArr[j]);
            j++;
            countOfInv += rigth.unsortedArr.length - j;
        }
    }


    result = result.concat(left.unsortedArr.slice(i));
    result = result.concat(rigth.unsortedArr.slice(j));

    countOfInv += left.unsortedArr.length - i;
    return {
        "unsortedArr": result,
        "countOfInv": countOfInv
    };
};

export default { countInversionsBruteForse, countInversionsMergeSort };