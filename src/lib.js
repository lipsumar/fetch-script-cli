const fs = require("fs")

module.exports = {
  isFile(f) {
    let stat = null;
    try {
      stat = fs.lstatSync(f);
    } catch (err) {
      return false;
    }
    return stat.isFile();
  }
};
