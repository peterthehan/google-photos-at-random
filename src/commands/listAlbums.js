const getCachedAlbums = require("../util/getCachedAlbums");

module.exports = async () => {
  const albums = getCachedAlbums();

  console.log(
    albums
      .map(
        (album, index) =>
          `${index + 1}. ${album.title} - ${
            album.cachedPhotosCount
          } cached photo(s)\n${album.productUrl}`
      )
      .join("\n")
  );
};
