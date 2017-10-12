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

## Configure Twitter Tokens

Since multiple connections for Twitter stream API are not allowed, the access tokens should be generated in per-user base. That's required step in order to get tweets captured.

1. Go to https://apps.twitter.com/app/new

1. Fill in the fields (App name, Description, WebSite). You should use your own unique Application name, and any values you want for the other fields.
![createapp](https://user-images.githubusercontent.com/16582701/31498170-f81c2672-af69-11e7-8444-013fd96dfa62.png)

1. Press **Create your Twitter application** button.

1. The application has been created. Now go to **Keys and Access Tokens** tab.

1. Press **Create My access token** button to generate keys.

1. That's it, all tokens are generated:
![image](https://user-images.githubusercontent.com/16582701/31500006-fde8f8be-af6e-11e7-8765-e360ed843869.png)

1. The last step. You should copy-paste those tokens into Widgetoko app. Run Widgetoko, press F2 to open **Options** form, paste tokens as it's shown below. Press **Save** to remember changes.
![image](https://user-images.githubusercontent.com/16582701/31500161-64c1e3fc-af6f-11e7-8972-4747069e87d2.png)

**Security notice:**
Your tokens would be saved in **%appdata%/widgetoko/UserSettings.json** in obfuscated format. You have several options to remove them afterwards:
- Just remove that file.
- Put empty values in **Options** form and press **Save** to overwrite your tokens.
- You can invalidate tokens in Twitter by regenerating them, or even removing the created application.

Have fun!
