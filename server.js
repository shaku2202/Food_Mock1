const express = require('express');
//const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const connection = require('./config/keys');

const app = express();

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,async()=>{
        try{
           await connection,
           console.log("connected to db");
           console.log("Server is running at port 5000");
        
        }
        catch(err){
            console.log(err);
        }
        
    })