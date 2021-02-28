const open = require("open");
const prompts = require("prompts");

const getRandomInt = require("../util/getRandomInt");
const read = require("../util/read");
const sleep = require("../util/sleep");

module.exports = async (photos) => {
  const data = read();
  const albums = Object.values(data);

  const album = await prompts({
    type: "select",
    name: "value",
    message: `Select album to choose from`,
    choices: [
      ...albums.map((album) => ({
        title: album.title,
        value: `${album.title.split(" ").join("_")}_${album.id}`,
      })),
      { title: "Return to previous menu", value: "return" },
    ],
  });

  if (album.value === "return") {
    return;
  }

  const number = await prompts({
    type: "number",
    name: "value",
    message: "Number to choose",
    initial: 10,
    min: 0,
    max: 15,
  });

  if (number.value === 0) {
    return;
  }

  const photoIds = require(`../albums/${album.value}.json`);
  const randomPhotos = await Promise.all(
    [...Array(number.value).keys()].map(async () => {
      const photoId = photoIds[getRandomInt(0, photoIds.length)];
      const photo = await photos.mediaItems.get(photoId);
      await sleep(1500);

      return photo;
    })
  );

  console.log(
    randomPhotos.map((photo) => `    ${photo.productUrl}`).join("\n")
  );
  randomPhotos.forEach((photo) => open(photo.productUrl));
};
