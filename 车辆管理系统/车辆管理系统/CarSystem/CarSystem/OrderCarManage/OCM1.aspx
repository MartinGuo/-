<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OCM1.aspx.cs" Inherits="CarSystem.OrderCarManage.OCM1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../lib/jquery/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {

            //日期是 默认时间
            var myDate = new Date();
            var date = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
            $("#applydate").val(date);

        })
    </script>

<style type="text/css">
table.hovertable {
	font-family: verdana,arial,sans-serif;
	font-size:13px;
	color:#333333;
	border-width: 1px;
	border-color: #999999;
	border-collapse: collapse;
}
table.hovertable th {
	background-color:#c3dde0;
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #a9c6c9;
}
table.hovertable tr {
	background-color:#d4e3e5;
}
table.hovertable td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #a9c6c9;
}
</style>


</head>
<body>
    <form id="form1" runat="server">
    <table   class="hovertable" style="height: 300px; width: 800px ; text-align:left; border:1px solid">
    <caption>用车预约填报表</caption>
       <tr>
         <td style="width:100px">申请人：</td>
         <td  Width="220px">
             <asp:TextBox ID="applyname" runat="server" Width="207px"></asp:TextBox></td>
         <td style="width:130px">申请时间：</td>
         <td>
             <asp:TextBox ID="applydate" runat="server" Width="203px" ReadOnly="true" 
                ></asp:TextBox></td>
       </tr>
       <tr>
         <td>出差申请:</td>
         <td> <asp:TextBox ID="apply" runat="server" ></asp:TextBox> <asp:Button ID="bt_searchNum" runat="server" Text="选择" 
                 onclick="bt_searchNum_Click" />
             
             
           </td>
         <td>出差人员:</td>
         <td>
             <asp:TextBox ID="businesspeople" runat="server" Width="203px"></asp:TextBox></td>
       </tr>
       <tr>
         <td>出差开始日期:</td>
         <td>
             <asp:TextBox ID="begin" runat="server" Width="203px"></asp:TextBox></td>
         <td>出差结束日期:</td>
         <td>
             <asp:TextBox ID="end" runat="server" Width="203px"></asp:TextBox></td>
       </tr>
       <tr>
         <td> 车牌号：</td>
         <td>
             <asp:TextBox ID="CarNum" runat="server"></asp:TextBox>
             <asp:Button ID="bt_carnum" runat="server" Text="选择" onclick="bt_carnum_Click" 
                 Width="40px" />
         </td>
         <td>司机：</td>
         <td>
             <asp:TextBox ID="DriName" runat="server" ></asp:TextBox>
             <asp:Button ID="bt_man" runat="server" Text="选择" onclick="bt_man_Click" />
         </td>
       </tr>
       <tr>
         <td></td>
         <td>
             <asp:Button ID="bt_save" runat="server" Text="保存" Height="29px" 
                 onclick="bt_save_Click" Width="108px" /></td>
         <td>
             <asp:Button ID="bt_cancel" runat="server" Text="取消" Height="27px" 
                 onclick="bt_cancel_Click" Width="97px" /></td>
         <td></td>
       </tr>
    </table>
    </form>
</body>
</html>
