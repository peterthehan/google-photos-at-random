const path = require("path");
const express = require("express");
const { google } = require("googleapis");
const Photos = require("googlephotos");
const opn = require("open");

module.exports = (callback) => {
  const keyfile = path.join(__dirname, "../oauth2.keys.json");
  const { client_id, client_secret, redirect_uri } = require(keyfile).web;
  const client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

  const scopes = [Photos.Scopes.READ_ONLY];
  this.authorizeUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  const app = express();

  const server = app.listen(3000, () =>
    opn(this.authorizeUrl, { wait: false })
  );

  app.get("/oauth2callback", (req, res) => {
    client.getToken(req.query.code, (err, tokens) => {
      if (err) {
        console.error("Error getting OAuth tokens:");
        throw err;
      }

      client.credentials = tokens;
      res.send("Authentication successful! Please return to the console.");
      server.close();

      callback(client);
    });
  });
};
