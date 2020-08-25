using System.Web;
using System.Web.Optimization;

namespace RCY_Yanbu_Locator
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/libs/jquery/jquery-{version}.js",
                        "~/Scripts/libs/jquery/jquery-{version}.slim.min.js",
                        "~/Scripts/libs/jquery/popper.min.js",
                        "~/Scripts/libs/jquery/nicescroll.min.js",
                        "~/Scripts/libs/pace/pace.js",
                        "~/Content/scripts/jqueryi18n/CLDRPluralRuleParser.js",
                        "~/Content/scripts/jqueryi18n/jquery.i18n.js",
                        "~/Content/scripts/jqueryi18n/jquery.i18n.messagestore.js",
                        "~/Content/scripts/jqueryi18n/jquery.i18n.fallbacks.js",
                        "~/Content/scripts/jqueryi18n/jquery.i18n.language.js",
                        "~/Content/scripts/jqueryi18n/jquery.i18n.parser.js",
                        "~/Content/scripts/jqueryi18n/jquery.i18n.emitter.js",
                        "~/Content/scripts/jqueryi18n/jquery.i18n.emitter.bidi.js"
                        ));

            //// Use the development version of Modernizr to develop with and learn from. Then, when you're
            //// ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/libs/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/libs/bootstrap/bootstrap.js",
                      "~/Scripts/libs/bootstrap/bootstrap-bundle.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Scripts/libs/pace/pace.css",
                      "~/Content/css/bootstrap/bootstrap.css",
                        "~/Content/css/fontawesome/all.css",
                      "~/Content/css/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/app-scripts").Include(
                      "~/Scripts/app/app.js",
                      "~/Scripts/app/map.js",
                      "~/Scripts/app/global.js"));
        }
    }
}
