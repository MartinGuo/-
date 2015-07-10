window.print = printFrame;
function printFrame(frame, onfinish) {
    if (!frame) frame = window;
    function execOnFinish() {
        switch (typeof (onfinish)) {
            case "string": execScript(onfinish); break;
            case "function": onfinish();
        }
        if (focused && !focused.disabled) focused.focus();
    }
    if ((frame.document.readyState !== "complete") && (!frame.document.confirm("The document to print is not downloaded yet! Continue with printing?"))) {
        execOnFinish();
        return;
    }

    var eventScope = printGetEventScope(frame);
    var focused = document.activeElement;
    window.printHelper = function () {
        execScript("printWB.ExecWB 6, 1", "VBScript");
        printFireEvent(frame, eventScope, "onafterprint");
        printWB.outerHTML = "";
        execOnFinish();
        window.printHelper = null;
    }
    document.body.insertAdjacentHTML("beforeEnd",
"<object id=\"printWB\" width=0 height=0 \ classid=\"clsid:8856F961-340A-11D0-A96B-00C04FD705A2\"></object>");
    printFireEvent(frame, eventScope, "onbeforeprint");
    frame.focus();
    window.printHelper = printHelper;
    setTimeout("window.printHelper()", 0);
}


function printFireEvent(frame, obj, name) {
    var handler = obj[name];
    switch (typeof (handler)) {
        case "string": frame.execScript(handler); break;
        case "function": handler();
    }
}
function printGetEventScope(frame) {
    var frameset = frame.document.all.tags("FRAMESET");
    if (frameset.length) return frameset[0];
    return frame.document.body;
}