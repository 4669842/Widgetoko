using Bridge;
using Retyped;

namespace Widgetoko.RendererProcess
{
    public static class SplashScreen
    {
        [Init(InitPosition.Top)]
        public static void InitGlobals()
        {
            // Init global variables (modules):
            var Electron = (electron.Electron.AllElectron)node.require.Self("electron");
            var jQuery = node.require.Self("jquery");
        }

        [Template("Electron")]
        public static electron.Electron.AllElectron Electron;

        public static void Main()
        {
            // Set launching message:
            var msg = $"Launching {Electron.remote.getCurrentWindow().getTitle()} ...";

            jquery.jQuery.select("#launchMsg").html((jquery.JQuery.htmlString) msg);
        }
    }
}