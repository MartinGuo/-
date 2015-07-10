
currentdata = '';
currentfileData = '';
var filepath = "";
var filedatas = [];
var isdelete = false; currentfileData = [];
var wj = [];
//设置页面呈现
function replacefileploadForm(oper, Element,data) {
    var ufsignature = '';
    if (oper == 'add' || oper == 'edit' || 'view' == oper) {
        currentdata = '';
        //ufsignature = "#_file_signature_upload_add";
        ufsignature = "#" + Element;
    }
    if (ufsignature != null && ufsignature != '') {
        var vreg = fileregion(Element);
        $(ufsignature).parent().html(vreg);
        $(ufsignature).parent().parent().removeClass("l-text").css("width", 200);
        uploadFile(Element);

        $("#" + Element + "_div_uploadedfiles").html("");
        $("#" + Element + "div_user_upload").parent().attr("class", '');
        $("#" + Element + "file_startUpload").css("display", "inline");
        $("#" + Element + "file_cancelUpload").css("display", "inline");
        $("#" + Element + "_uploadfile").css("display", "inline");
        if (oper == 'edit' || oper == 'view') {
            
            if (data != undefined && data != null && data != "") {
                var path = data.split(',');
                for (var i = 1; i < path.length; i++) {
                    currentdata = path[i];
                    var index = currentdata.toLowerCase().lastIndexOf('/');
                    var fileName = currentdata.substr(index + 1, currentdata.length - index);
                    var src_filepath = '../' + currentdata; //文件地址
                    var id_filepath = "_id_filepath_07_" + fileName.replace(".", "_"); //文件超链接ID  
                    var id_closeimg = "_id_closeimg_07_" + fileName.replace(".", "_"); //关闭按钮ID，绑定"删除"附件事件
                    uploadedUserfilesOperte(src_filepath, id_filepath, id_closeimg, fileName, 'sign', Element);
                }
                if (oper != undefined && oper == 'view') {
                    $("#" + Element +  id_closeimg).css("display", "none");
                }
                else {
                    $("#" + Element + id_closeimg).css("display", "inline");
                }
            }
            if (oper != undefined && oper == 'view') { //查看状态下不显示
                $("#" + Element + "file_startUpload").css("display", "none");
                $("#" + Element + "file_cancelUpload").css("display", "none");
                $("#" + Element + "_uploadfile").css("display", "none");
            }
        }
    }
}
///文件域重写代码
function fileregion(Element) {

    var ht = "<div id='" + Element + "div_user_upload' style='float:left;display:inline;'><div id='" + Element + "_div_uploadedfiles'></div>"
    + "<input   type=\"file\" name=\"_uploadfile\" id='" + Element + "_uploadfile' />"
    + "<a id='" + Element + "file_startUpload' href=\"javascript:$('#" + Element + "_uploadfile').uploadify('upload','*')\">开始上传</a>&nbsp;"
    + " <a  id='" + Element + "file_cancelUpload' href=\"javascript:$('#" + Element + "_uploadfile').uploadify('cancel', '*')\">取消</a></div>";
    return ht;
}
//文件上传
function uploadFile(Element) {
    try {
        $("#" + Element + "_uploadfile").uploadify({
            auto: false,
            swf: '/jquery-upload/uploadify.swf', //[*]swf的路径
            uploader: '/jquery-upload/Imgfile.ashx', //[*]一般处理程序
            cancelImg: '/jquery-upload/uploadify-cancel.png', //取消图片路径
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
                    alert("错误")
                }
                else {
                    if (data != undefined && data != '' && data != null) {
                        var path = data.split(':');
                        currentfileData.push(path[0]); //保存文件的路径，写入数据库存储使用
                        var index = path[0].toLowerCase().lastIndexOf('/');
                        var fileothername = path[0].substr(index + 1, path[0].length - index);
                        //fileothername = Math.random().toString();
                        var src_filepath = path[0]; //文件地址
                        //alert(src_filepath);
                        var id_filepath = "_id_filepath_07_" + fileothername.replace(".", "_"); //文件超链接ID  
                        var id_closeimg = "_id_closeimg_07_" + fileothername.replace(".", "_"); //关闭按钮ID，绑定"删除"附件事件
                        var fileName = path[1]; //file.name;

                        filedatas.push({
                            path: path[0],
                            src_filepath: src_filepath,
                            id_filepath: id_filepath,
                            id_closeimg: id_closeimg,
                            fileName: fileName
                        }); //保存文件详细信息：增删改备用；在上传一条记录结束后清空

                        uploadedUserfilesOperte(src_filepath, id_filepath, id_closeimg, fileothername, "sign", Element);
                        $("#" + Element + "text").val($("#" + Element + "text").val() + "," + src_filepath);
                    }
                    else {
                        alert("文件上传失败");
                    }
                }
            },
            buttonText: '浏览'
        });
    } catch (e) { }
}
//带上传文件的页面呈现
function uploadedUserfilesOperte(src_filepath, id_filepath, id_closeimg, fileName, type, Element) {

    var _uploadhtml = "<div><a target='_blank' id='" + Element + id_filepath + "' href="
                     + src_filepath + ">附件</a>&nbsp;&nbsp;"
                     + " <img style='display:none'  path='" + src_filepath + "'  id='" + Element + id_closeimg + "'"
                     + " src='/jquery-upload/uploadify-cancel.png' /></div>";

    // +"</div>";
   
    var useregion = "div_uploadedfiles";
    if (type != undefined && 'sign' == type) {
        useregion = "_div_uploadedfiles";
    }

    $("#" + Element + useregion).append(_uploadhtml); //追加到 div_uploadedfiles

    $("#" + Element + id_filepath).attr("href", "../" + src_filepath);
    $("#" + Element + id_filepath).html(fileName);
    if (type != undefined && 'sign' == type) {
        $("#" + Element + id_filepath).html(fileName);
    }
    $("#" + Element + id_closeimg).css("display", "inline");
    $("#" + Element + useregion).css("display", "inline");
    //绑定删除事件
    $("#" + Element + id_closeimg).click(function () {
        $("#" + Element + id_filepath).attr("href", "#").html("");
        $("#" + Element + id_closeimg).css("display", "none");
    })

    $("#" + Element + "pic").attr("src", src_filepath);
    $("#" + Element + "value").attr("value", src_filepath);
};