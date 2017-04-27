/*弹窗部分*/
(function(){
    var EV_MsgBox_ID="";

    //弹出对话窗口(msgID-要显示的div的id)
    function EV_modeAlert(msgID){
        //创建大大的背景框
        var bgObj=document.createElement("div");
        bgObj.setAttribute('id','EV_bgModeAlertDiv');
        document.body.appendChild(bgObj);
        //背景框满窗口显示
        EV_Show_bgDiv();
        //把要显示的div居中显示
        EV_MsgBox_ID=msgID;
        EV_Show_msgDiv();
    }

    //关闭对话窗口
    function EV_closeAlert(){
        var msgObj=document.getElementById(EV_MsgBox_ID);
        var bgObj=document.getElementById("EV_bgModeAlertDiv");
        msgObj.style.display="none";
        document.body.removeChild(bgObj);
        EV_MsgBox_ID="";
    }
    //把要显示的div居中显示
    function EV_Show_msgDiv(){
        var msgObj   = document.getElementById(EV_MsgBox_ID);
        msgObj.style.display  = "block";
        var msgWidth = msgObj.scrollWidth;
        var msgHeight= msgObj.scrollHeight;
        var bgTop=EV_myScrollTop();
        var bgLeft=EV_myScrollLeft();
        var bgWidth=EV_myClientWidth();
        var bgHeight=EV_myClientHeight();
        var msgTop=bgTop+Math.round((bgHeight-msgHeight)/2);
        var msgLeft=bgLeft+Math.round((bgWidth-msgWidth)/2);
        msgObj.style.position = "absolute";
        msgObj.style.top      = msgTop+"px";
        msgObj.style.left     = msgLeft+"px";
        msgObj.style.zIndex   = "10001";

    }
    //背景框满窗口显示
    function EV_Show_bgDiv(){
        var bgObj=document.getElementById("EV_bgModeAlertDiv");

        var bgWidth=EV_myClientWidth();
        var bgHeight=EV_myClientHeight();
        var bgTop=EV_myScrollTop();
        var bgLeft=EV_myScrollLeft();
        bgObj.style.position   = "absolute";
        bgObj.style.top        = bgTop+"px";
        bgObj.style.left       = bgLeft+"px";
        bgObj.style.width      = bgWidth + "px";
        bgObj.style.height     = bgHeight + "px";
        bgObj.style.zIndex     = "10000";
        bgObj.style.background = "#000000";
        bgObj.style.filter     = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=80,finishOpacity=80);";
        bgObj.style.opacity    = "0.8";
        stop()
    }
    //网页被卷去的上高度
    function EV_myScrollTop(){
        var n=window.pageYOffset
            || document.documentElement.scrollTop
            || document.body.scrollTop || 0;
        return n;
    }
    //网页被卷去的左宽度
    function EV_myScrollLeft(){
        var n=window.pageXOffset
            || document.documentElement.scrollLeft
            || document.body.scrollLeft || 0;
        return n;
    }
    //网页可见区域宽
    function EV_myClientWidth(){
        var n=document.documentElement.clientWidth
            || document.body.clientWidth || 0;
        return n;
    }
    //网页可见区域高
    function EV_myClientHeight(){
        var n=document.documentElement.clientHeight
            || document.body.clientHeight || 0;
        return n;
    }
    //移动端
//实现滚动条无法滚动
    var mo=function(e){e.preventDefault();};
    /***禁止滑动***/
    function stop(){
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
    }

    /***取消滑动限制***/
    function move(){
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
    }
    var paramContent={
        title:$("#nr h1").text(),//获取文章的标题
        image:document.querySelector(".img_content img")?document.querySelector(".img_content img").src:'http://res.ynet.com/images/share_wxchat.png',
        link:window.location.href.split('#')[0],
        shareLink:window.location.href.split('#')[0],
        summary:getContentSummary()
    };
    function getContentSummary()
    {
        desc = Array.prototype.filter.call(document.querySelectorAll('#page > p'), o=>!o.hasAttribute('style'))[0];
        if (typeof(desc) != "undefined") {
            return desc.innerText.substring(0, 40) + '...';
        }else{
            return paramContent.title
        }
    }
    window.EV_modeAlert=EV_modeAlert;
    window.EV_closeAlert=EV_closeAlert;
    window.shareContent=paramContent;


})();
