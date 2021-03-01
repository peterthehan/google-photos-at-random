# Google Photos at Random

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan) [![Ko-fi](https://img.shields.io/badge/Donate-Ko--fi-F16061.svg?logo=ko-fi)](https://ko-fi.com/peterthehan) [![Patreon](https://img.shields.io/badge/Donate-Patreon-F96854.svg?logo=patreon)](https://www.patreon.com/peterthehan)

Load photos at random from a Google Photos album.

## Setup credentials

1. Go to Google's [API Console](https://console.developers.google.com/).
2. Go to the Credentials tab and create an OAuth web client.
3. Authorize `http://localhost:3000/oauth2callback` as a URI redirect.

> Take note of your `Client ID` and `Client secret`. You will need this in the next section.

## Setup project

1. Run the scripts below to get the project:

```
git clone https://github.com/peterthehan/google-photos-at-random.git
cd google-photos-at-random
npm i
```

2. Find and rename [example.config.json](https://github.com/peterthehan/google-photos-at-random/blob/master/src/example.config.json) to `config.json`. Open the file and enter your `Client ID` and `Client secret` from the previous section:

```
{
  "clientId": "CLIENT_ID_PLACEHOLDER",
  "clientSecret": "CLIENT_SECRET_PLACEHOLDER",
  "redirectUri": "http://localhost:3000/oauth2callback"
}
```

3. Run `npm start`.

> You will need to authenticate with your Google account on start.

## Troubleshooting

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord server invite" alt="Discord server invite" />
</a>
