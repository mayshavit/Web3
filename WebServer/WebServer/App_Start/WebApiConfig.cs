using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace WebServer
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            /*config.Routes.MapHttpRoute(
                "MazeApi",
                "api/{cash}/{action}/{id}"
                );*/
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{cash}/{name}/{rows}/{cols}",
                defaults: new
                {
                    name = RouteParameter.Optional,
                    rows = RouteParameter.Optional,
                    cols = RouteParameter.Optional
                }
            );
        }
    }
}
