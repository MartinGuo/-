using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;


namespace CarSystem.handle
{
    /// <summary>
    /// SelRow 的摘要说明
    /// </summary>
    public class SelRow : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string swhere = context.Request["where"];
            string table = context.Request["table"];
            string sql = "select row_number() over(order by OJNum) as rownum ,*  from  "+table;
            if (!string.IsNullOrEmpty(swhere))
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