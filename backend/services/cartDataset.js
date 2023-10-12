// dataset.js

const sampleData = [
    { input: { price: 100000, quantity: 20000, pastPurchaseCount: 10000 }, output: { isAbandoned: 1 } },
    { input: { price: 0, quantity: 0, pastPurchaseCount: 0 }, output: { notAbandoned: 0 } },
    { input: { price: 10000, quantity: 2000, pastPurchaseCount: 2333 }, output: { isAbandoned: 1 } },
    { input: { price: 50, quantity: 1, pastPurchaseCount: 1 }, output: { notAbandoned: 0 } },
   
    // ... add more sample data
];
// const sampleData = [
//     { input: { price: 300, quantity: 5, pastPurchaseCount: 1 }, output: { isAbandoned: 1 } },
//     { input: { price: 50, quantity: 1, pastPurchaseCount: 15 }, output: { notAbandoned: 0 } },
//     { input: { price: 280, quantity: 4, pastPurchaseCount: 2 }, output: { isAbandoned: 1 } },
//     { input: { price: 60, quantity: 1, pastPurchaseCount: 14 }, output: { notAbandoned: 0 } },
//     // ... add more distinct data
// ];
// const sampleData = [
//     { input: { price: 100, quantity: 2, pastPurchaseCount: 5 }, output: { isAbandoned: 1 } },
//     { input: { price: 50, quantity: 1, pastPurchaseCount: 10 }, output: { notAbandoned: 0 } },
//     { input: { price: 150, quantity: 3, pastPurchaseCount: 7 }, output: { isAbandoned: 1 } },
//     { input: { price: 200, quantity: 4, pastPurchaseCount: 2 }, output: { isAbandoned: 1 } },
//     { input: { price: 75, quantity: 1, pastPurchaseCount: 15 }, output: { notAbandoned: 0 } },
//     { input: { price: 300, quantity: 5, pastPurchaseCount: 3 }, output: { isAbandoned: 1 } },
//     { input: { price: 60, quantity: 1, pastPurchaseCount: 12 }, output: { notAbandoned: 0 } },
//     { input: { price: 120, quantity: 2, pastPurchaseCount: 8 }, output: { notAbandoned: 0 } },
//     { input: { price: 250, quantity: 4, pastPurchaseCount: 4 }, output: { isAbandoned: 1 } },
//     { input: { price: 90, quantity: 1, pastPurchaseCount: 11 }, output: { notAbandoned: 0 } },
//     { input: { price: 180, quantity: 3, pastPurchaseCount: 6 }, output: { notAbandoned: 0 } },
//     { input: { price: 220, quantity: 4, pastPurchaseCount: 1 }, output: { isAbandoned: 1 } },
//     { input: { price: 80, quantity: 1, pastPurchaseCount: 14 }, output: { notAbandoned: 0 } },
//     { input: { price: 280, quantity: 5, pastPurchaseCount: 2 }, output: { isAbandoned: 1 } }
// ];



export default sampleData;
