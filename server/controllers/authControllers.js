import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import { handleGenerateToken } from "../utils/utils.js";
/**
 * ? Signup Controller
 **/
export const handleSignUp = async (req, res) => {
 
  try {
    const { email, name, password,gender } = req.body;
    console.log("SignUP: ",req.body)
    const body = req.body;
    for (const key in body) {
      if (!body[key]) {
        res.send({
          status: false,
          message: `Please Fill the ${key} field`,
        });
        return;
      }
    }
    if (password.trim().length < 8) {
      return res.status(400).send({
        status: false,
        message: `Password should be greater than 8 characters`,
      });
    }
    const find = await userModel.findOne({ email });
    if (find) {
      return res.status(400).send({
        status: false,
        message: `Email already existed`,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const maleProfilePic = "https://avatar.iran.liara.run/public/boy";
    const femaleProfilePic = "https://avatar.iran.liara.run/public/girl";
    const profilePic = gender === "male" ? maleProfilePic : femaleProfilePic;
    const newUser = await userModel.create({
      email,
      username: name,
      password: hashPassword,
      gender,
      score:0,
      profilePic: profilePic,
    });
    res.status(201).send({
      status: true,
      message: `User created Successfully`,
      user: {
        id: newUser?._id,
        email: newUser?.email,
        username: newUser?.name,
        gender: newUser?.gender,
        profilePic: newUser?.profilePic,
        score: 0,
        createdAt: newUser?.createdAt,
        updatedAt: newUser?.updatedAt,
      },
    });
  } catch (err) {
    console.log("handleSignUp error ;", err);
    res.status(500).send({
      status: false,
      error: err,
    });
  }
};
/**
 * ? Login Controller
 **/

export const handleLoginUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("LOGIN INFORMATION: ",req.body);
    const user = await userModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).send({
        status: false,
        message: "Invalid Credentials",
      });
    }
    const samePassword = await bcrypt.compare(password, user?.password);
    console.log("Password comparison result: ", samePassword, typeof samePassword);

    if (!samePassword) {
      return res.status(400).send({
        status: false,
        message: "Invalid Credentialsssss",
      });
    }
    const token = handleGenerateToken(user._id);
    console.log(token);
    delete user?.password;
    res.status(200).send({
      status: true,
      user: user,
      token: token,
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      error: err,
    });
  }
};
/**
 * ? Logout Controller
 **/
export const handleLogout = (req, res) => {
  try {
    res.send({
      status: true,
      message: "Logout Api",
    });
  } catch (err) {
    res.send({
      status: false,
      error: err,
    });
  }
};

export const updateScore = async (req, res) => {
  const { email, score } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (score > user.score) {
      user.score = score;
      await user.save();
    }

    const updatedUser = { 
      _id: user._id,
      email: user.email,
      username: user.username,
      gender: user.gender,
      score: user.score,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json({ 
      message: 'Score updated successfully', 
      user: updatedUser // return updated user object
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTopScores = async (req, res) => {
  console.log("Top Scores")
  try {
    const topScores = await userModel.find()
      .sort({ score: -1 })  
      .limit(10);  
      console.log("Top 10 Scores : ",topScores)
    res.status(200).json(topScores);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

