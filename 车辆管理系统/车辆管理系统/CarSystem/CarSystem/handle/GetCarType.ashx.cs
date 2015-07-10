using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;

namespace CarSystem.handle
{
    /// <summary>
    /// GetCarType1 的摘要说明
    /// </summary>
    public class GetCarType1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string table = context.Request["table"];
            string cols = context.Request["cols"];
            string where = context.Request["where"];
            string sql = string.Format("select {0} from {1} where {2}", cols, table, where);
            SqlDataReader sdr = SqlHelper.GetReader(sql, CommandType.Text);
            List<MyData> list = new List<MyData>();
            if (sdr.Read())
            {
                for (int i = 0; i < sdr.FieldCount; i++) 
                {
                    string colValue = sdr[i].ToString();
                    string ss = sdr.GetDataTypeName(i);
                    if (ss == "date")
                    {
                        if (!string.IsNullOrEmpty(colValue))
                        {
                            DateTime svdr = sdr.GetDateTime(i);
                            if (svdr != null)
                                colValue = svdr.ToString("yyyy-MM-dd");
                            list.Add(new MyData { Name = sdr.GetName(i), Value = colValue });
                        }
                    }
                    else
                    {
                        colValue = sdr[i].ToString();
                        list.Add(new MyData { Name = sdr.GetName(i), Value = colValue });
                    }
                }
            }
            sdr.Close();
            string json = JsonConvert.SerializeObject(list);
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