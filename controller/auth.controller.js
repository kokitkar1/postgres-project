const user = require("../db/models/user.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateToken = (payload) => {
    return jwt.sign(payload,process.env.JWT_SECRET_KEY , {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const signup = async (req,res,next) => {

    const body = req.body;

    if(!['1', '2'].includes(body.userType)){
        return res.status(400).json({
            status:"fail",
            message:"Invalid user Type"
        })
    }


    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword
    })

    const result = newUser.toJSON();
    delete result.password
    delete result.deletedAt

    result.token = generateToken({
        id: result.id
    })

    if(!result){
        return res.status(400).json({
            status:"fail",
            message:"Failed to create the user"
        })
    }

    return res.status(201).json({
        status:"success",
        message:"new user created",
        data: result
    })
}

const login =async (req,res,next) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({
            status: "fail",
            message: 'please provide email and password'
        })
    }

    const result =await user.findOne({ where: {email}});
    if(!result || !(bcrypt.compareSync(password, result.password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect email or Password'
        })
    }

    // const isPasswordMatched = bcrypt.compareSync(password, result.password)
    // if(!isPasswordMatched) {
    //    return  res.status(401).json({
    //         status: 'fail',
    //         message: 'Incorrect email or Password'
    //     })
    // }

    const token = generateToken({
        id:result.id
    })

    return res.status(200).json({
        status: 'success',
        token
    })




}


module.exports = {signup, login}

