
var chat = (function () {
    var port=3000;
    var init=function () {
        var looper1 = new heartbit(serverUrl, {requestType: "getmsg"}, success, null, port);
        looper1.error = function () {
            return true;
        }
        looper1.start();
        getAllMsg();
        $("#edit-box").html("");
        document.getElementById("edit-box").focus();
    }
    var success = function (evt) {
        if (evt.issuccess) {
            for (var i = 0; i < evt.data.length ; i++) {
                showMsg(evt.data[i]);
            }
        }
    };

    //接收消息之后吧消息放在指定的窗口
    function showMsg(data,issuccess) {
        var div = document.getElementById("chat-logs");
        var msg = data;
        var dl = createMsgHtml(msg, issuccess);
        div.innerHTML += dl;
        div.scrollTop = div.scrollHeight;
    }
    //发送消息
    function sendMsg() {
        var text = $("#edit-box").html().replace(/<[^>]+>/g, " ");//.replace(/(^s*)|(s*$)/g, "").replace(/ /g, "")
        //text = getEditMsg();
        if (text.replace(/(^s*)|(s*$)/g, "").length == 0) {
            return;
        }
        var data = {
            requestType: "sendMsg",
            data: text,
        };
        $.ajax({
            url: serverUrl,
            data:data,
            type: "post",
            dataType: "json",
            success: function (datas) {
                showMsg(datas.data,datas.issuccess);
                $("#edit-box").html("");
            },
            finish: function (datas) {
                $("#edit-box").html("");
            }
        });
        document.getElementById("edit-box").focus();
    }

    //获取聊天记录
    function getAllMsg() {
        var data = {
            requestType: "getAllMsg"
        };
        $.ajax({
            url: serverUrl,
            data: data,
            type: "post",
            dataType: "json",
            success: function (datas) {
                var div = document.getElementById("chat-history");
                div.innerHTML = "";
                var msg = datas.data;
                for (var i = 0; i < msg.length; i++) {
                    var dl = createMsgHtml(msg[i]);
                    div.innerHTML += dl;
                    div.scrollTop = div.scrollHeight;
                }
            },
            finish: function (datas) {
                //document.getElementById("chat-history").innerHTML += '<div class="info-tips"><div id="info-icon"></div>获取聊天记录失败，请重试。</div>';
            }
        });
    }
    //生成对话内容html
    function createMsgHtml(msg,issuccess) {
        var stye = "";
        var cName = "你"
        if (msg.isme == 1) {//收到用户的信息
            stye = "my-msg";
            cName = clientName;
        }
        if (issuccess == "false") {
            msg.content = "<div class=\"info-tips\"><div id=\"info-icon\"></div>消息推送失败,用户可能已经下线</div>" + msg.content;
        }
        msg.messagedate = MAGER.FormatDate(msg.messagedate, "yyyy-MM-dd hh:mm:ss");
        var dl = "<dl class='" + stye + "'>  <dt>" + cName + "  " + msg.messagedate + "</dt>  <dd>" + msg.content + "</dd> </dl>";
        return dl;
    }

    function setMsg(o) {
        if ($('#ddlKnowledge option:selected').val() > 0) {
            var msg = $('#ddlKnowledge option:selected').attr("answer");
            $("#edit-box").html($("#edit-box").html() + msg);
            return false;
            //$("#edit-box").val("0");
            //$('#edit-box').innerHTML
        }
    }

    //关闭当前对话窗口
    function closeChat() {
        parent.closeChat(cid);
    }

});