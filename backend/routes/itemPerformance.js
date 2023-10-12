import express from 'express';
import {
  getAllItemPerformances,
  getItemPerformanceByItemId,
} from '../controllers/itemPerformance.js';

const router = express.Router();

router.route('/').get(getAllItemPerformances);
router.route('/:id').get(getItemPerformanceByItemId);

export default router;
