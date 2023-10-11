// import brain from 'brain.js';
// import Cart from '../models/cart.js';

// const net = new brain.NeuralNetwork();

// // Sample data for training (you can expand this with real data later)
// const sampleData = [
//     { input: { price: 100, quantity: 2, pastPurchaseCount: 5 }, output: { isAbandoned: 1 } },
//     { input: { price: 50, quantity: 1, pastPurchaseCount: 10 }, output: { isAbandoned: 0 } },
//     // ... add more sample data
// ];

// net.train(sampleData);

// const predictCartAbandonment = async (cartId) => {
//     const cart = await Cart.findById(cartId);

//     if (!cart) {
//         throw new Error('Cart not found');
//     }

//     const price = cart.price;
//     const quantity = cart.quantity;
//     // For this example, let's assume a static pastPurchaseCount. 
//     // In a real-world scenario, you'd fetch this from the user's purchase history.
//     const pastPurchaseCount = 5; 

//     const output = net.run({ price, quantity, pastPurchaseCount });
//     return output.isAbandoned > 0.5;
// };

// export default predictCartAbandonment;
import brain from 'brain.js';
import sampleData from './cartDataset.js';


const net = new brain.NeuralNetwork({
    hiddenLayers: [15, 10, 5] ,  // Specify the number of neurons in the hidden layer
    activation: 'sigmoid',  // Activation function
    learningRate: 0.3 , // Higher learning rate for faster convergence
    errorThresh: 0.005
});

    
net.train(sampleData);

const predictCartAbandonment = (cartData) => {
    const { price, quantity, pastPurchaseCount } = cartData;
    const output = net.run({ price, quantity, pastPurchaseCount });
    console.log(output.isAbandoned)
    return output.isAbandoned > 0.48686;
};

export default predictCartAbandonment;
