using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace CarSystem.handle
{
    /// <summary>
    /// UpdateCarInfo 的摘要说明
    /// </summary>
    public class UpdateCarInfo : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string table = context.Request["table"]; //表名
            string col = context.Request["col"];     //主键名
            string value = context.Request["value"]; //主键值
            string ids = context.Request["ids"];
            string id = context.Request["id"];
            string[] vs = ids.Split(',');
            int? j = 0;
            for (int i = 0; i <= vs.Length - 1; i++)
            {
                string sql = "update " + table + " set " + col + " = '" + value + "' where "+id+" = @id";
                j += SqlHelper.ExecuteSql(sql, CommandType.Text, new SqlParameter("@id", vs[i]));
            }
            if (j == vs.Length*2)
            {
                context.Response.Write("0");
            }
            else
            {
                context.Response.Write("1");
            }
           
         
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