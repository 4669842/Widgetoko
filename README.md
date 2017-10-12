# Widgetoko

An Electron demonstration app written in C# using [Bridge](http://bridge.net) and [Retyped](https://retyped.com).
The application allows to capture real-time tweets satisfying to a specified filter.

<p align="center"><img src="https://user-images.githubusercontent.com/62210/31511947-99df7488-af46-11e7-8580-f1e5eed44743.png"></p>

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

![createapp](https://user-images.githubusercontent.com/16582701/31498170-f81c2672-af69-11e7-8444-013fd96dfa62.png)

1. Press **Create your Twitter application** button.

1. The application has been created. Now go to **Keys and Access Tokens** tab.

1. Press **Create My access token** button to generate keys.

1. That's it, all tokens are generated:
![image](https://user-images.githubusercontent.com/16582701/31500006-fde8f8be-af6e-11e7-8765-e360ed843869.png)

1. The last step. You should copy-paste those tokens into Widgetoko app. Run Widgetoko, press F2 (or <kbd>File > Options</kbd>) to open **Options** form, paste your tokens as shown below. Click **Save**.

![image](https://user-images.githubusercontent.com/16582701/31500161-64c1e3fc-af6f-11e7-8972-4747069e87d2.png)

**Security notice:**
Your tokens will be saved in **%appdata%/widgetoko/UserSettings.json** in an obfuscated format. You have several options to remove tokens afterwards:
- Just delete that file.
- Replace the **Options** form with empty values, then click **Save** to overwrite your old token values.
- Invalidate the tokens from the Twitter [app configuration](https://apps.twitter.com/app/), or just delete the app from Twitter.
