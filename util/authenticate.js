const express = require("express");
const { google } = require("googleapis");
const Photos = require("googlephotos");
const opn = require("open");
const {
  web: { client_id, client_secret, redirect_uri },
} = require("../oauth2.keys");

module.exports = async () => {
  const client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
  const scopes = [Photos.Scopes.READ_ONLY];
  const authorizeUrl = client.generateAuthUrl({ scope: scopes });

  const app = express();
  const server = app.listen(3000, () => opn(authorizeUrl));

  return new Promise((resolve, reject) => {
    app.get("/oauth2callback", (req, res) => {
      client.getToken(req.query.code, (error, tokens) => {
        let message;
        if (error) {
          message = `Error getting OAuth tokens: ${error}`;
          reject(message);
        } else {
          message = "Authentication successful! Please return to the console.";
          client.credentials = tokens;
          resolve(client);
        }

        res.send(message);
        server.close();
      });
    });
  });
};
