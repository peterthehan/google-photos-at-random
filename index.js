const Photos = require("googlephotos");
const authenticate = require("./util/authenticate");
const getAllPhotoIds = require("./util/getAllPhotoIds");
const getRandomPhoto = require("./util/getRandomPhoto");
const { albumId } = require("./config");

const main = async (auth) => {
  const photos = new Photos(auth.credentials.access_token);

  // await getAllPhotoIds(photos, albumId);
  await getRandomPhoto(photos);
};

authenticate().then(main).catch(console.error);
