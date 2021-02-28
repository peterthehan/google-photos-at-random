const read = require("./read");

module.exports = () => {
  return Object.keys(read()).length === 0;
};
