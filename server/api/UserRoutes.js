const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const verification = express.Router();

const User = require("../model/user");

// verification.use((req, res, next) => {
//   const token = JSON.parse(req.headers["authorization"]);
//   if (!token) {
//     res.status(401).send({ error: "Necesitas autorización" });
//   }
//   if (token.startsWith("Bearer ")) {
//     token = token.slice(7, token.length);
//   }
//   if (token) {
//     jwt.verify(token, process.env.KEY, (error, decoded) => {
//       if (error) {
//         return res.json({
//           message: error,
//         });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   }
// });

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/register", async (req, res) => {
  try {
    if (await userExists(req.body.user)) {
      res.status(409).json({ error: "Usuario ya registrado" });
    } else {
      const password = req.body.password;
      const hash = bcryptjs.hashSync(password, 8);
      const newUser = new User({
        user: req.body.user,
        password: hash,
      });
      newUser.save().then((user) => {
        const payload = {
          check: true,
        };
        const token = jwt.sign(payload, process.env.KEY, {
          expiresIn: "7d",
        });
        res.status(200).json(token);
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const userExists = async (user) => {
  const userExist = await User.findOne({ user: user.toLowerCase().trim() });
  if (userExist) {
    return true;
  } else {
    return false;
  }
};

router.post("/login", async (req, res) => {
  const password = req.body.password;
  User.findOne({ user: req.body.user })
    .then(async (user) => {
      let compare = await bcryptjs.compare(password, user.password);
      if (compare) {
        const payload = {
          check: true,
        };
        const token = jwt.sign(payload, process.env.KEY, {
          expiresIn: "7d",
        });
        res.status(200).json(token);
      } else {
        res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
