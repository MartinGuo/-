//$(replacefileploadForm); //首先执行该方法
//-------个性签名begin---------------------
currentdata = '';
currentfileData = '';
//filedatas = [];
var filepath = "";
var filedatas = [];
var isdelete = false; currentfileData = [];
var wj = [];
function replacefileploadForm(oper, issubuser, data) {
    var ufsignature = '';
    if (oper == 'add' || oper == 'edit' || 'view' == oper) {
        currentdata = '';
        ufsignature = "#_file_signature_upload_add";
    }

//    if (issubuser != undefined && issubuser == true) {
//        if (oper == 'add' || oper == 'edit' || oper == 'view') {
//            ufsignature = "#_file_signature_upload_subuser_add";
//        }
//    }
    //alert(ufsignature);
    if (ufsignature != null && ufsignature != '') {
        $(ufsignature).parent().html(fileregion());
        $(ufsignature).parent().parent().removeClass("l-text").css("width", 200);
        uploadFile();

        $("#_div_uploadedfiles").html("");
        $("#div_user_upload").parent().attr("class", '');
        $("#file_startUpload").css("display", "inline");
        $("#file_cancelUpload").css("display", "inline");
        $("#_uploadfile").css("display", "inline");
        if (oper == 'edit' || oper == 'view') {
            //alert(data);
            if (data != undefined && data != null && data != "") {
                var path = data.split(',');
                for (var i = 1; i < path.length; i++) {
                    //wj.push(path[i]);
                    currentdata = path[i];
                    var index = currentdata.toLowerCase().lastIndexOf('/');
                    var fileName = currentdata.substr(index + 1, currentdata.length - index);

                    var src_filepath = '../' + currentdata; //文件地址
                    
                    var id_filepath = "_id_filepath_07_" + fileName.replace(".", "_"); //文件超链接ID  
                    var id_closeimg = "_id_closeimg_07_" + fileName.replace(".", "_"); //关闭按钮ID，绑定"删除"附件事件
                    //                filedatas.push({
                    //                    path: src_filepath,
                    //                    src_filepath: src_filepath,
                    //                    id_filepath: id_filepath,
                    //                    id_closeimg: id_closeimg,
                    //                    fileName: fileName
                    //                });
                    
                    uploadedUserfilesOperte(src_filepath, id_filepath, id_closeimg, fileName, 'sign');
                }
                if (oper != undefined && oper == 'view') {
                    $("#" + id_closeimg).css("display", "none");
                }
                else {
                    $("#" + id_closeimg).css("display", "inline");
                }
            }
            if (oper != undefined && oper == 'view') { //查看状态下不显示
                $("#file_startUpload").css("display", "none");
                $("#file_cancelUpload").css("display", "none");
                $("#_uploadfile").css("display", "none");
            }
        }
    }
}
///文件域重写代码
function fileregion() {
    return "<div id='div_user_upload' style='float:left;display:inline;'><div id=\"_div_uploadedfiles\"></div>"
    + "<input   type=\"file\" name=\"_uploadfile\" id=\"_uploadfile\" />"
    + "<a id='file_startUpload' href=\"javascript:$('#_uploadfile').uploadify('upload','*')\">开始上传</a>&nbsp;"
    + " <a  id='file_cancelUpload' href=\"javascript:$('#_uploadfile').uploadify('cancel', '*')\">取消</a></div>";
}
function uploadFile() {
    try {
        $("#_uploadfile").uploadify({
            auto: false,
            swf: '../uploadify/uploadify.swf', //[*]swf的路径
            uploader: '../handle/Imgfile.ashx', //[*]一般处理程序
            cancelImg: '../uploadify/uploadify-cancel.png', //取消图片路径
            multi: true,
            fileTypeDesc: '附件',
            width: 50,
            height: 15,
            rollover: true,
            hideButton: true,
            'fileSizeLimit': '100000KB',
            'removeTimeout': 1,
            'preventCaching': false,
            'successTimeout': 1800,
            formData: { 'Operate': 'upload' },
            onUploadSuccess: function (file, data, response) {//上传完成时触发（每个文件触发一次）

                if (data.indexOf('错误提示') > -1) {
                    LG.showError(data);
                }
                else {
                    if (data != undefined && data != '' && data != null) {
                        var path = data.split(':');
                        //alert(path[0]);
                        currentfileData.push(path[0]); //保存文件的路径，写入数据库存储使用
                        var index = path[0].toLowerCase().lastIndexOf('/');
                        var fileothername = path[0].substr(index + 1, path[0].length - index);
                        //fileothername = Math.random().toString();
                        var src_filepath = path[0]; //文件地址
                        //alert(src_filepath);
                        var id_filepath = "_id_filepath_07_" + fileothername.replace(".", "_"); //文件超链接ID  
                        //                        var id_videofile = "_id_videofile_07_" + fileothername.replace(".", "_"); //视频文件超链接ID,控制是否显示
                        //                        var id_playflvimg = "_id_playflvimg_07_" + fileothername.replace(".", "_"); //播放视频文件的ID,控制是否显示
                        var id_closeimg = "_id_closeimg_07_" + fileothername.replace(".", "_"); //关闭按钮ID，绑定"删除"附件事件
                        var fileName = path[1]; //file.name;

                        filedatas.push({
                            path: path[0],
                            src_filepath: src_filepath,
                            id_filepath: id_filepath,
                            id_closeimg: id_closeimg,
                            fileName: fileName
                        }); //保存文件详细信息：增删改备用；在上传一条记录结束后清空

                        uploadedUserfilesOperte(src_filepath, id_filepath, id_closeimg, fileothername, "sign");
                        $("#sAttach").val($("#sAttach").val() + "," + src_filepath);
                        //alert($("#sAttach").val())
                        //LG.showSuccess("上传成功！");
                    }
                    else {
                        LG.showError("文件上传失败");
                    }
                }
            },
            buttonText: '浏览'
        });
    } catch (e) { }
}
//-------个性签名end---------------------

function uploadedUserfilesOperte(src_filepath, id_filepath, id_closeimg, fileName, type) {
    var _uploadhtml = "<div><a target='_blank' id='" + id_filepath + "' href="
                     + src_filepath + ">附件</a>&nbsp;&nbsp;"
                     + " <img style='display:none'  path='" + src_filepath + "'  id='" + id_closeimg + "'"
                     + " src='../uploadify/uploadify-cancel.png' /></div>";

                    // +"</div>";
    
    var useregion = "div_uploadedfiles";
    if (type != undefined && 'sign' == type) {
        useregion = "_div_uploadedfiles";
    }

    $("#" + useregion).append(_uploadhtml); //追加到 div_uploadedfiles
    //alert(_uploadhtml);
    $("#" + id_filepath).attr("href", "../"+src_filepath);
    $("#" + id_filepath).html(fileName);
    if (type != undefined && 'sign' == type) {
        //$("#" + id_filepath).html("浏览个性签名");
        $("#" + id_filepath).html(fileName);
       
        //$("#" + id_filepath).html("<img  width=\"78px\" height=\"28px\"  src=\"" + src_filepath + "\" />");
    }
    $("#" + id_closeimg).css("display", "inline");
    $("#" + useregion).css("display", "inline");
    //绑定删除事件  alert(_uploadhtml);
    $("#" + id_closeimg).click(function () {
        if (window.confirm("您确定删除该文件吗？删除后文件将不可能恢复!")) {    //TODO:删除实体文件；
            $("#" + id_filepath).attr("href", "#").html("");
            var currentpath = $("#" + id_closeimg).attr("path");
            if (type == 'sign') {
                $.ajax({  // deletefile 删除实体文件
                    url: "../handler/formcenter.ashx?" + $.param({
                        Operate: "delSign",
                        deletefile: currentpath,
                        rd: Math.random()
                    }),
                    type: "post",
                    success: function (result) {
                        if (parseInt(result) > 0) {
                            $.ligerDialog.success('删除成功！');
                            currentdata = ''; //alert(currentdata);
                        }
                    }
                });
            }
            for (var i = 0; i < currentfileData.length; i++) {
                if (currentfileData[i] == currentpath) {
                    if (currentfileData.splice(i, 1)[0] == currentpath) {
                        $.ajax({  // deletefile 删除实体文件
                            url: "../handler/formcenter.ashx?" + $.param({
                                Operate: "delSign",
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
//            $("#" + id_playflvimg).css("display", "none");
        }
    });
};