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




export const login = async(req, res) => {
    const { email, password} = req.body;

    //console.log(username, email, password)
    //res.send("Registrando");

    try{
        const userFound = await User.findOne({ email });
        if(!userFound) return res.status(400).json({ message : "User not Found" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch)
        return res.status(400).json({ message : "Error in Credentials" });

        const token = await createTokenAccess({ id: userFound._id });
        res.cookie('token', token)
        res.status(201).json({ userFound })

    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const logout = async( req, res) => {
    res.cookie('token','', {
        expires: new Date(0),
    });
    return res.sendStatus(200).json({ message: "Ok." });
    
}

export const profile = async(req, res) =>{

    const userFound = await User.findById(req.user.id);
    if(!userFound) return res.status(400).json({ message : "User not Found" });

    res.status(201).json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email
    })
}
