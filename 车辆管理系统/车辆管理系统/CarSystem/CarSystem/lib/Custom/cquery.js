function createq(vv) {

    $.getJSON("../handle/query.ashx",
            { view: view },
            function (data) {
                $(data).each(function () {
                    var v1 = "<option value=" + this.col + ">" + this.display + "</option>"
                })
            })
}

function qc(vv) {
    $.getJSON("../handle/DownList.ashx",
                        { view: vv },
                        function (data) {
                            //alert(data);
                            $(data).each(function () {
                                var v1 = "<option value=" + this.value + ">" + this.name + "</option>"
                                vh.append(v1);
                            })
                        })
}