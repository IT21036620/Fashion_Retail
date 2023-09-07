import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ msg: 'sample data send from the sample router' })
})

export default router
