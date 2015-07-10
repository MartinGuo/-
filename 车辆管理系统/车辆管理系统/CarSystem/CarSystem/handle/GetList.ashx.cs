using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Newtonsoft.Json;

namespace FInfo.handle
{
    /// <summary>
    /// GetList 的摘要说明
    /// </summary>
    public class GetList : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string table = context.Request["table"];
            string sql = string.Format("select * from {0}", table);
            //DataTable dt = SqlHelper.GetDS(sql, CommandType.Text).Tables[0];
            //string json = JsonConvert.SerializeObject(dt);
            //json = "{Rows:" + json + "}";
            //context.Response.Write(json);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}