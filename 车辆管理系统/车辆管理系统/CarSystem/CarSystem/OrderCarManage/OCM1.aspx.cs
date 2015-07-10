using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Remoting.Contexts;

namespace CarSystem.OrderCarManage
{
    public partial class OCM1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {


            if (!IsPostBack)
            {
                setSession();
               
                if (Session["OJNum"] != null && Session["StartTime"] != null && Session["EndTime"] != null && Session["OPeople"] != null)
                {
                    string myid = Session["OJNum"].ToString();
                    string beginTime = Session["StartTime"].ToString();
                    string endTime = Session["EndTime"].ToString();
                    string OPeople = Session["OPeople"].ToString();
                    apply.Text = myid;
                    begin.Text = beginTime;
                    end.Text = endTime;
                    businesspeople.Text = OPeople;

                }

                if (Session["DriName"] != null)
                {
                    string driName = Session["DriName"].ToString();
                    DriName.Text = driName;

                }

                if (Session["CarNum"] != null)
                {
                    string carNum = Session["CarNum"].ToString();
                    CarNum.Text = carNum;

                }

            }

        }
        public void setSession()
        {
            if (Context.Request["OJNum"] != null)
	        {
                Context.Session["OJNum"] = Context.Request["OJNum"];
		 
	        }
            if (Context.Request["StartTime"] != null)
            {
                Context.Session["StartTime"] = Context.Request["StartTime"];

            }
            if (Context.Request["EndTime"] != null)
            {
                Context.Session["EndTime"] = Context.Request["EndTime"];

            }
            if (Context.Request["OPeople"] != null)
            {
                Context.Session["OPeople"] = Context.Request["OPeople"];

            }
            if (Context.Request["CarNum"] != null)
            {
                Context.Session["CarNum"] = Context.Request["CarNum"];

            }
            if (Context.Request["DriName"] != null)
            {
                Context.Session["DriName"] = Context.Request["DriName"];

            }

        }

    
        //选择申请单号按钮
        protected void bt_searchNum_Click(object sender, EventArgs e)
        {
            // ClientScript.RegisterStartupScript(typeof(int), "k2", "<script>var returnValue = window.showModalDialog('Evection.aspx','newwindow','scrollbars=yes')</script>");
            // Response.Write("<script>window.showModalDialog('Evection.aspx');</script>"); 

            Response.Redirect("OrderList.htm");
        }

        //选择车牌号按钮
        protected void bt_carnum_Click(object sender, EventArgs e)
        {

            Response.Redirect("SearchCar.htm");
        }

        //选择司机按钮
        protected void bt_man_Click(object sender, EventArgs e)
        {
            
            Response.Redirect("SearchDirver.htm");
        }

        //保存按钮
        protected void bt_save_Click(object sender, EventArgs e)
        {

            string sql = @"insert into OrderCarInfo values(@OCName,@OCdefTime,@OJNum,@OLpeople,@StartTime,@EndTime,@CarNum,@DriName)";
            SqlParameter[] sps ={new SqlParameter("@OCName",applyname.Text),
                              new SqlParameter("@OCdefTime",applydate.Text),
                              new SqlParameter("@OJNum",apply.Text),
                              new SqlParameter("@OLpeople",businesspeople.Text),
                              new SqlParameter("@StartTime",begin.Text),
                              new SqlParameter("@EndTime",end.Text),
                              new SqlParameter("@CarNum",CarNum.Text),
                              new SqlParameter("@DriName",DriName.Text),
                              };
            int? i = SqlHelper.ExecuteSql(sql, CommandType.Text, sps);
            if (i > 0)
            {
                string updateCarSql = "update CarInfo set CarNowState = '未返回' where  CarNum  = '" + CarNum.Text + "'";
                string updateDriSql = "update DriveInfo set DriverNowState = '已预约' where DriName = '" + DriName.Text + "'";
                string updateOutApplyInfo = "update OutApplyInfo   set CarNum = '" + CarNum.Text + "' , DriName = '" + DriName.Text + "' where OJNum = '" + apply.Text + "' and TrafficTool = '自备车'";
                string updateReturnCar = " insert into ReturnCarInfo (OJNum,CarNum) values('" +apply.Text+"','"+CarNum.Text+"')";
                int? j = SqlHelper.ExecuteSql(updateCarSql, CommandType.Text);
                int? k = SqlHelper.ExecuteSql(updateDriSql, CommandType.Text);
                int? m = SqlHelper.ExecuteSql(updateOutApplyInfo, CommandType.Text);
                int? n = SqlHelper.ExecuteSql(updateReturnCar, CommandType.Text);
                if (j > 0 && k > 0 && m > 0 )
                {
                    ClientScript.RegisterStartupScript(typeof(int), "k2", "<script>alert('您的申请已经成功！');parent.gridManage.loadData(); parent.openAddWindow.close();</script>");
                    Session.RemoveAll();
                }
                else
                {
                    if (j == null || j == 0)
                    {
                        ClientScript.RegisterStartupScript(typeof(int), "k2", "<script>alert('您的车辆申请未能成功，请再查看！')</script>");

                    }
                    if (k == null || k == 0)
                    {
                        ClientScript.RegisterStartupScript(typeof(int), "k2", "<script>alert('您的司机申请未能成功，请在查看！')</script>");

                    }
                    

                }


            }

        }
        //取消按钮
        protected void bt_cancel_Click(object sender, EventArgs e)
        {
            ClientScript.RegisterStartupScript(typeof(int), "k2", "<script>parent.gridManage.loadData(); parent.openAddWindow.close();</script>");
        }




    }
}