const getRandomInt = require("./getRandomInt");

module.exports = async (photos) => {
  const photoIds = require("../photo-ids");
  const randomIndex = getRandomInt(0, photoIds.length);
  const randomPhotoId = photoIds[randomIndex];
  const randomPhoto = await photos.mediaItems.get(randomPhotoId);

  console.log(randomPhoto);
};
