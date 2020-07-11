const Photos = require("googlephotos");
const authenticate = require("./util/authenticate");
const getAllPhotoIds = require("./util/getAllPhotoIds");
const getRandomPhotos = require("./util/getRandomPhotos");
const { albumId } = require("./config");

const main = async (auth) => {
  const photos = new Photos(auth.credentials.access_token);

  const [, , ...args] = process.argv;
  switch (args[0]) {
    case "--load":
      return await getAllPhotoIds(photos, albumId);
    case "--choose":
      return await getRandomPhotos(photos, 10);
  }
};

authenticate().then(main).catch(console.error);
