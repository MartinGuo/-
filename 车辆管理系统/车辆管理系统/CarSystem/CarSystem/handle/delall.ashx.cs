using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
namespace 平台搭建.handle
{
    /// <summary>
    /// delall 的摘要说明
    /// </summary>
    public class delall : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string key = context.Request["key"];
            string ids = context.Request["ids"];
            string table = context.Request["table"];
            string[] vs = ids.Split(',');
            int? j = 0;
            for (int i = 0; i <= vs.Length - 1; i++) {
                string sql = "delete from " + table + " where "+key+" = @id";
                j += SqlHelper.ExecuteSql(sql, CommandType.Text, new SqlParameter("@id", vs[i]));
            }
            if (j >= vs.Length)
            {
                context.Response.Write("0");
            }
            else {
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





/************************************************************/
//            string va = "";
//            foreach (string v in vs)
//            {
//                va += "" + v + ",";
//            }
//            va=va.Remove(va.LastIndexOf(","));
//            //string wh = 
//            string sql = string.Format("delete {0} where {1} in ({2})", view, key, va);
//            int i = SqlHelper.ExecNonQuery(sql);
//            context.Response.Write(i);
//            //string sql = "delete " + view + " where " + key + "=" + value;


//        }   
//        public bool IsReusable
//        {
//            get
//            {
//                return false;
//            }
//        }
//    }
//}