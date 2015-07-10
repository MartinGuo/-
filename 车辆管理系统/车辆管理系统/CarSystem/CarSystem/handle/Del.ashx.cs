﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;


    /// <summary>
    /// del 的摘要说明
    /// </summary>
    public class Del : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string table = context.Request["table"];
            string key = context.Request["key"];
            string val = context.Request["value"];
            string sql = string.Format("delete {0} where {1}=@v", table, key);
            SqlParameter[] sps = { new SqlParameter("@v",val)};
            int? i = SqlHelper.ExecuteSql(sql, CommandType.Text, sps);
            context.Response.Write(i);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
