const Photos = require("googlephotos");
const authenticate = require("./util/authenticate");
const loadPhotoIds = require("./util/loadPhotoIds");
const chooseRandomPhotos = require("./util/chooseRandomPhotos");
const { albumId } = require("./config");

const main = async (auth) => {
  const photos = new Photos(auth.credentials.access_token);

  const [, , ...args] = process.argv;
  switch (args[0]) {
    case "--load":
      return await loadPhotoIds(photos, albumId);
    case "--choose":
      return await chooseRandomPhotos(photos, 10);
  }
};

authenticate().then(main).catch(console.error);
