const sleep = require("./sleep");

module.exports = async (callback, delay = 1000) => {
  const collection = [];
  let nextPageToken = null;

  do {
    const response = await callback(nextPageToken);

    collection.push(...response.batch);
    nextPageToken = response.nextPageToken;

    await sleep(delay);
  } while (nextPageToken);

  return collection;
};
