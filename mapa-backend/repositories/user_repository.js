const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserRepository {
  //Register
  async registerUser(data) {
    const {
      first_name,
      last_name,
      nick,
      rol,
      password,
      email,
      active,
      hasChangePassword,
    } = data;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      nick,
      rol,
      password: encryptedPassword,
      email: email.toLowerCase(),
      active,
      hasChangePassword,
    });

    return await user.save();
  }

  //GetUsers
  async getUsers(req, res) {
    return await User.find().lean().exec();
  }

  async userEmail(email) {
    return await User.findOne({ email, active: true });
    //Ver porque no anda con active: false
  }

  //Reset
  async reset(req, res) {
    encryptedPassword = await bcrypt.setRandomFallback(password, 10);

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: "enzoefica@gmail.com",
      to: user.email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    res.status(201).send({ info });

    res.json(req.body);
  }

  //EditUser
  async editUser(data) {
    const { first_name, last_name, nick, rol, email, id, password } = data;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newData = {
      first_name: first_name,
      last_name: last_name,
      nick: nick,
      password: encryptedPassword,
      rol: rol,
      email: email.toLowerCase(),
    };

    await User.findByIdAndUpdate({ _id: id }, newData);

    const userStored = await User.findById(id);

    return userStored;
  }

  async editUserStatus(data) {
    const { active, id } = data;

    const newData = {
      active: active,
      id: id,
    };

    await User.findByIdAndUpdate({ _id: id }, newData);

    const userStored = await User.findById(id);

    return userStored;
  }
}

module.exports = UserRepository;
