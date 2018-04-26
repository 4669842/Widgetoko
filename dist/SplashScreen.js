// Init global variables (modules):
var Electron = require("electron");
var jQuery = require("jquery");

Bridge.assembly("Widgetoko", function ($asm, globals) {
    "use strict";

    Bridge.define("Widgetoko.RendererProcess.SplashScreen", {
        main: function Main () {
            // Set launching message:
            var msg = System.String.format("Launching {0} ...", [Electron.remote.getCurrentWindow().getTitle()]);

            jQuery("#launchMsg").html(msg);
        },
        statics: {
            fields: {
                Electron: null
            }
        }
    });
});
