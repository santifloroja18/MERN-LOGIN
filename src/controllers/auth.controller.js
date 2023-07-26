import { createTokenAccess } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async(req, res) => {
    const { username, email, password} = req.body;

    //console.log(username, email, password)
    //res.send("Registrando");

    try{
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save();
        const token = await createTokenAccess({ id: userSaved._id });
        res.cookie('token', token)
        res.status(201).json({ userSaved })

    }catch(error){
        res.status(500).json({ message: error.message });
    }
};




export const login = (req, res) => res.send("Login");

