const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
    event.preventDefault();
    const inputValues = [...document.getElementsByClassName("values-dropdown")].map((dropdown) => Number(dropdown.value));
    const sortedValues = inputValues.sort((a,b)=>{
        return a-b;
    });
    updateUI(sortedValues);
}

const updateUI = (array = []) => {
    array.forEach((num, i) => {
        const outputValueNode = document.getElementById(`output-value-${i}`);
        outputValueNode.innerText = num;
    })
}

const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
    }
    return array;
}

const insertionSort = (array) => { 
    for (let i = 1; i < array.length; i++) {
        const currValue = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > currValue) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = currValue;
    }
    return array;
}

/* [3,5,1,2] 
    i = 1
        curr = 5
        j = 0
        while(0 >= 0 && 3 > 5) false
        array[1] = 5
    i = 2
        curr = 1
        j = 1
        while(1 >= 0 && 5 > 1) true
            array[2] = 5
            [3,5,5,2]
            j = 0
        while(0 >= 0 && 5 > 1) true
            array[1] = 3
            [3,3,5,2]
            j=-1
        while(-1 >= 0 && ) false
        array[0] = 1
        [1,3,5,2]
    i = 3
        curr = 2
        j = 2
        while(2 >= 0 && 5 > 2) true
            array[3] = 5
            [1,3,5,5]
            j = 1
        while(1 >= 0 && 3 > 2) true
            array[2] = 3
            [1,3,3,5]
            j = 0
        while(0 >= 0 && 1 > 2) false
        array[1] = 2
    [1,2,3,5]
*/
sortButton.addEventListener("click", sortInputArray);

/*
                                                                    // Bubble SORT
function bubbleSort(array) {
    const n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // Swap elements
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
    } while (swapped);
    return array;
}

                                                                    // Selection SORT
function selectionSort(array) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Swap
        }
    }
    return array;
}

function insertionSort(array) {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let current = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = current;
    }
    return array;
}

                                                                    // Merge SORT
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

                                                                    // Quick SORT
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

                                                                    // Heap SORT
function heapSort(array) {
    buildMaxHeap(array);
    for (let i = array.length - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]]; // Swap root (max) with last element
        maxHeapify(array, 0, i); // Restore heap property on reduced heap
    }
    return array;
}

function buildMaxHeap(array) {
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(array, i, n);
    }
}

function maxHeapify(array, i, heapSize) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if (left < heapSize && array[left] > array[largest]) {
        largest = left;
    }
    if (right < heapSize && array[right] > array[largest]) {
        largest = right;
    }
    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]]; // Swap
        maxHeapify(array, largest, heapSize);
    }

}

                                                                    // RADIX SORT
function radixSort(array) {
    const getMax = (arr) => {
        let max = 0;
        for (let num of arr) {
            max = Math.max(max, num);
        }
        return max;
    };
    const digitCount = (num) => {
        if (num === 0) return 1;
        return Math.floor(Math.log10(num)) + 1;
    };
    const maxDigits = digitCount(getMax(array));
    for (let k = 0; k < maxDigits; k++) {
        let buckets = Array.from({ length: 10 }, () => []);
        for (let num of array) {
            let digit = Math.floor(Math.abs(num) / Math.pow(10, k)) % 10;
            buckets[digit].push(num);
        }
        array = [].concat(...buckets);
    }
    return array;
}
*/