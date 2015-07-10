using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;


using System.Web.Script.Serialization;
namespace 平台搭建.handle
{
    /// <summary>
    /// listall 的摘要说明
    /// </summary>
    public class listall : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string swhere = context.Request["where"];
            string table = context.Request["table"];
            string sql = "select * from "+table;
            if(!string.IsNullOrEmpty(swhere))
            {
                sql += " where " + swhere;
            }
            DataSet ds = SqlHelper.GetDS(sql, CommandType.Text);
            DataTable dt = ds.Tables[0];
            string json = JsonConvert.SerializeObject(dt);
            json = "{Rows:" + json + "}";
            context.Response.Write(json);
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