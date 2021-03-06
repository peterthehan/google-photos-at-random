const sleep = require("./sleep");

module.exports = async (callback, delay = 1000) => {
  const collection = [];
  let index = 0;
  let nextPageToken = null;

  do {
    const response = await callback(nextPageToken);

    collection.push(...response.batch);
    nextPageToken = response.nextPageToken;

    console.log(`Batch ${++index}: ${response.batch.length} item(s) found`);
    await sleep(delay);
  } while (nextPageToken);

  console.log(`Total: ${collection.length} item(s) found`);

  return collection;
};
