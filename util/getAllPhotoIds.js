const fs = require("fs");
const sleep = require("./sleep");

module.exports = async (photos, albumId) => {
  const photoIds = [];
  let index = 0;
  let nextPageToken = null;
  do {
    const response = await photos.mediaItems.search(
      albumId,
      100,
      nextPageToken
    );

    photoIds.push(...response.mediaItems.map((mediaItem) => mediaItem.id));
    nextPageToken = response.nextPageToken;

    console.log(`Batch ${++index}: ${response.mediaItems.length} photos found`);
    await sleep(1500);
  } while (nextPageToken);

  console.log(`Total: ${photoIds.length} photos found`);
  fs.writeFileSync("./photo-ids.json", JSON.stringify(photoIds, null, 2));
};
