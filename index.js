const Photos = require("googlephotos");
const chooseRandomPhotos = require("./commands/chooseRandomPhotos");
const listAlbums = require("./commands/listAlbums");
const loadPhotoIds = require("./commands/loadPhotoIds");
const authenticate = require("./util/authenticate");

const main = async (auth) => {
  const photos = new Photos(auth.credentials.access_token);

  const [, , ...args] = process.argv;
  switch (args[0]) {
    case "--list":
      return await listAlbums(photos);
    case "--load":
      const albumId = args[1];
      return await loadPhotoIds(photos, albumId);
    case "--choose":
      const path = args[1];
      return await chooseRandomPhotos(photos, path, 10);
  }
};

authenticate().then(main).catch(console.error);
