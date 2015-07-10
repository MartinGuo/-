function setSelect( type1, type2) {
    var vh;
    if (type2 == "input") {
        vh = "<input id='val' size='40' />"
        if (type1 == "date") {
            vh = "从&nbsp;<input id='val1' class='Wdate'  onfocus='WdatePicker()' />"
            vh += "&nbsp;到&nbsp;<input id='val2' class='Wdate'  onfocus='WdatePicker()' />"
        }
    }
    else if (type2 == "select") {
        if ($("#tj").val() == "sType") {
            vh = "<select name='sType' id='selval'><option>矿建</option><option>土建</option><option>安装</option></select>"
        }
        else {
            vh = $("<select name='sType' id='selval'></select>")
            $.getJSON("../handle/DownList.ashx",
            { view: type1 },
            function (data) {
                //alert(data);
                $(data).each(function () {
                    var v1 = "<option value=" + this.value + ">" + this.name + "</option>"
                    vh.append(v1);
                })
            })
        }
    }
    return vh;
}
function exeSelect(type, selval) {
    var wh;
    var tjval = $("#tj").val();
    if (type == "num")
        wh = tjval + "=" + $("#val").val();
    else if (type == "string")
        wh = tjval + " like '%" + $("#val").val() + "%'";
    else if (type == "select" || type == "Partya" || type == "Construct")
        wh = tjval + "='" + selval + "'"
    else if (type == "date")
        wh = tjval + " between '" + $("#val1").val() + "' and '" + $("#val2").val() + "'"
    //alert(wh);
    return wh;
   
}