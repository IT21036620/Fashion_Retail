import multer, { diskStorage } from 'multer'

// Multer configuration
const storage = diskStorage({})

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Maximum file size is 10MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  },
})

export default upload
