import brain from 'brain.js';
import Item from '../models/item.js';
import ItemPerformance from '../models/itemPerformance.js';

const net = new brain.NeuralNetwork();

// Helper function to normalize data
// const normalizeData = (data) => {
//     // TODO: Normalize data based on your dataset's range and domain
//     return data;
// };

// Helper function to normalize data
const normalizeData = (data) => {
    return {
        price: data.price / 10000, // assuming max price is 10,000 for normalization
        rating: data.rating / 5, // rating is out of 5
        addToCartCount: data.addToCartCount / 100, // assuming max count is 100
        itemVisitsCount: data.itemVisitsCount / 100, // assuming max count is 100
        ...oneHotEncode(data.category, ['Tshirts', 'Jackets', 'Plus Size']),
        ...oneHotEncode(data.clothing_type, ['Men', 'Women', 'Unisex'])
    };
};

// Helper function for one-hot encoding
const oneHotEncode = (value, categories) => {
    const encoding = {};
    categories.forEach(category => {
        encoding[category] = category === value ? 1 : 0;
    });
    return encoding;
};

const trainModel = async () => {
    const items = await Item.find();
    const trainingData = [];

    for (let item of items) {
        const performance = await ItemPerformance.findOne({ itemId: item._id });
        if (performance) {
            const inputData = {
                price: item.price,
                category: item.category, 
                rating: item.rating,
                clothing_type: item.clothing_type, 
                addToCartCount: performance.addToCartCount,
                itemVisitsCount: performance.cartAbandonmentCount + performance.completedPurchasesCount,
            };

            const outputData = {
                completedPurchasesCount: performance.completedPurchasesCount,
            };
//console.log(inputData)
            trainingData.push({
                input: normalizeData(inputData),
                output: outputData,
            });
        }
    }
    console.log(trainingData)
    // const stats =
     net.train(trainingData)
        //, {
    //     log: (error) => console.log(error),
    //     logPeriod: 10 // Log every 10 iterations
    //   });
    //   console.log(stats);
};

// const sampleData = [
//     {
//         item: {
//             price: 1000,
//             category: 'Tshirts',
//             rating: 4.5,
//             clothing_type: 'Men',
//         },
//         performance: {
//             addToCartCount: 10,
//             cartAbandonmentCount: 2,
//             completedPurchasesCount: 8,
//         }
//     },
//     {
//         item: {
//             price: 1500,
//             category: 'Jackets',
//             rating: 4.0,
//             clothing_type: 'Women',
//         },
//         performance: {
//             addToCartCount: 5,
//             cartAbandonmentCount: 1,
//             completedPurchasesCount: 4,
//         }
//     },
//     // ... add more sample data as needed
// ];

const trainModelWithSampleData = () => {
    const trainingData = [];

    for (let data of sampleData) {
        const inputData = {
            price: data.item.price,
            category: data.item.category,
            rating: data.item.rating,
            clothing_type: data.item.clothing_type,
            addToCartCount: data.performance.addToCartCount,
            itemVisitsCount: data.performance.cartAbandonmentCount + data.performance.completedPurchasesCount,
        };

        const outputData = {
            completedPurchasesCount: data.performance.completedPurchasesCount,
        };

        trainingData.push({
            input: normalizeData(inputData),
            output: outputData,
        });
    }

    net.train(trainingData);
};

// Call trainModelWithSampleData() to train the model with sample data when the service is initialized
//trainModelWithSampleData();



const predictItemPurchase = async (itemId) => {
    const item = await Item.findById(itemId);
    const performance = await ItemPerformance.findOne({ itemId: itemId });

    if (!item || !performance) {
        throw new Error('Item or performance data not found');
    }

    const inputData = {
        price: item.price,
        category: item.category,
        rating: item.rating,
        clothing_type: item.clothing_type,
        addToCartCount: performance.addToCartCount,
        itemVisitsCount: performance.cartAbandonmentCount + performance.completedPurchasesCount,
    };
    // console.log("Before normalization:", inputData);
    // const normalizedInput = normalizeData(inputData);
    // console.log("After normalization:", normalizedInput);
    
    const prediction = net.run(normalizeData(inputData));

    console.log("Prediction Result:", prediction);

    return prediction.completedPurchasesCount;
};

// Call trainModel() to train the model when the service is initialized
trainModel();

export default predictItemPurchase;
