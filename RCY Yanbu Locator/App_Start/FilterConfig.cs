using System.Web;
using System.Web.Mvc;

namespace RCY_Yanbu_Locator
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
