(function ($) {
    //全局系统对象
    window["com"] = {};
    com = com.prototype = {
        //获取QueryString的数组
        getQueryString: function () {
            var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
            if (result == null) {
                return "";
            }
            for (var i = 0; i < result.length; i++) {
                result[i] = result[i].substring(1);
            }
            return result;
        },
        //根据QueryString参数名称获取值
        getQueryStringByName: function (name) {
            var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        },
        //根据QueryString参数索引获取值
        getQueryStringByIndex: function (index) {
            if (index == null) {
                return "";
            }
            var queryStringList = getQueryString();
            if (index >= queryStringList.length) {
                return "";
            }
            var result = queryStringList[index];
            var startIndex = result.indexOf("=") + 1;
            result = result.substring(startIndex);
            return result;
        },

        toFloat: function (sFloatNum, sBs) {
            if (sFloatNum == undefined) {
                return 0;
            }
            var sNum = parseFloat(sFloatNum) * sBs;
            var arrNum = sNum.toString().split(".");
            var sReturnNum = arrNum[0];
            if (arrNum[1] && parseInt(arrNum[1]) > 0) {
                var isPlus = false;
                var dotNum = arrNum[1];
                if (parseInt(dotNum[2]) >= 5) {
                    if (parseInt(dotNum[1]) >= 9) {
                        if (parseInt(dotNum[0]) >= 9) {
                            isPlus = true;
                        } else {
                            var newNum = (parseInt(dotNum[0]) + 1).toString();
                            sReturnNum += "." + newNum;
                        }
                    } else {
                        var newNum = (parseInt(dotNum[1]) + 1).toString();
                        sReturnNum += "." + dotNum[0] + newNum;
                    }
                }

                if (isPlus) {
                    sReturnNum = parseInt(sReturnNum) + 1;
                }
            }

            return sReturnNum;
        },

        getMenuPower: function (requestUrl, menuId) {
            var result = "readonly";
            var url = requestUrl;
            if (!url) {
                url = "../handle/getPowerByUser.ashx";
            }
            var id = menuId;
            if (!id) {
                id = this.getQueryStringByName("menuid");
            }
            var data = $.ajax({
                type: "POST",
                url: url,
                data: { userid: LG.cookies.get("Loginname"), menuid: id },
                async: false
            }).responseText;
            if (data) {
                var arr = JSON2.parse(data);
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].menuname == "读写") {
                        result = "readwrite";
                        break;
                    }
                }
            }
            return result;
        }
    };
})(jQuery);
