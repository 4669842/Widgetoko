// Init global variables (modules):
var Electron = require("electron");
var jQuery = require("jquery");

Bridge.assembly("Widgetoko", function ($asm, globals) {
    "use strict";

    Bridge.define("Widgetoko.RendererProcess.MainForm", {
        main: function Main () {
            jQuery("#appNameHeader").html(Electron.remote.getCurrentWindow().getTitle());

            // Configure handlers for IPC commands:
            Widgetoko.RendererProcess.MainForm.ConfigureIPC();

            // Configure handlers for HtmlElement events:
            Widgetoko.RendererProcess.MainForm.ConfigureEventHandlers();

            // Set Theme:
            Widgetoko.RendererProcess.MainForm.ToggleTheme();
        },
        statics: {
            fields: {
                MaxTweetsOnPage: 0,
                NotificationBufferTimeSec: 0,
                LightThemeCss: null,
                DarkThemeCss: null,
                Electron: null,
                _listener: null,
                _lastNotificationDate: null,
                _isStarted: false
            },
            ctors: {
                init: function () {
                    this.MaxTweetsOnPage = 20;
                    this.NotificationBufferTimeSec = 10;
                    this.LightThemeCss = "../assets/css/light.css";
                    this.DarkThemeCss = "../assets/css/dark.css";
                }
            },
            methods: {
                ConfigureEventHandlers: function () {
                    jQuery("#captureFilterInput").on("input", function (e, args) {
                        if (Widgetoko.RendererProcess.MainForm._isStarted) {
                            Electron.ipcRenderer.send("cmd-stop-capture");
                        }
                        return null;
                    });

                    jQuery("#captureFilterInput").keypress(function (e, args) {
                        if (e.keyCode === 13 && !Widgetoko.RendererProcess.MainForm._isStarted) {
                            Electron.ipcRenderer.send("cmd-start-capture");
                        }
                        return null;
                    });

                    jQuery(".play").on("click", function (e, args) {
                        Electron.ipcRenderer.send("cmd-start-capture");
                        return null;
                    });

                    jQuery(".pause").on("click", function (e, args) {
                        Electron.ipcRenderer.send("cmd-stop-capture");
                        return null;
                    });
                },
                ConfigureIPC: function () {
                    Electron.ipcRenderer.on("cmd-start-capture", function () {
                        jQuery("#placeholder").hide();
                        jQuery(".play").hide();
                        jQuery(".pause").show();

                        Widgetoko.RendererProcess.MainForm._listener = Widgetoko.RendererProcess.MainForm.InitListener();
                        if (Widgetoko.RendererProcess.MainForm._listener != null) {
                            Widgetoko.RendererProcess.MainForm._listener.Start();
                            Widgetoko.RendererProcess.MainForm._isStarted = true;
                        } else {
                            // Can't start capturing due to some error (no filter, no credentials)
                            Electron.ipcRenderer.send("cmd-stop-capture");
                        }
                    });

                    Electron.ipcRenderer.on("cmd-stop-capture", function () {
                        jQuery(".pause").hide();
                        jQuery(".play").show();

                        Widgetoko.RendererProcess.MainForm._listener != null ? Widgetoko.RendererProcess.MainForm._listener.Stop() : null;
                        Widgetoko.RendererProcess.MainForm._isStarted = false;
                    });

                    Electron.ipcRenderer.on("cmd-clear-capture", function () {
                        jQuery("#capturedItemsDiv").html("");
                        jQuery("#placeholder").show();
                    });

                    Electron.ipcRenderer.on("cmd-toggle-theme", function (ev) {
                        Widgetoko.RendererProcess.MainForm.ToggleTheme();
                    });
                },
                InitListener: function () {
                    // Get credentials from the main process:
                    var credentials = Electron.ipcRenderer.sendSync("cmd-get-credentials-sync");

                    // Check credentials:
                    if (credentials == null || System.String.isNullOrEmpty(credentials.ApiKey) || System.String.isNullOrEmpty(credentials.ApiSecret) || System.String.isNullOrEmpty(credentials.AccessToken) || System.String.isNullOrEmpty(credentials.AccessTokenSecret)) {
                        alert("Please specify API keys and Access tokens before starting.");

                        return null;
                    }

                    // Check filter value:
                    var filter = jQuery("#captureFilterInput").val();
                    if (System.String.isNullOrEmpty(filter)) {
                        alert("Please specify filter value.");

                        return null;
                    }

                    // Create Twitter stream listener:
                    var listener = new Widgetoko.Twitter.TwitterListener(credentials, filter);

                    // Configure handlers for the created listener events:
                    listener.addOnReceived(function (sender, tweet) {
                        jQuery("#placeholder").hide();
                        Widgetoko.RendererProcess.MainForm.AddTweetToPage(tweet);

                        // Notify about the obtained tweet:
                        var notificationEnabled = jQuery("#notificationEnabledCheckbox").is(":checked");
                        if (notificationEnabled) {
                            // Use delay to avoid creating too many notifications:
                            if (Bridge.equals(Widgetoko.RendererProcess.MainForm._lastNotificationDate, null) || (System.DateTime.subdd(System.DateTime.getUtcNow(), System.Nullable.getValue(Widgetoko.RendererProcess.MainForm._lastNotificationDate))).getTotalSeconds() > Widgetoko.RendererProcess.MainForm.NotificationBufferTimeSec) {
                                Widgetoko.RendererProcess.MainForm._lastNotificationDate = System.DateTime.getUtcNow();
                                Widgetoko.RendererProcess.MainForm.CreateNotification(tweet);
                            }
                        } else {
                            Widgetoko.RendererProcess.MainForm._lastNotificationDate = null;
                        }
                    });

                    listener.addOnError(function (sender, err) {
                        // Stop capturing on error:
                        Electron.ipcRenderer.send("cmd-stop-capture");
                        alert(System.String.format("Error: {0}", [err]));
                    });

                    return listener;
                },
                ToggleTheme: function () {
                    var lightThemeLink = jQuery(System.String.format("link[href='{0}']", [Widgetoko.RendererProcess.MainForm.LightThemeCss]));
                    var darkThemeLink = jQuery(System.String.format("link[href='{0}']", [Widgetoko.RendererProcess.MainForm.DarkThemeCss]));

                    var newTheme = lightThemeLink.length === 0 ? Widgetoko.RendererProcess.MainForm.LightThemeCss : Widgetoko.RendererProcess.MainForm.DarkThemeCss;

                    if (lightThemeLink.length === 0) {
                        darkThemeLink.remove();
                    } else if (darkThemeLink.length === 0) {
                        lightThemeLink.remove();
                    }

                    jQuery("head").append(System.String.format("<link rel=\"stylesheet\" href=\"{0}\" >", [newTheme]));
                },
                CreateNotification: function (tweet) {
                    var notifTitle = (tweet.user.name || "") + " is tweeting..";

                    var notifOpts = { };
                    notifOpts.body = tweet.text;
                    notifOpts.icon = tweet.user.profile_image_url;

                    var notif = new Notification(notifTitle, notifOpts);
                    notif.onclick = function (notifEv) {
                        var tweetUrl = System.String.format("https://twitter.com/{0}/status/{1}", tweet.user.screen_name, tweet.id_str);

                        Electron.shell.openExternal(tweetUrl);
                    };
                },
                AddTweetToPage: function (tweet) {
                    var $t;
                    var div = ($t = document.createElement("div"), $t.className = "tweet-card animated slideInRight", $t);

                    div.ondblclick = Bridge.fn.combine(div.ondblclick, function (e) {
                        var tweetUrl = System.String.format("https://twitter.com/{0}/status/{1}", tweet.user.screen_name, tweet.id_str);
                        Electron.shell.openExternal(tweetUrl);
                    });

                    var img = ($t = document.createElement("img"), $t.className = "avatar", $t.src = tweet.user.profile_image_url, $t);

                    var nameDiv = ($t = document.createElement("div"), $t.className = "username", $t.innerHTML = (tweet.user.name || "") + "<span class='istweeting'> is tweeting...</span>", $t);

                    var textDiv = ($t = document.createElement("div"), $t.className = "tweet-text", $t.innerHTML = tweet.text, $t);

                    var tweetContent = ($t = document.createElement("div"), $t.className = "tweet-content", $t);
                    tweetContent.appendChild(nameDiv);
                    tweetContent.appendChild(textDiv);

                    div.appendChild(img);
                    div.appendChild(tweetContent);

                    var capturedItemsDiv = jQuery("#capturedItemsDiv");
                    var capturedItems = capturedItemsDiv.children();

                    if (capturedItems.length > 0) {
                        if (capturedItems.length >= Widgetoko.RendererProcess.MainForm.MaxTweetsOnPage) {
                            capturedItems[19].remove();
                        }
                    }

                    capturedItemsDiv.prepend(div);
                }
            }
        }
    });
});
