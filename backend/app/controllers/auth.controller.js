const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;
var nodemailer = require('nodemailer');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    email: req.body.email,
    lastname: req.body.lastname,
    validated: false,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
        res.send({ message: "User registered successfully!" });
})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.genereToken = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      const email=req.body.email;
      await User.update({ bearer_token: token},
      { where: { email: email } });
      res.status(200).send({
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.getAll = async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
};
exports.validation = async (req, res)=> {
  // validate
  const email=req.body.email;
  await User.update({ validated: true, validation_date:Date.now()},
  { where: { email: email } });
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
              user: "vuetest7@gmail.com",
              pass: "87654321v"
      },
      tls:{
          rejectUnauthorized:false
      }
  });
  let mailOptions = {
      from: "vuetest7@gmail.com",
      to: req.body.email,
      subject: "Validation de compte",
      html: 
      "Bonjour, votre compte est validé. Cordialement"
  };
  await transporter.sendMail(mailOptions, (error, info) => {})
  res.status(200).send({"Message":"done"});
}
