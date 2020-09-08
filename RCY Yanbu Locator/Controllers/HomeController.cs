using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace RCY_Yanbu_Locator.Controllers
{
    public class HomeController : Controller
    {
        string defaultLocale = ConfigurationManager.AppSettings["defaultLocale"];
        public ActionResult Index()
        {
            
            if (Request.Cookies["lang"] == null || Request.Cookies["lang"].Value == null)
            {
                Response.Cookies["lang"].Value = defaultLocale;
            }
            if (Request.Cookies["lang"].Value == "en")
            {
                ViewBag.Title = "Yanbu Locator";
            }else
            {
                ViewBag.Title = "محدد ينبع";
            }
            return View();

        }

        public ActionResult ChangeCulture(string lang)
        {
            Response.Cookies["lang"].Value = lang;
            //Session["Language"] = lang;
            return RedirectToAction("Index", "Home");
        }
    }
}
