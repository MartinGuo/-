using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Configuration;

public class SqlHelper
{
    static string connStr = ConfigurationManager.AppSettings["connStr"].ToString();
   
   
    /// <summary>
    /// 获取数据库连接 返回SqlConnection
    /// </summary>
    /// <returns></returns>
    public static SqlConnection GetCon()
    {
        return new SqlConnection(connStr);
    }
    /// <summary>
    /// 执行查询语句，返回第一行第一列的值
    /// </summary>
    /// <param name="sql"></param>
    /// <param name="sps"></param>
    /// <returns></returns>
    public static object GetOneData(string sql,CommandType type, params SqlParameter[] sps)
    {
        SqlConnection conn = new SqlConnection(connStr);
        conn.Open();
        try
        {
            SqlCommand comm = new SqlCommand(sql, conn);
            //指定要执行的sql语句的类型。Text：sql语句,StoredProcedure：存储过程
            comm.CommandType = type; 

            if (sps != null)
                comm.Parameters.AddRange(sps);
            object ob = comm.ExecuteScalar();
            return ob;
        }
        catch (Exception ex)
        {
            //System.Windows.Forms.MessageBox.Show("数据库操作失败，错误信息为：" + ex.Message);
            return null;
        }
        finally
        {
            conn.Close();
        }
    }
    /// <summary>
    /// 执行查询语句，返回结果集
    /// </summary>
    /// <param name="sql"></param>
    /// <param name="sps"></param>
    /// <returns></returns>
    public static SqlDataReader GetReader(string sql, CommandType type, params SqlParameter[] sps)
    {
        SqlConnection conn = new SqlConnection(connStr);
        conn.Open();
        try
        {
            SqlCommand comm = new SqlCommand(sql, conn);
            comm.CommandType = type;
            if (sps != null)
                comm.Parameters.AddRange(sps);
            SqlDataReader sdr = comm.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
            return sdr;
           // CommandType.StoredProcedure
        }
        catch (Exception ex)
        {
            //System.Windows.Forms.MessageBox.Show("数据库操作失败，错误信息为：" + ex.Message);
            return null;

        }
        
    }
    /// <summary>
    /// 执行增加、删除、修改或DDL语句
    /// </summary>
    /// <param name="sql"></param>
    /// <param name="sps"></param>
    /// <returns></returns>
    public static int? ExecuteSql(string sql, CommandType type, params SqlParameter[] sps)
    {
        SqlConnection conn = new SqlConnection(connStr);
        conn.Open();
        try
        {
            SqlCommand comm = new SqlCommand(sql, conn);
            comm.CommandType = type;
            if (sps != null)
                comm.Parameters.AddRange(sps);
            int? ob = comm.ExecuteNonQuery();
            return ob;
        }
        catch (Exception ex)
        {
            //System.Windows.Forms.MessageBox.Show("数据库操作失败，错误信息为：" + ex.Message);
            return null;
        }
        finally
        {
            conn.Close();
        }
    }
    /// <summary>
    /// 执行查询语句，返回DataSet的数据集
    /// </summary>
    /// <param name="sql"></param>
    /// <param name="type"></param>
    /// <param name="sps"></param>
    /// <returns></returns>
    public static DataSet GetDS(string sql, CommandType type, params SqlParameter[] sps)
    {
        SqlConnection conn = new SqlConnection(connStr);//创建连接对象
        conn.Open(); //打开数据连接
        try
        {
            SqlCommand comm = new SqlCommand(sql, conn); //创建命令对象
            comm.CommandType = type;  //指定命令类型为传递的参数（sql语句或存储过程）
            if (sps != null)          //如果参数数组不为空
                comm.Parameters.AddRange(sps); //将参数数组增加到命令对象中
            SqlDataAdapter sda = new SqlDataAdapter(comm); //创建SqlDataAdapter对象
            DataSet ds = new DataSet();  //创建DataSet对象
            sda.Fill(ds); //将数据填充到DataSet对象中
            return ds;
        }
        catch (Exception ex)
        {
            //System.Windows.Forms.MessageBox.Show("数据库操作失败，错误信息为：" + ex.Message);
            return null;
        }
        finally
        {
            conn.Close();//关闭数据连接
        }

    }


}

