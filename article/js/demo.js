/**
*  专题专用微信分享代码, 说明：
*  1. weChatShare json对象，key: title(分享标题)  desc(分享描述) link(分享链接) imgUrl(分享图标) type(分享类型) data(类型数据链接)
*       title // 分享标题,建议主标题一行 18个字符以内 
*       desc  // 分享描述，建议描述最多两行 36个字符以内 
*       link  // 分享链接，默认为当前页
*       imgUrl// 分享图标,200*200
*       type  // 分享类型,link/music/video，默认为link
*       data  // 分型类型数据,如果type是music或video，则要提供数据链接，默认为空   
*       weChatShare.successCallback  // 分享成功回调
*       weChatShare.cancelCallback  // 分享取消回调
*  2. <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> 
*  3. <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> 
*
**/


// 默认数据
weChatShare.link = weChatShare.link ? weChatShare.link : window.location.href.split('#')[0];
weChatShare.type = weChatShare.type ? weChatShare.type : 'link';
weChatShare.data = weChatShare.data ? weChatShare.data : '';


// 随机生成字符串
var noncestr   = randomString(16);
function randomString(len) {
　　var len    = len || 32,
        $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
        maxPos = $chars.length,
        pwd = '';
　　for (var i = 0;i<len;i++) pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　return pwd;
} 


// 微信分享构造函数
function _weChat(data) { 
    wx.config({
        debug: false,
        appId: 'wx133b04ad9003db0a',  //必填，appid
        nonceStr : noncestr,  // 必填，生成签名的随机串
        timestamp: data.timestamp, // 必填，生成签名的时间戳 
        signature: data.signature, // 必填，签名
        jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","chooseImage"]
    }); 
    wx.ready(function(){       
        //朋友圈
        wx.onMenuShareTimeline({
            title: weChatShare.title, 
            link : weChatShare.link,  
            imgUrl  : weChatShare.imgUrl, 
            // trigger menu操作重新赋值
            trigger : function() {
                this.title = weChatShare.title;
                this.link = weChatShare.link;
            }, 
            success: function () { 
                weChatShare.successCallback&&weChatShare.successCallback(); 
            },
            cancel: function () { 
                weChatShare.cancelCallback&&weChatShare.cancelCallback(); 
            }
        });
        //分享给朋友 
        wx.onMenuShareAppMessage({
            title: weChatShare.title,  
            link : weChatShare.link, 
            type : weChatShare.type, 
            desc : weChatShare.desc,
            imgUrl  : weChatShare.imgUrl,
            data : weChatShare.data,  
            trigger : function() {
                // trigger menu操作重新赋值
                this.title = weChatShare.title;
                this.desc = weChatShare.desc;
                this.link = weChatShare.link; 
            },  
            success: function () { 
                weChatShare.successCallback&&weChatShare.successCallback(); 
            },
            cancel: function () { 
                weChatShare.cancelCallback&&weChatShare.cancelCallback(); 
            }
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title: weChatShare.title, 
            link : weChatShare.link,  
            imgUrl  : weChatShare.imgUrl,  
            trigger : function() {
                this.title = weChatShare.title;
                this.link = weChatShare.link;
            }, 
            success: function () { 
                weChatShare.successCallback&&weChatShare.successCallback(); 
            },
            cancel: function () { 
                weChatShare.cancelCallback&&weChatShare.cancelCallback(); 
            }
        });
        //分享到微博
        wx.onMenuShareWeibo({
            title: weChatShare.title, 
            link : weChatShare.link,  
            imgUrl  : weChatShare.imgUrl,  
            trigger : function() {
                this.title = weChatShare.title;
                this.link = weChatShare.link;
            },   
            success: function () { 
                weChatShare.successCallback&&weChatShare.successCallback(); 
            },
            cancel: function () { 
                weChatShare.cancelCallback&&weChatShare.cancelCallback(); 
            }
        });
    });
}

/**
*  获取签名和时间戳  signature   timestamp
**/
// window.addEventListener("load",function(){
    $.ajax({
        url: '//toys.m.people.cn/apps/weixin_share/getAccessToken/accessToken.php?par=L&noncestr='+ noncestr +'&link=' + encodeURIComponent(weChatShare.link), 
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback', 
        jsonpCallback : 'tt',
        success: function(data){ 
            // 请求 token 成功后回调 微信分享构造函数 
            _weChat(data); 
        },
        error: function(data) {}
    });
// }) 