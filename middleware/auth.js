
const { state } = require("../db/db");

export default function (req, res, next) {
    const account = await state.musicDB
      .collection("account")
      .findOne({ token: req.headers.authorization });
    if (account) {
        next()
    } else {
        res.status(403).json({ok: false, data: "oh,no!!maybe you are not owner"})
    }
}
