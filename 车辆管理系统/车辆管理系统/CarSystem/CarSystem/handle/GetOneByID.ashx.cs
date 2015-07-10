using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;

namespace FInfo.handle
{
    /// <summary>
    /// GetOneDataByID 的摘要说明
    /// </summary>
    public class GetOneDataByID : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string table = context.Request["table"];
            string cols = context.Request["cols"];
            string where = context.Request["where"];
            string sql =string.Format("select {0} from " + table,cols);
            if (!string.IsNullOrEmpty(where))
            {
                sql += " where " + where;
            }
            DataTable dt = SqlHelper.GetDS(sql, CommandType.Text).Tables[0];
            string json = JsonConvert.SerializeObject(dt);
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