const { state } = require("../db/db");

async function auth(req, res, next) {
  const account = await state.musicDB
    .collection("account")
    .findOne({ token: req.headers.authorization });
  if (account) {
    next();
  } else {
    res.status(403).json({ ok: false, data: "oh,no!!maybe you are not owner" });
  }
}

module.exports = auth;
