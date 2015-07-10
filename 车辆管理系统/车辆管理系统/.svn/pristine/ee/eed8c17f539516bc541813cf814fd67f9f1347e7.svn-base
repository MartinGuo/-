var iMaxUpdateFileSize = 1024 * 1024 * 10;
function StartUploadify() {
    $("#FileUpload1").uploadify({
        'uploader': '../../Plugin/JqueryUploadify/uploadify2.swf',
        'cancelImg': '../../Plugin/JqueryUploadify/images/cancel.png',
        'buttonText': 'Select Files',
        'buttonImg': '../../Plugin/JqueryUploadify/images/selectfiles.png',
        'width': 177,
        'height': 30,
        'script': '../../RemoteHandlers/Upload.ashx',
        'folder': 'uploads',
        'fileDesc': 'Files',
        'fileExt': '*.jpg;*.jpeg;*.gif;*.png;*.doc;*.docx;*.xls;*.xlsx;*.pdf;*.txt',
        'sizeLimit': iMaxUpdateFileSize,
        'simUploadLimit': 10,
        'multi': true,
        'auto': true,
        'onSelect': function (a, b, c) { /*选择文件上传时可以禁用某些按钮*/ },
        'onComplete': function (a, b, c, d, e) { SetLi_UpdateFiles(c); },
        'onAllComplete': function (a, b) {
            enabledSaveButton(true);

        },
        'onCancel': function (a, b, c, d, e) { },
        'onError': function (a, b, c, d, e) {
            if (c.size > iMaxUpdateFileSize) {
                setTimeout("$('#FileUpload1').uploadifyCancel('" + b + "')", 2000);
            }
        }
    });
}

function SetLi_UpdateFiles(objFile) {
    var iNextLiIndex = parseInt($("#hd_Index").val(), 10);
    var sLi = "<li id=\"file-" + iNextLiIndex.toString() + "\" class=\"file\">";
    sLi += "<span><a href=../" + objFile.filePath.substring(1) + ">" + objFile.name + "</a></span>";
    sLi += "<span class=\"file-size\"><font color=\"#666666\">" + GetFileSize(objFile.size) + "</font></span>";
    sLi += " <a href=\"javascript:DeleteFile(0,'file-" + iNextLiIndex.toString() + "','','" + objFile.filePath.substring(objFile.filePath.lastIndexOf("/") + 1) + "');\"><img src=\"/Plugin/JqueryUploadify/images/error_fuck.png\" width='12' height='12' border=\"0\" /></a></li>";
    $("#hd_Index").val(iNextLiIndex + 1);
    $(sLi).appendTo($("#demo-list"));

    if ($("#hd_UpdateFileValue").val() != "") {
        $("#hd_UpdateFileValue").val($("#hd_UpdateFileValue").val() + "#");
    }
    $("#hd_UpdateFileValue").val($("#hd_UpdateFileValue").val() + "0" + "||" + objFile.name + "||" + GetFileSize(objFile.size) + "||" + objFile.filePath + "||" + "file-" + iNextLiIndex.toString());
}

function GetFileSize(iBytes) {
    var iFileKB = iBytes / 1024;
    iFileKB = SizeFormat(iFileKB.toString());
    return iFileKB + " KB";
}

function SizeFormat(s) {
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return s.replace(/^\./, "0.")
}

function DeleteFile(b, liId, sDeleteId, sDeleteFileName) {

    //从显示列表中移除
    $("#" + liId).remove();
    //删除处理
   // DeleteUpdateFileValue(liId);
    switch (b) {
        case 0: //只删除列表

            break;
        case 1: //除了删除列表，还对隐患文本框加入值
            if ($("#hd_DeleteFileValue").val() != "") {
                $("#hd_DeleteFileValue").val($("#hd_DeleteFileValue").val() + "#");
            }
            $("#hd_DeleteFileValue").val($("#hd_DeleteFileValue").val() + sDeleteId + "|" + sDeleteFileName);
            break;
    }
}

function DeleteUpdateFileValue(sDeleteValue) {
    //取得上传列表中对应的隐藏文本框中的值
    var sUpdateValue = $("#hd_UpdateFileValue").val();

    //删除的文件名称位于元素位置
    var iFindIndex = sUpdateValue.lastIndexOf(sDeleteValue);
    //最靠近sDeleteValue变量值的'#'的元素位置
    var iStartIndex = sUpdateValue.substring(0, iFindIndex).lastIndexOf("#");
    //sDeleteValue变量中最后一个字符的元素位置
    var iEndIndex = iFindIndex + sDeleteValue.length - 1;

    if (iStartIndex == -1) {
        //位于第一组
        var sNewRightValue = $("#hd_UpdateFileValue").val().substring(iEndIndex + 2);
        $("#hd_UpdateFileValue").val(sNewRightValue);
    }
    else {
        //判断当前删除的是不是属于最后一组
        if ((iEndIndex + 1) == sUpdateValue.length) {
            //位于最后一组，删除最后一个#以后年字符
            $("#hd_UpdateFileValue").val($("#hd_UpdateFileValue").val().substring(0, iStartIndex));
        }
        else {
            //在中间
            var sNewLeftValue = $("#hd_UpdateFileValue").val().substring(0, iStartIndex);
            var sNewRightValue = $("#hd_UpdateFileValue").val().substring(iEndIndex + 1);
            $("#hd_UpdateFileValue").val(sNewLeftValue + sNewRightValue);
        }
    }
}

function enabledFileDeleteImg(b) {
    if (b) {
        $("#demo-list").find("a").css("display", "inline");
    }
    else {
        $("#demo-list").find("a").attr("style", "display:none");
    }
}

function yhLoad() {

    $("#demo-list").html($get("hd_FileList").value);
}