const Photos = require("googlephotos");
const prompts = require("prompts");

const listAlbums = require("./commands/listAlbums");
const manageAlbums = require("./commands/manageAlbums");
const updateAlbums = require("./commands/updateAlbums");
const chooseFromAlbums = require("./commands/chooseFromAlbums");

const authenticate = require("./util/authenticate");
const isEmpty = require("./util/isEmpty");

const main = async (auth) => {
  const photos = new Photos(auth.credentials.access_token);

  while (true) {
    const empty = isEmpty();

    const { value } = await prompts({
      type: "select",
      name: "value",
      message: "Main menu",
      choices: [
        {
          title: empty
            ? "List tracked albums - Nothing to list!"
            : "List tracked albums",
          value: "list",
          disabled: empty,
        },
        { title: "Manage tracked albums", value: "manage" },
        {
          title: empty
            ? "Update tracked albums - Nothing to update!"
            : "Update tracked albums",
          value: "update",
          disabled: empty,
        },
        {
          title: empty
            ? "Choose from tracked albums - Nothing to choose!"
            : "Choose from tracked albums",
          value: "choose",
          disabled: empty,
        },
        { title: "Exit", value: "return" },
      ],
    });

    switch (value) {
      case "list":
        await listAlbums();
        break;
      case "manage":
        await manageAlbums(photos);
        break;
      case "update":
        await updateAlbums(photos);
        break;
      case "choose":
        await chooseFromAlbums(photos);
        break;
      case "return":
        return;
    }
  }
};

authenticate().then(main).catch(console.error);
