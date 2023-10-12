import brain from 'brain.js';
import ShoppingCart from '../models/ShoppingCart.js';
import ItemPerformance from '../models/itemPerformance.js';

const net = new brain.NeuralNetwork();

// Sample data for training (you can expand this with real data later)
const sampleData = [
    { input: { total_price: 100, total_quantity: 2, daysSinceLastUpdate: 5 }, output: { isAbandoned: 1, notAbandoned: 0 } },
    { input: { total_price: 50, total_quantity: 1, daysSinceLastUpdate: 10 }, output: { isAbandoned: 0, notAbandoned: 1 } },
    // ... add more sample data
];

net.train(sampleData);

const predictCartAbandonment = async (cartId) => {
    const cart = await ShoppingCart.findById(cartId);

    if (!cart) {
        throw new Error('Cart not found');
    }
    console.log(cart)
    const total_price = cart.total_price;
    const total_quantity = cart.total_quantity;
    const daysSinceLastUpdate = (new Date() - cart.updatedAt) / (1000 * 60 * 60 * 24); // Calculate days since last update

    const output = net.run({ total_price, total_quantity, daysSinceLastUpdate });

// Determine if the cart is abandoned based on the prediction
const isAbandonedPrediction = output.isAbandoned > 0.5;


// if (isAbandonedPrediction && !cart.abandoned) { // Check if cart was not previously marked as abandoned
    cart.abandoned = isAbandonedPrediction;
    await cart.save();

    // Update cartAbandonmentCount for each item in the cart
    for (let cartItem of cart.cartItems) {
        const performance = await ItemPerformance.findOne({ itemId: cartItem });
        if (performance) {
            performance.cartAbandonmentCount += 1;
            await performance.save();
            console.log("test1")
        } else {
            // If no performance record exists for the item, create one
            const newItemPerformance = new ItemPerformance({
                itemId: cartItem,
                cartAbandonmentCount: 1,
            });
            await newItemPerformance.save();
            console.log("test2")
        }
    }
// }

    console.log(output)
    return {
        isAbandoned: output.isAbandoned,
        notAbandoned: output.notAbandoned
    };
};

export default predictCartAbandonment;


// export default predictCartAbandonment;
// import brain from 'brain.js';
// import sampleData from './cartDataset.js';


// const net = new brain.NeuralNetwork({
//     hiddenLayers: [15, 10, 5] ,  // Specify the number of neurons in the hidden layer
//     activation: 'sigmoid',  // Activation function
//     learningRate: 0.3 , // Higher learning rate for faster convergence
//     errorThresh: 0.005
// });

    
// net.train(sampleData,{iterations:2000});

// const predictCartAbandonment = (cartData) => {
//     const { price, quantity, pastPurchaseCount } = cartData;
//     const output = net.run({ "price": price, "quantity": quantity, "pastPurchaseCount": pastPurchaseCount });
//     console.log(output)
//     return output.isAbandoned > 0.48686;
// };

// export default predictCartAbandonment;
