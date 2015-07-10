using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;//
using System.Data.SqlClient;
using Newtonsoft.Json;//
using System.Web.Security;

public class Add : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string table = context.Request["table"];
            string json = context.Request["data"];
          
            MyData[] my = JsonConvert.DeserializeObject<MyData[]>(json);
            string sql = "insert " + table + "(";
            string col = ""; //列名
            string val = ""; //列值
            SqlParameter[] sps = new SqlParameter[my.Length];
            int row = 0;
            string CarNum = "";
            foreach (MyData d in my)
            {
                col += d.Name+",";
                val += "@" + d.Name + ",";
                sps[row] = new SqlParameter("@" + d.Name, d.Value);
                if(d.Name=="CarNum"){
                    CarNum = d.Value.ToString();
                }
                row++;
            }
            col = col.Remove(col.LastIndexOf(",")); //列名
            val = val.Remove(val.LastIndexOf(",")); //列值（带参数)

            sql += col + ") values(" + val + ")";
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
