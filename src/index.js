const Photos = require("googlephotos");
const prompts = require("prompts");

const listAlbums = require("./commands/listAlbums");
const addAlbums = require("./commands/addAlbums");
const removeAlbums = require("./commands/removeAlbums");
const updateAlbums = require("./commands/updateAlbums");
const chooseFromAlbums = require("./commands/chooseFromAlbums");

const authenticate = require("./util/authenticate");
const get = require("./util/get");

const main = async (auth) => {
  const photos = new Photos(auth.credentials.access_token);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value } = await prompts({
      type: "select",
      name: "value",
      message: "Main menu",
      choices: [
        { title: "List tracked albums", value: "list" },
        { title: "Add albums to track", value: "add" },
        { title: "Remove albums from track", value: "remove" },
        { title: "Update tracked albums", value: "update" },
        { title: "Choose photos from tracked albums", value: "choose" },
        { title: "Exit", value: "return" },
      ],
    });

    const isEmpty = Object.keys(get()).length === 0;
    if (isEmpty && ["list", "remove", "update", "choose"].includes(value)) {
      console.log(`Nothing to ${value}, please add albums to track first!`);
      continue;
    }

    switch (value) {
      case "list":
        await listAlbums();
        break;
      case "add":
        await addAlbums(photos);
        break;
      case "remove":
        await removeAlbums();
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
