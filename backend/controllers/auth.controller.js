import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signUp = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender, publicKey } = req.body;


    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    //Hash password here
    const hashPassword = await bcrypt.hash(password, 10);

   
    const profilePic = `https://ui-avatars.com/api/?name=${fullName}`;

    const newUser = await User.create({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic,
      publicKey 
    })

    if (newUser) {

      const token = generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        token,
        publicKey: newUser.publicKey
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }


    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      token,
      publicKey: user.publicKey
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const logoutUser = (req, res) => {
  try {

    res.status(200).json({message: "Logged out successfully"});
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}