const User = require("../models/User") ;
const Profile = require("../models/Profile") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
require("dotenv").config() ;

// signup
exports.signup = async(req, res) => {
    try{
        // data fetch from request ki body
        const {firstName, lastName, email, password, confirmPassword} = req.body ;

        // validate kar lo
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        
        // 2 passwords match krlo
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            })
        }

        // check user already exist or not
        const userExists = await User.findOne({email}) ;
        if(userExists){
            return res.status(400).json({
                success: false,
                message: "User already registered"
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10) ;

        // console.log("Hashed password: ", hashedPassword) ;

        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null
        })

        // entry create in DB

        const userData =  await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        // return res
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            userData
        })

    }catch(err){
        console.log("Error occured while registering user: ", err.message) ;
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again"
        })
    }
}

// login
exports.login = async(req, res) => {
    try{
        // get data from req body
        const {email, password} = req.body ;

        // validation data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            }) ;
        }

        //  user check exists or not
        let user = await User.findOne({email}).populate("additionalDetails") ;
        // const user = await User.findOne({email}) ;
        if(!user){
            return res.status(403).json({
                success: false,
                message: "User is not registered, Please sign up first"
            }) ;
        }

        // generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            }) ;

            user = user.toObject() ;
            user.token = token ;
            user.password = undefined ;
            
            // create cookie and send response
            
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully"
            })

        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect"
            }) ;
        }

    }catch(err){
        console.log(err.message) ;
        return res.status(500).json({
            success: false,
            message: "Login failure, Please try again later"
        }) ;

    }
}