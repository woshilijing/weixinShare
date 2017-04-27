/**
 * Created by O5 on 2017/3/30.
 */

var regQ=/\?/ig;
 if(regQ.test(shareContent.link)){
     shareContent.shareLink+='&forward=1';
 }else{
     shareContent.shareLink+='?forward=1';
 }
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
//微信分享
function _weShare(data){
    wx.config({
        debug: true, 
        appId: data.results.appid, 
        timestamp:data.results.timestamp, 
        nonceStr:noncestr, 
        signature: data.results.signature,
        jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"] 
    });
    wx.ready(function(){
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: shareContent.title,
            link:shareContent.shareLink,
            imgUrl: shareContent.image,
            success: function () {
                EV_modeAlert('envon');
                shareCount();
            },
            cancel: function () {
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: shareContent.title,
            link:shareContent.shareLink,
            imgUrl: shareContent.image,
            desc: shareContent.summary,
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                EV_modeAlert('envon');
                shareCount();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title: shareContent.title,
            link : shareContent.shareLink,
            imgUrl :shareContent.image,
            success: function () {
                EV_modeAlert('envon');
                shareCount();
            },
            cancel: function () {

            }
        });

    });
}
$.ajax({
    url:'http://share.ynet.com/public/wechat/share?noncestr='+ noncestr +'&link=' + encodeURIComponent(shareContent.link),
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback : 'tt',
    success: function(data){
        _weShare(data);
    },
    error: function(data) {}
});

//分享
function shareCount() {
    articleId = false;
    var regId=/\/(\w{2,})[.]/g;
    if(regId.test(window.location.href.split('#')[0])){
        var articleId=regId.exec(window.location.href.split('#')[0])[1];
        var regTest=/[_]/g;
        if(regTest.test(articleId)){
            var regFilter=/[0-9a-z]{2,}/g;
            articleId=regFilter.exec(articleId)[0];
        }
    }
    if (!articleId) {alert('get article id is null');return false}
    $.ajax({
        type: 'GET',
        url: 'http://share.ynet.com/public/statist/addsharenumber?article_id=' + articleId,
        dataType: 'jsonp',
        //dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, type) {
            console.log("Ajax error");
        }
    });
}
