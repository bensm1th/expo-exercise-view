const arr = [1,2,3,4,5,6,7,8];
const arr2 = [];
const logThis = arr2.some(num => {
    return num === 8;
});

console.log(logThis);