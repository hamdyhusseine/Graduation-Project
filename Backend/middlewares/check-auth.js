const { decode } = require('../helpers/jwt')

module.exports = (req, res, next, mustBeAdmin = false, mustBeSeller = false) => {
  try {
    const token = req.headers['authorization']
    console.log(req.headers)
    const decoded_token = decode(token)
    // must be a seller but the user is not a seller
    if (mustBeSeller && !decoded_token.isSeller) {
      res.status(403).json({ message: "Must be a seller!" });
      return
    }
    if (!decoded_token.isAdmin && mustBeAdmin) {
      res.status(403).json({ message: "Must be an admin!" });
      return

    }
    req.user = decoded_token

    console.log('decoded_token ', decoded_token)
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Auth failed!" });
  }
};

