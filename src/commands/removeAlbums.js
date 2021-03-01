const prompts = require("prompts");

const get = require("../util/get");
const put = require("../util/put");

module.exports = async () => {
  const track = get();
  const albums = Object.values(track);

  const { values } = await prompts({
    type: "multiselect",
    name: "values",
    message: `Select from ${albums.length} album(s) to remove from track`,
    choices: albums.map((album) => ({
      title: album.title,
      value: album.id,
    })),
  });

  if (values.length === 0) {
    return;
  }

  values.forEach((value) => delete track[value]);

  put(track);
};
