const fs = require("fs");
const Photos = require("googlephotos");
const authenticate = require("./util/authenticate");
const getRandomInt = require("./util/getRandomInt");
const sleep = require("./util/sleep");

const getAllPhotoIds = async (photos, albumId) => {
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

const getRandomPhoto = async (photos) => {
  const photoIds = require("./photo-ids");
  const randomIndex = getRandomInt(0, photoIds.length);
  const randomPhotoId = photoIds[randomIndex];
  const randomPhoto = await photos.mediaItems.get(randomPhotoId);

  console.log(randomPhoto);
};

const main = async (auth) => {
  const photos = new Photos(auth.credentials.access_token);
  const albumId =
    "AAz0LG1inBU_08vSnG_Zq_qFEQ6qTwP9vnMo1N_V0AP7OPX3hReS2aVtzR1xaj2iAQVbCvghHNi_";

  // await getAllPhotoIds(photos, albumId);
  await getRandomPhoto(photos);
};

authenticate().then(main).catch(console.error);
