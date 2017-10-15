# Widgetoko

An Electron and Node.js demonstration app written in C# and compiled to JavaScript using [Bridge](http://bridge.net) and [Retyped](https://retyped.com). 

Widgetoko enables users to connect to Twitter and watch tweets arrive in real-time that match a specified search term.

<p align="center"><img src="https://user-images.githubusercontent.com/62210/31524623-2c2e3906-af78-11e7-9e00-4df7227fa219.png"></p>

There are several options for installing Widgetoko. Packaged installers are available as .exe (Win) and .dmg (Mac), or you can build the project from the original source code.

## Installers

Platform | Version | Installer
---- | ---- | ----
Win | 1.0.0 | [Widgetoko.exe](https://github.com/bridgedotnet/Archives/raw/master/Widgetoko/1.0.0/Widgetoko.exe)
Mac | 1.0.0 | [Widgetoko.dmg](https://github.com/bridgedotnet/Archives/raw/master/Widgetoko/1.0.0/Widgetoko.dmg)

## Build from source

### Requirements

1. Install [Yarn](https://yarnpkg.com)

### Start

1. Clone this repo
1. Using the **Command** (Win) or **Terminal** (Mac), browse to the `/dist` directory
1. Run the following `yarn` commands:

```
yarn install
yarn start
```

Yarn will take a few minutes to download the required packages if this is your first time running `yarn install`. Just let the process run. 

Once complete, run the command `yarn start` and Widgetoko should start up automatically.

## Configure Twitter Tokens

A connection to the Twitter Stream is required, so we must register the Widgetoko app with Twitter and generate Access Tokens. This is a required step to tap into the Tweet stream.

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

**Security Notice:**

Your tokens will be saved in **%appdata%/widgetoko/UserSettings.json** in an obfuscated format. You have several options to remove tokens afterwards:
- Just delete that file.
- Replace the **Options** form with empty values, then click **Save** to overwrite your old token values.
- Invalidate the tokens from the Twitter [app configuration](https://apps.twitter.com/app/), or just delete the app from Twitter.

## Build Installers

Creating an actual installer for the Widgetoko app is very simple. To create the installer, use the following steps:

1. Clone this repo (if you have not done so already)
1. With a **Command Window** (Windows) or **Terminal** (Mac), browse to the `/dist` directory
1. Run the following `yarn` commands:

```
yarn install
yarn build
```

Installers can be created for Mac, Windows, and Linux. The installer creation process should take no more than a few minutes, but needs to be run on each platform you support. If you want an .exe for Windows, run the command on a Windows machine. Need a Mac installer? run the command on a Mac. 

The installer files, such as .exe (Win) and .dmg (Mac), will be added to the **/dist/installers/** folder and those files can be deployed to your users.
