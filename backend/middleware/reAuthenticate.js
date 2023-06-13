const jwt = require("jsonwebtoken");

const reAuthenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    console.log("token from reauthenticate", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken from reauthenticate", decodedToken);

    req.user = decodedToken;
    console.log("req.user from reauthenticate", req.user);

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = reAuthenticate;
