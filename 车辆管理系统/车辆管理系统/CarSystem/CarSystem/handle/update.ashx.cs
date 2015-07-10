using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;


    public class update : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string table = context.Request["table"]; //表名
            string key = context.Request["key"];     //主键名
            string value = context.Request["value"]; //主键值
            string json = context.Request["data"];   //要更新的json格式数据
            string flag = context.Request["flag"];
            string DriId = context.Request["value1"];
            MyData[] my = JsonConvert.DeserializeObject<MyData[]>(json);
            string sql = "update " + table + " set ";
            string setcol = ""; //更新的列
            SqlParameter[] sps = new SqlParameter[my.Length];
            int row = 0;
            string CarNum = "";
            int ActMeter=0;
            foreach (MyData d in my)
            {
                setcol += d.Name + "=@" + d.Name + ",";
                sps[row] = new SqlParameter("@" + d.Name, d.Value);
                if (d.Name == "CarNum")
                {
                    CarNum = d.Value.ToString();
                }
                if(d.Name=="ActMeter")
                {
                    ActMeter =Convert.ToInt32(d.Value);
                }
                row++;
            }
            setcol = setcol.Remove(setcol.LastIndexOf(",")); //列名
            sql += setcol + " where " + key + "='" + value + "'";

            int? i = SqlHelper.ExecuteSql(sql, CommandType.Text, sps);
            if (flag == "return")
            {
                //创建数据库连接
                SqlConnection conn =  DBTransaction.GetConnection();
                //开启事物
                SqlTransaction trans = DBTransaction.GetTransaction(conn);
                try
                {
                    SqlHelper.ExecuteSql("update CarInfo set CarNowState ='已返回'  where CarNum = '" + CarNum + "'", CommandType.Text);
                    SqlHelper.ExecuteSql("update DriveInfo set DriverNowState ='在场', set SumNum = SumNum + 1 , SumMeter = SumMeter + " + ActMeter + " where DriId = '" + DriId + "'", CommandType.Text);
                    DBTransaction.Commit(trans);
                }
                catch (Exception)
                {
                    //事物回滚
                    DBTransaction.Rollback(trans);
                }
                finally
                {
                    //关闭连接
                    DBTransaction.Close(conn); 
                }
                
            }  
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
