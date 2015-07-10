function setSession(name, value) {
    $.post("../../handle/getSession.ashx", { SessComm: "set", SessName: name, SessValue: value })
}
function getSession(name) {
    $.post("../../handle/getSession.ashx", { SessComm: "get", SessName: name })
}
function delSession(name) {
    $.post("../../handle/getSession.ashx", { SessComm: "del", SessName: name})
}
