using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CarSystem.OrderCarManage
{
    public partial class CRMList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Calendar1_SelectionChanged(object sender, EventArgs e)
        {
            ClientScript.RegisterStartupScript(typeof(int), "k2", "window.open ('OCM1.aspx','newwindow','height=500,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no, location=no,status=no')",true);
        }
    }
}