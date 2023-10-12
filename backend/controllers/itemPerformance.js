import ItemPerformance from '../models/itemPerformance.js';

// Get all item performances
export const getAllItemPerformances = async (req, res) => {
  try {
    const itemPerformances = await ItemPerformance.find().populate('itemId');
    res.status(200).json({
      status: 'success',
      results: itemPerformances.length,
      data: itemPerformances,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get item performance by Item ID
export const getItemPerformanceByItemId = async (req, res) => {
    try {
        const { id: itemID } = req.params
        console.log(itemID)
      const itemPerformance = await ItemPerformance.findOne({ itemId: itemID }).populate('itemId');
      
      if (!itemPerformance) {
        return res.status(404).json({
          status: 'fail',
          message: 'No item performance found with that Item ID',
        });
      }
      res.status(200).json({
        status: 'success',
        data: itemPerformance,
      });
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }

// Get a single item performance by ID
// export const getItemPerformanceById = async (req, res) => {
//   try {
//     const itemPerformance = await ItemPerformance.findById(req.params.id).populate('itemId');
//     if (!itemPerformance) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'No item performance found with that ID',
//       });
//     }
//     res.status(200).json({
//       status: 'success',
//       data: itemPerformance,
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: 'fail',
//       message: error.message,
//     });
//   }
 };
