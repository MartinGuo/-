using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;

public class GetOneDataById : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string table = context.Request["table"];
        string key = context.Request["key"];
        string value = context.Request["value"];
        string sql = string.Format("select * from {0} where {1}=@v", table, key);
        SqlParameter[] sps = { new SqlParameter("@v", value) };
        SqlDataReader sdr = SqlHelper.GetReader(sql, CommandType.Text, sps);
        List<MyData> list = new List<MyData>();
        if (sdr.Read())
        {
            for (int i = 0; i < sdr.FieldCount; i++) //遍历SqlDataReader中的列
            {
                //string colName = sdr.GetName(i); //根据列序号得到列名
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
                    //object colValue = null;
                    colValue = sdr[i].ToString();
                    //colName = sdr.GetName(i);
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
