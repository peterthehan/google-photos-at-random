const read = require("../util/read");

module.exports = async () => {
  console.log(
    Object.values(read())
      .map((album) => `    ${album.title} - ${album.productUrl}`)
      .join("\n")
  );
};
