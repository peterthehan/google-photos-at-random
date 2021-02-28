const fs = require("fs");
const prompts = require("prompts");

const batchLoader = require("../util/batchLoader");
const read = require("../util/read");

const MAX_MEDIAITEMS_PAGE_SIZE = 100;

module.exports = async (photos) => {
  const data = read();
  const albums = Object.values(data);

  const { value } = await prompts({
    type: "select",
    name: "value",
    message: `Select album to update`,
    choices: [
      ...albums.map((album) => ({
        title: album.title,
        value: album.id,
      })),
      { title: "Return to previous menu", value: "return" },
    ],
  });

  if (value === "return") {
    return;
  }

  const callback = async (nextPageToken) => {
    const response = await photos.mediaItems.search(
      value,
      MAX_MEDIAITEMS_PAGE_SIZE,
      nextPageToken
    );

    return {
      batch: response.mediaItems.map((mediaItem) => mediaItem.id),
      nextPageToken: response.nextPageToken,
    };
  };

  const photoIds = await batchLoader(callback);

  const album = await photos.albums.get(value);
  const path = `./albums/${album.title.split(" ").join("_")}_${album.id}.json`;
  fs.writeFileSync(path, JSON.stringify(photoIds, null, 2));
  console.log(`    File written to: ${path}`);
};
