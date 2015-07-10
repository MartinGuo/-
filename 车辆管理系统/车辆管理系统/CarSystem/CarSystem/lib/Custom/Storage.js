function SetSession(isadmin, userId) {
    setCookie("IsAdmin", isadmin);
    setCookie("user", userId);
}
function RemoveSession() {
    deleteCookie("IsAdmin");
    deleteCookie("user");
}
//获取存储的值；
function getSession() {
    var isadmin = getCookie("IsAdmin");
    return isadmin;
}
function getUserIdSession() {
    var userId = getCookie("user");
    return userId;
}
//-------Begin-------------
//添加cookie
function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}
//存入cookie
function setLoginUserCookie(name, value) {
    var argv = setLoginUserCookie.arguments;
    var argc = setLoginUserCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : 3650;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}
//使用Cookie
function getCookie(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
        else return ""
    }

}

function deleteCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
    setCookie(name, "", expdate);
}
//------End------------