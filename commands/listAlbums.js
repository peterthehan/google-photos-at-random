const batchLoader = require("../util/batchLoader");

const MAX_ALBUMS_PAGE_SIZE = 50;

module.exports = async (photos) => {
  const callback = async (nextPageToken) => {
    const response = await photos.albums.list(
      MAX_ALBUMS_PAGE_SIZE,
      nextPageToken
    );

    return {
      batch: response.albums.map(
        ({ id, title, productUrl, mediaItemsCount }) => ({
          id,
          title,
          productUrl,
          mediaItemsCount,
        })
      ),
      nextPageToken: response.nextPageToken,
    };
  };
  const albums = await batchLoader(callback);

  console.log(albums);
};
