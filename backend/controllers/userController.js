import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import cloudinary from '../configs/cloudinary.js';
import { removePassword } from '../utils/utils.js';

export const register = async (req, res) => {
    const { username, email, password, gender } = req.body;


    try {
        if (!username || !email || !password || !gender) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        let profilePhoto = "";

        if (req.file) {
            const base64 = req.file.buffer.toString("base64");

            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${base64}`,
                {
                    folder: "profile_pics",
                }
            );

            profilePhoto = result.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            gender,
            password: hashedPassword,
            profilePhoto,
        });

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,     // cannot be accessed by JS (security)
            secure: false,      // true in production (HTTPS)
            sameSite: "lax",    // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return res.status(201).json({
            success: true,
            message: "User created",
            user: removePassword(user),
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: true, message: "All fields are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: true, message: "Wrong credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch)

        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Wrong credentials" })
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000
        })

        return res.status(200).json({ success: true, message: "User login successfully!", user: removePassword(user) })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        return res.status(200).json({ success: true, message: "User fetched successfully!", user: removePassword(user) })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}

export const logout = async (req, res) => {
    res.cookie("token", '');
    return res.json({ success: true, message: "User logout successfully!" })
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json({ success: true, message: "users fetched succesfully!", otherUsers });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
        console.log(error);
    }
}