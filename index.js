const Photos = require("googlephotos");
const authenticate = require("./util/authenticate");
const getAllPhotoIds = require("./util/getAllPhotoIds");
const getRandomPhotos = require("./util/getRandomPhotos");
const { albumId } = require("./config");

const main = async (auth) => {
  const photos = new Photos(auth.credentials.access_token);

  // await getAllPhotoIds(photos, albumId);
  await getRandomPhotos(photos, 5);
};

authenticate().then(main).catch(console.error);
