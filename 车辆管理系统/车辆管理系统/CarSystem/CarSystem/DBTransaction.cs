using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;



public  class DBTransaction
{
        
        /// <summary>  
        /// 获取数据库连接  
        /// </summary>  
        /// <returns></returns>  
        public static SqlConnection GetConnection()
        {
            return SqlHelper.GetCon();
        }

        /// <summary>  
        /// 获取事务  
        /// </summary>  
        /// <returns></returns>  
        public static SqlTransaction GetTransaction(SqlConnection conn)
        {
            return conn.BeginTransaction();
        }

        /// <summary>  
        /// 提交事务  
        /// </summary>  
        public static void Commit(SqlTransaction sqlTransaction)
        {
            sqlTransaction.Commit();
        }

        /// <summary>  
        /// 回滚事务  
        /// </summary>  
        public static void Rollback(SqlTransaction sqlTransaction)
        {
            sqlTransaction.Rollback();
        }

        /// <summary>  
        /// 关闭连接  
        /// </summary>  
        public static void Close(SqlConnection conn)
        {

            if (conn.State == ConnectionState.Open)
          {
             conn.Close();
          }

     }  
}
