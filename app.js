require('dotenv').config({path: `${process.cwd()}/.env`})
const express = require('express')

const authRouter = require('./route/auth.route.js');
const catchAsync = require('./utils/catchAsync.js');

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({
        status:"success",
        message:"APIs are working!"
    })
})

// all routes
app.use('/api/v1/auth', authRouter)


app.use('*',catchAsync (async (req,res,next) => {
    // return next(new Error('This is a Error'))
    throw new Error('This is a Error')
    // res.status(404).json({
    //     status:'fail',
    //     message:"Route not Found"
    // })
}))

app.use((err,req,res,next) => {
    res.status(404).json({
        status:'error',
        message:err.message
    })
})

const PORT = process.env.APP_PORT || 3036

app.listen(PORT, () => {
    console.log("server up and running ", PORT);
})