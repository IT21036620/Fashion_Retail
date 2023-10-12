import dotenv from 'dotenv'
import stripe from 'stripe'
import asyncWrapper from '../middleware/async.js'
import Payment from '../models/Payment.js'

dotenv.config()
// Assigning the Stipe key------------------------------------------------
const stripeInstance = stripe(process.env.STRIPE_KEY)

// This is used to make payment requests,this will send request to stipe and output the response---------------------
const makePayment = async (req, res) => {
  const { amount, token } = req.body

  try {
    const charge = await stripeInstance.charges.create({
      amount,
      currency: 'usd',
      source: token.id,
      description: 'Payment for your purchase',
    })

    // Here, this is used to save the payment details to the database
    const payment = new Payment({
      chargeId: charge.id,
      amount,
      currency: charge.currency,
    })
    await payment.save().catch((err) => {
      console.error('Error while saving payment:', err)
    })
    // -----------------------------------------------------------------------------

    res.status(200).json({ success: true, charge })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, err })
  }
}
// ----------------------------------------------------------------------------------------------------------------------

// Get all Payment details------------------------------------------------------
const getAllPayments = asyncWrapper(async (req, res) => {
  const payments = await Payment.find({})
  res.status(200).json({ payments })
})
// -----------------------------------------------------------------------------

// Get payment details by PaymentID---------------------------------------------
const getPayment = asyncWrapper(async (req, res, next) => {
  const { id: paymentId } = req.params
  const payment = await Payment.findOne({ _id: paymentId })

  if (!payment) {
    return res.status(404).json({ msg: 'no payment' })
  }
  res.status(200).json({ delivery })
})
// -----------------------------------------------------------------------------

export { makePayment }
