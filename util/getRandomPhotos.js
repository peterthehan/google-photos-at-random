const open = require("open");
const getRandomInt = require("./getRandomInt");
const sleep = require("./sleep");

module.exports = async (photos, count) => {
  const photoIds = require("../photo-ids");
  const randomPhotos = [];
  for (let i = 0; i < count; ++i) {
    const randomIndex = getRandomInt(0, photoIds.length);
    const randomPhotoId = photoIds[randomIndex];
    const randomPhoto = await photos.mediaItems.get(randomPhotoId);
    randomPhotos.push(randomPhoto);

    await sleep(1500);
  }

  console.log(randomPhotos);
  randomPhotos.forEach((photo) => open(photo.productUrl));
};
