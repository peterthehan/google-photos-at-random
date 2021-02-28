const prompts = require("prompts");

const batchLoader = require("../util/batchLoader");
const isEmpty = require("../util/isEmpty");
const read = require("../util/read");
const write = require("../util/write");

const MAX_ALBUMS_PAGE_SIZE = 50;

const addAlbumsToTrack = async (photos) => {
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

  const { values } = await prompts({
    type: "multiselect",
    name: "values",
    message: `Select albums (${albums.length}) to track`,
    choices: albums.map((album) => ({
      title: album.title,
      description: `${album.mediaItemsCount} photos`,
      value: { id: album.id, title: album.title, productUrl: album.productUrl },
    })),
  });

  const albumsToAdd = values.reduce(
    (obj, value) => ({ ...obj, [value.id]: value }),
    {}
  );

  const data = read();
  write({ ...data, ...albumsToAdd });
};

const removeAlbumsToTrack = async () => {
  const data = read();
  const albums = Object.values(data);

  const { values } = await prompts({
    type: "multiselect",
    name: "values",
    message: `Select albums (${albums.length}) to untrack`,
    choices: albums.map((album) => ({
      title: album.title,
      value: album.id,
    })),
  });

  values.forEach((value) => delete data[value]);

  write(data);
};

module.exports = async (photos) => {
  while (true) {
    const empty = isEmpty();

    const { value } = await prompts({
      type: "select",
      name: "value",
      message: "Manage tracked albums",
      choices: [
        { title: "Add albums to track", value: "add" },
        {
          title: empty
            ? "Remove albums to track - Nothing to remove!"
            : "Remove albums to track",
          value: "remove",
          disabled: empty,
        },
        { title: "Return to previous menu", value: "return" },
      ],
    });

    switch (value) {
      case "add":
        await addAlbumsToTrack(photos);
        break;
      case "remove":
        await removeAlbumsToTrack();
        break;
      case "return":
        return;
    }
  }
};
