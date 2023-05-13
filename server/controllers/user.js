import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const loginType = req.body.loginType;
  if (loginType == "local") {
  const { email, password, isAdmin } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist. Please Sign Up First" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    const userType = oldUser.isAdmin;

    if (userType != isAdmin) return res.status(400).json({ message: "Invalid User Login. Please Select The Correct User Type!" });

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials. Wrong Email or Password Entered" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    const result = {...oldUser._doc, userId: oldUser._id};

    res.status(200).json({ result: result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
} else if(loginType == "google"){
  const { email, isAdmin, cred } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist. Please Sign Up First" });

    const userType = oldUser.isAdmin;
    if (userType != isAdmin) return res.status(400).json({ message: "Invalid User Login. Please Select The Correct User Type!" });

    const token = cred;
    const result = {...oldUser._doc, userId: oldUser._id};

    res.status(200).json({ result: result, token });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
};

export const signup = async (req, res) => {
  const loginType = req.body.loginType;

  if (loginType == "local") {
  const { email, password, firstName, lastName, isAdmin } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists. Please Login." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, isAdmin: isAdmin,loginTime: Date.now() ,loginType: loginType });
    
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
} else if(loginType == "google"){
  const { email, familyname, givenName, isAdmin, cred } = req.body;
  const name = `${givenName} ${familyname}`;

  try {

    const oldUser = await UserModal.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists. Please Login." });
    const result = await UserModal.create({ email,password: "google-login", name: name, isAdmin: isAdmin,loginTime: Date.now() ,loginType: loginType });
    const token = cred;
    res.status(201).json({ result, token });
  
  } catch(error){
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }

}
};
