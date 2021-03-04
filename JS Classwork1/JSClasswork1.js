function factorize(n) {
    if (n <= 0) {
        console.log("Input must be a positive integer");
        return;
    }

    var result = [1];

    for (let i = 2; i <= n / 2; i++) {
        if (n % i == 0) {
            result.push(i);
        }
    }

    if (n != 1) {
        result.push(n);
    }

    return result;
}

function findUnique(inputStr) {
    var freq = {};
    result = [];

    for (let i = 0; i < inputStr.length; i++) {
        if (inputStr[i] in freq) {
            freq[inputStr[i]]++;
        }
        else {
            freq[inputStr[i]] = 1;
        }
    }

    Object.keys(freq).forEach(function (key) {
        if (freq[key] == 1) {
            result.push(key);
        }
    });

    return result;
}

function doOperation(a, b, operator) {
    return operator(a, b);
}

function multiply(a, b) {
    return a * b;
}

function power(a, b) {
    return a ** b;
}