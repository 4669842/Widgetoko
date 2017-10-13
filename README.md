# Widgetoko

An Electron demonstration app written in C# using [Bridge](http://bridge.net) and [Retyped](https://retyped.com).
The application allows to capture real-time tweets satisfying to a specified filter.

<p align="center"><img src="https://user-images.githubusercontent.com/62210/31524623-2c2e3906-af78-11e7-9e00-4df7227fa219.png"></p>

## Start App

1. Clone this repo
1. With a Command Window or Terminal, browse to the `src/App` directory
1. Run the following commands:

```
npm install
npm start
```

The Widgetoko app should automatically start up. 

## Configure Twitter Tokens

Multiple connections to the Twitter Stream API are required, so we must register the Widgetoko app with Twitter and generate access tokens. This is a required step to tap into the Tweet stream.

1. Browse to https://apps.twitter.com/app/new

1. Fill in the fields (App name, Description, WebSite). You should use your own unique Application name, and any values you want for the other fields.

<p align="center"><img src="https://user-images.githubusercontent.com/62210/31524702-9fc74272-af78-11e7-9c31-98827df32c7c.png"></p>

1. Press **Create your Twitter application** button.

1. The application has been created. Now go to **Keys and Access Tokens** tab.

1. Press **Create My access token** button to generate keys.

1. That's it, all tokens are generated:

<p align="center"><img src="https://user-images.githubusercontent.com/62210/31524621-2bff5686-af78-11e7-82de-b7fa528280ce.png"></p>

1. The last step. You should copy-paste those tokens into Widgetoko app. Run Widgetoko, press F2 (or <kbd>File > Options</kbd>) to open **Options** form, paste your tokens as shown below. Click **Save**.

<p align="center"><img src="https://user-images.githubusercontent.com/62210/31524622-2c17c1d0-af78-11e7-87ee-ef4add2af6ed.png"></p>

**Security notice:**
Your tokens will be saved in **%appdata%/widgetoko/UserSettings.json** in an obfuscated format. You have several options to remove tokens afterwards:
- Just delete that file.
- Replace the **Options** form with empty values, then click **Save** to overwrite your old token values.
- Invalidate the tokens from the Twitter [app configuration](https://apps.twitter.com/app/), or just delete the app from Twitter.
