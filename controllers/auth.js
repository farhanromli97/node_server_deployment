import { query } from "../database/connection.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const auth = async (req,res) => {
    try {
        const reqBody = req.body
        // hash password
        // console.time('hash')
        var salt = bcrypt.genSaltSync(10);
        var hashedValue = bcrypt.hashSync(reqBody.password, salt);
        // console.log(hashedValue)
        // console.timeEnd('hash')

        const resDB = await query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)',
        [reqBody.email, reqBody.username, hashedValue]
        )
        res.status(200).json({message: "New user created", data: reqBody})
    } catch (error) {
        // console.log(error)
        //  status 500 == server error
        res.status(500).json({message:"Server error", error:error})
    }

}

const login = async (req, res) => {
    try {
        const reqBody = req.body
        // since email is unique, it will always return one record
        const resDB = await query("Select * FROM USERS WHERE email = $1", 
        [reqBody.email]
        )
        const userData = resDB.rows[0];

        if (resDB.rowCount === 0){
            res.status(400).json({message: "Unauthorised"})
            return
        }


        const isMatch = await bcrypt.compare(reqBody.password, userData.password)

        const token = jwt.sign({id: userData.id}, process.env.JWT_SECRET_KEY)

        //  compare password
        if (isMatch) {
            res.status(200).json({message: "User logged in", data: userData, token: token})
            return
        } else {
            res.status(401).json({message: "Unauthorised"})
            return
        }
    } catch (error) {
        res.status(500).json({message:"Server error", error:error})

    }
}

const publicController = (req, res) => {
    res.status(200).json({message: "", data: null})
}

const protectedController = (req, res) => {
    // req.user come from middleware assignment
    res.status(200).json({message: "Protected controller route", data:{user:req.user}})
}

const authController = { auth, login, publicController,  protectedController}

export default authController