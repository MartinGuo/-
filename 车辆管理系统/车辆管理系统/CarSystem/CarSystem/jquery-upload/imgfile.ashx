<%@ WebHandler Language="C#" Class="imgfile" %>

using System;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Text;
using System.IO;
using System.Collections.Generic;

public class imgfile : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        UploadFile(context);
        context.Response.End();
    }
    private static void UploadFile(HttpContext context)
    {
     
        
        //获取上传文件
        HttpPostedFile fileUpload = context.Request.Files["Filedata"];
        if (fileUpload != null)
        {
            try
            {
                //保存的文件夹
                string uploadDir = "/upload/"; //"~/uploadify/UploadFile/";

                //保存的文件夹路径
                string path = context.Server.MapPath(uploadDir);

                ////每月上传的一个新文件夹
                //string folder = DateTime.Now.ToString("yyyyMM");

                ////如果文件夹不存在，则创建
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                //上传文件的扩展名
                string fileExtension = Path.GetExtension(fileUpload.FileName);
                //if (fileExtension.ToLower() != ".png" && fileExtension.ToLower() != ".gif" && fileExtension.ToLower() != ".jpg")
                //{
                //    context.Response.Write("错误提示：上传的文件格式必须是png、gif或jpg格式");
                //    return;
                //}
                //判断文件大小
                //if (fileUpload.ContentLength > 1024 * 1024)//1G
                //{
                //    context.Response.Write("错误提示：上传的文件(" + fileUpload.FileName + ")超过最大限制1M");
                //    return;
                //}
                //使用时间+随机数重命名文件
                string strDateTime = DateTime.Now.ToString("yyMMddhhmmssfff");
                Random ran = new Random();
                string strRan = Convert.ToString(ran.Next(100, 999));
                //生成新的文件名
                string saveName = strDateTime + strRan + fileExtension;

                //保存
                fileUpload.SaveAs(path + "/" + saveName);
                string newfileName = uploadDir + saveName;
                context.Response.Write("" + newfileName.Substring(1));

            }
            catch (Exception e)
            {
                context.Response.Write("错误提示：上传失败");
            }
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
