import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App config
const app = express()
const port = process.env.PORT || 4000

// Connect to DB and cloud
connectDB()
connectCloudinary()

// CORS configuration
const allowedOrigin = 'https://e-com-admin-psi.vercel.app'

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}))

// Optional: Handle preflight requests (for Vercel)
app.options('*', cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}))

// Middleware
app.use(express.json())

// API Routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Test route
app.get('/', (req, res) => {
  res.send("API Working")
})

// Start server
app.listen(port, () => console.log(Server started on PORT : ${port}))
