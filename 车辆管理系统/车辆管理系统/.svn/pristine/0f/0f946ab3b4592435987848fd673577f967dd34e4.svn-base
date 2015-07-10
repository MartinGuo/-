//获取URL传的值
function QueryString(url, queryStringName) {
    var result = url.match(new RegExp("[\?\&]" + queryStringName + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
};