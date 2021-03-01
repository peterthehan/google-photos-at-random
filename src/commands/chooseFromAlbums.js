const open = require("open");
const prompts = require("prompts");

const getRandomInt = require("../util/getRandomInt");
const getCachedAlbums = require("../util/getCachedAlbums");
const sleep = require("../util/sleep");

module.exports = async (photos) => {
  const albums = getCachedAlbums();

  const album = await prompts({
    type: "select",
    name: "value",
    message: `Select tracked album to choose photos from`,
    choices: [
      ...albums.map((album) => ({
        title:
          album.cachedPhotosCount === 0
            ? `${album.title} - No cached photos`
            : album.title,
        description: `${album.cachedPhotosCount} cached photo(s)`,
        value: album.id,
        disabled: album.cachedPhotosCount === 0,
      })),
      { title: "Return to main menu", value: "return" },
    ],
  });

  if (album.value === "return") {
    return;
  }

  const number = await prompts({
    type: "number",
    name: "value",
    message: "Number of photos to choose",
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
      await sleep(1000);

      return photo;
    })
  );

  randomPhotos.forEach((photo) => open(photo.productUrl));
  console.log(randomPhotos.map((photo) => photo.productUrl).join("\n"));
};
