const _ = require("lodash");

const arr = [1, 2, undefined, 3, 4, undefined];

_.pull(arr, undefined);
_.remove(arr, (n) => n % 2 === 0);


console.log(arr);
