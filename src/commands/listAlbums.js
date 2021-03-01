const get = require("../util/get");

module.exports = async () => {
  console.log(
    Object.values(get())
      .map((album) => `    ${album.title} - ${album.productUrl}`)
      .join("\n")
  );
};
