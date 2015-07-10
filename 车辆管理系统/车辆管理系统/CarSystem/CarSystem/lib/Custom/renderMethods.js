//------Render Method-Begin---
var filearray = [];
///查看工作流
function renderFile(rowdata, rowindex, currentdata, column) {
    if (currentdata != null && trimEmpty(currentdata) != '' && currentdata.toString().toUpperCase() != 'NULL') {
        filearray = currentdata.toString().split(",");
        //alert(currentdata);
        var html = "";
        for (var i = 1; i < filearray.length; i++) {
            if (filearray[i] != '' && filearray[i] != null && filearray[i] != undefined) {
//                if (filearray[i].toString().toLowerCase().lastIndexOf(".flv") > -1 || filearray[i].toString().toLowerCase().lastIndexOf(".swf") > -1) {
//                    var title = "播放视频";
//                    if (column.targetColumn != undefined && column.targetColumn != "" && column.targetColumn != null) {
//                        title += (":" + rowdata[column.targetColumn]);
//                    } //&nbsp;|&nbsp;
//                    html += "<a target='_blank'  href='videoPlayer.aspx?filepath=" + encodeURIComponent(filearray[i]) + "&filename=" + encodeURIComponent(title) + "'  title='视频文件'>在线播放</a>";
//                    if ("57" == getCookie("CuurentDeptId")) {//只有治安保卫可以下载
//                        var filetitle = "查看附件";
//                        if (filearray.length > 1) {
//                            filetitle = "附件" + (i + 1).toString();
//                        }
//                        html += '&nbsp;&nbsp;<a target="_blank" href="' + filearray[i] + '"  title=' + filearray[i] + '>' + filetitle + '</a>';
//                    }
//                }
//                else {
                    var filetitle = "查看附件";
                    if (filearray.length > 1) {
                        filetitle = "附件" + (i).toString();
                    }
                    html += '&nbsp;&nbsp;<a target="_blank" href="../' + filearray[i] + '"  title=' + filearray[i] + '>' + filetitle + '</a>';
//                }
            }
        }
        return html;
    }
    else {
        return "";
    }

}
function setValue() { setCookie('reloadtime', '0') };
function trimEmpty(strToTrim) {
    return strToTrim.replace(/^\s+|\s+$/g, "");
}
// style=\"text-decoration:none;\"
function renderTitle(rowdata, rowindex, currentdata, column) {
    var hyperLink = "";
    var lastHtml = "";

    if (column.coltrolType != undefined && (column.coltrolType == "5" ||
    (column.columnType != undefined && column.columnType == "3"))) { //说明为日期类型的数据
        currentdata = ConvertJSONDateToJSDateObject(currentdata);
    }
    else if (column.coltrolType != undefined && column.coltrolType == "6") {//工作流格式  在打开更多后显示
        if (currentdata == undefined || currentdata == 0 || currentdata.toString().toLowerCase() == "null") {
            currentdata = "未选择流程";
        }
        else {
            var wfid = currentdata.toString().split("|")[0];

            var wfName = currentdata.toString().split("|")[1];
            currentdata = "<a href='javascript:ViewWorkFlowDetail(" + wfid + ")'  title=\"查看流程\" >" + wfName + "</a>";
        }
    }
    var lastjsonCreateDate = rowdata["CreateDate"]; //创建日期
    if (0 == column.index) {//|| 1 == column.columnindex) {
        if (IsLessThan3Days(lastjsonCreateDate)) {
            lastHtml += "<img src='lib/Custom/icons/hot2.gif' style='width: 26px;height: 10px;'>";
        }
    }
    if (column.targetColumn != undefined && column.targetColumn != "" && column.targetColumn != null) {
        if (rowdata[column.targetColumn] != undefined && rowdata[column.targetColumn] != null
       && trimEmpty(rowdata[column.targetColumn]) != ''
       && rowdata[column.targetColumn].toString().toUpperCase() != 'NULL') {
            filearray = rowdata[column.targetColumn].toString().split("|");
            hyperLink = '<a  target="_blank" href="' + filearray[0] + '"  title="' + filearray[0] + '">' + currentdata + '</a>';
            if (filearray[0].toString().toLowerCase().lastIndexOf(".flv") > -1 ||
        filearray[0].toString().toLowerCase().lastIndexOf(".swf") > -1) {
                var title = "播放视频";
                if (column.targetColumn != undefined
                && trimEmpty(column.targetColumn) != ""
                && column.targetColumn != null) {
                    title += (":" + currentdata);
                }
                hyperLink = '<a target="_blank" onclick="javascript:setValue();"  href="videoPlayer.aspx?filepath=' + encodeURIComponent(filearray[0])
            + '&filename=' + encodeURIComponent(title) + '" title="视频文件">' + currentdata + '</a>';
            }
        }
    }
    //取出类别的名称
    else if (column.coltrolType != undefined && column.coltrolType == "7") {      
        if (toolbarItems == undefined || toolbarItems.length < 0) {
            return currentdata;
        }
        else {
            $.each(toolbarItems, function (i, col) {
                if (col.id == currentdata) {
                    currentdata = col.ItemName; return;
                }
            });
        }
    }
    else if (column.name == 'workflowprovedDesc') {
        if (currentdata == undefined || currentdata == null || currentdata == '') {
            currentdata = "";
        }
        else if (currentdata == '审核通过') {
            currentdata = "<span style='color:green;'>审核通过</span>"
        }
        else if (currentdata == '审核驳回') {
            currentdata = "<span style='color:red;'>审核驳回</span>"
        }
    }
    else {
        if (currentdata != undefined && currentdata != null && currentdata != '' && currentdata.toString().toLowerCase() != "null") {
            currentdata = currentdata;
        }
        else {
            currentdata = "";
        }
    }
    if (hyperLink != "") {
        currentdata = hyperLink;
    }
    return lastHtml + currentdata;
}

function onAfterChangeColumnWidth(column, newwidth) {
    $.ajax({
        url: "handler/CreateTable.ashx?" + $.param({
            opt: "UPDCOLWIDTH",
            schemaid: column.columnid,
            width: newwidth,
            rd: Math.random()
        }),
        type: "post",
        success: function (result) {
            if (parseInt(result) > 0) {
                //$.ligerDialog.success('更新成功！');
            }
            else {
                $.ligerDialog.showError('更新失败！');
            }
        }
    });
}
//------Render-Method-End---
function ConvertJSONDateToJSDateObject(jsondate) {
    if (jsondate == null || jsondate == undefined || jsondate == '') {
        return "";
    }
    var date = new Date(parseInt(jsondate.toString().replace("/Date(", "").replace(")/", ""), 10));
    return date.format("yyyy-MM-dd");
}

function IsLessThan3Days(jsondate) {
    var date = new Date(parseInt(jsondate.toString().replace("/Date(", "").replace(")/", ""), 10));
    var nowdate = new Date();
    var spanDays = (nowdate.getTime() - date.getTime()) / 3600 / 1000 / 24;
    if (spanDays < 3) {
        return true;
    } else {
        return false;
    }
};
//生成列
function gettargetColumn(targetColumnIndex) {
    for (var i = 0; i < getcolmunsFromDb.length; i++) {
        if (targetColumnIndex == getcolmunsFromDb[i].id) {
            return getcolmunsFromDb[i].columnName;
        }
    }
}
function uploadedfilesOperte(src_filepath, id_filepath, id_videofile, id_playflvimg, id_closeimg, fileName) {

    var _uploadhtml = "<div><a target='_blank' id='" + id_filepath + "' href="
                     + src_filepath + ">附件</a>&nbsp;&nbsp;"
                     + " <a target='_blank' id='" + id_videofile + "'"
                     + " href='videoPlayer.aspx?filepath=" + encodeURIComponent(src_filepath) + "&filename="
                     + encodeURIComponent("浏览视频") + "'"
                     + " style= \"diplay:none\" title='视频文件'  title='视频文件'>"
                     + " <img style='display:none'  id='" + id_playflvimg + "' alt='播放视频' src='images/playflvswf.png' /></a>&nbsp;"
                     + " <img style='display:none'  path='" + src_filepath + "'  id='" + id_closeimg + "'"
                     + " src='uploadify/uploadify-cancel.png' /></div>";
    $("#div_uploadedfiles").css("display", "inline");
    $(_uploadhtml).appendTo("#div_uploadedfiles"); //追加到 div_uploadedfiles
    if (src_filepath.toString().toLowerCase().lastIndexOf(".flv") > -1
     || src_filepath.toString().toLowerCase().lastIndexOf(".swf") > -1) {
        $("#" + id_videofile).css("display", "inline"); //.attr("href", viewfile);
        $("#" + id_playflvimg).css("display", "inline");
    }
    $("#" + id_filepath).attr("href", src_filepath); //alert(fileName);
    $("#" + id_filepath).html(fileName);
    $("#" + id_closeimg).css("display", "inline");


    //绑定删除事件  alert(_uploadhtml);
    $("#" + id_closeimg).click(function () {
        if (window.confirm("您确定删除该文件吗？删除后文件将不可能恢复!")) {    //TODO:删除实体文件；
            $("#" + id_filepath).attr("href", "#").html("");
            var currentpath = $("#" + id_closeimg).attr("path");
            //            alert(currentfileData.length);
            for (var i = 0; i < currentfileData.length; i++) {
                if (currentfileData[i] == currentpath) {
                    if (currentfileData.splice(i, 1)[0] == currentpath) {
                        $.ajax({  // deletefile 删除实体文件
                            url: "handler/formcenter.ashx?" + $.param({
                                Operate: "dtf",
                                deletefile: currentpath,
                                rd: Math.random()
                            }),
                            type: "post",
                            success: function (result) {
                                if (parseInt(result) > 0) {
                                    $.ligerDialog.success('删除成功！');
                                }
                            }
                        });
                        break;
                    }
                    else {
                        LG.showError("删除失败！");
                    }
                }
            }
            $("#" + id_closeimg).css("display", "none");
            $("#" + id_playflvimg).css("display", "none");
        }
    });
};

Date.prototype.format = function (format) {
    /* 
    * eg:format="YYYY-MM-dd hh:mm:ss"; 
    */
    var o = {
        "M+": this.getMonth() + 1,                   // month  
        "d+": this.getDate(),                        // day  
        "h+": this.getHours(),                       // hour  
        "m+": this.getMinutes(),                     // minute  
        "s+": this.getSeconds(),                     // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()                  // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}