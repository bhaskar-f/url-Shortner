const jwt = require("jsonwebtoken");
const secret = "Bhskakfac";
function setUser(user) {
  // Convert to plain object with only needed fields
  const payload = {
    id: user._id,
    email: user.email,
    // add other fields you want in the token
  };

  return jwt.sign(payload, secret);
}
function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};
