const get = require("./get");

module.exports = () => {
  return Object.keys(get()).length === 0;
};
