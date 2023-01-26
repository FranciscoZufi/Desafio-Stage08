require('express-async-errors')

const AppError = require('./utils/AppError.js')
const { response } = require('express')
const express = require('express')
const uploadConfig = require('./configs/upload')

const cors = require('cors')

const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  })
})

const PORT = 10000
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
