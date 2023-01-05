const { User } = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Create function
  register: (req, res) => {
    User.create(req.body)
      .then((user) => {
        const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res
          .cookie("usertoken", userToken, { httpOnly: true })
          .json({ msg: "success", user: user });
      })
      .catch((err) => {
        console.log("in err");
        res.status(400).json(err);
      });
  },

  // Read Function
  getAll: (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json(err));
  },

  getOne: (req, res) => {
    User.findOne(req.params)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // Update
  updateUser: (req, res) => {
    User.findOneAndUpdate(req.params, req.body, {
      new: true,
      runValidators: true,
    })
      .then((update) => res.json(update))
      .catch((err) => res.status(400).json(err));
  },

  // AUTH funcitons
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) {
      return res.sendStatus(400);
    }

    const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res
      .cookie("usertoken", userToken, { httpOnly: true })
      .json({ msg: "success!" });
  },

  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
  },
};
