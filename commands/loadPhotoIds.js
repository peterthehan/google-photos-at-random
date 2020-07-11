const fs = require("fs");
const batchLoader = require("../util/batchLoader");

const MAX_MEDIAITEMS_PAGE_SIZE = 100;

module.exports = async (photos, albumId) => {
  const callback = async (nextPageToken) => {
    const response = await photos.mediaItems.search(
      albumId,
      MAX_MEDIAITEMS_PAGE_SIZE,
      nextPageToken
    );

    return {
      batch: response.mediaItems.map((mediaItem) => mediaItem.id),
      nextPageToken: response.nextPageToken,
    };
  };
  const photoIds = await batchLoader(callback);

  const album = await photos.albums.get(albumId);
  const path = `./albums/${album.title}-${album.id}.json`;
  fs.writeFileSync(path, JSON.stringify(photoIds, null, 2));
  console.log(`File written to: ${path}`);
};
