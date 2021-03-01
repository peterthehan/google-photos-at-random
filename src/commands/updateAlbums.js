const fs = require("fs");
const prompts = require("prompts");

const batchLoader = require("../util/batchLoader");
const get = require("../util/get");

const MAX_MEDIAITEMS_PAGE_SIZE = 100;

module.exports = async (photos) => {
  const track = get();
  const albums = Object.values(track);

  const { value } = await prompts({
    type: "select",
    name: "value",
    message: `Select tracked album to update`,
    choices: [
      ...albums.map((album) => ({ title: album.title, value: album.id })),
      { title: "Return to main menu", value: "return" },
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

  const path = `./albums/${value}.json`;
  fs.writeFileSync(path, JSON.stringify(photoIds, null, 2));
  console.log(`    File written to: ${path}`);
};
