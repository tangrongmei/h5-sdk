<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { hex_md5 } from "@/common/js/md5.js";
import fun from "@/common/js/common";
import userInfoMaskVue from './views/view3/userInfoMask.vue';

export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      countDownload: this.countDownload,
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      os: "", //设备类型
      brand: "", //设备品牌
      systemversion: "", // 版本
      adid: "63707", // 广告id
      agentId: "1614", // 渠道id
      appid: "146", // appid
      userInfo: "", //用户信息
      wechatCode: "", // 微信code
      deskIcon: false, // 是否是桌面ICON进入
      ipAdress: "", //ip
      model: "",
      gameCountUrl: "https://www.liulianhyu.com/analysis/count/pageAnalysis", // 数据统计地址

      gameData: "",
      activeId: "", //活动id
      idfa: "", //壳包专用参数
      type: 0,
      isnuoer: 0,
    };
  },
  watch: {},
  created() {
    var that = this;
    // 初始给定一个游戏url
    if (window.location.href.indexOf("appid") === -1) {
      window.location.href =
        (window.location.href.indexOf("?") === -1
          ? window.location.href
          : window.location.href.split("?")[0]) +
        "?appid=" +
        this.appid +
        "&adid=" +
        this.adid +
        "&agentId=" +
        this.agentId;
      localStorage.setItem("appid", this.appid);
      localStorage.setItem("adid", this.adid);
      localStorage.setItem("agentId", this.agentId);
      localStorage.setItem("idfa", this.idfa);
    } else {
      this.appid = fun.getQueryString("appid");
      this.adid = fun.getQueryString("adid");
      this.agentId = fun.getQueryString("agentId");
      this.activeId = fun.getQueryString("activityId")
        ? fun.getQueryString("activityId")
        : "";
      this.idfa = fun.getQueryString("idfa")
        ? fun.getQueryString("idfa")
        : this.idfa; //ios壳包专用参数
      this.type = fun.getQueryString("type") ? fun.getQueryString("type") : "1";
      this.isnuoer = fun.getQueryString("isnuoer")
        ? fun.getQueryString("isnuoer")
        : "0";
      localStorage.setItem("appid", this.appid);
      localStorage.setItem("adid", this.adid);
      localStorage.setItem("agentId", this.agentId);
      localStorage.setItem("activeId", this.activeId);
      localStorage.setItem("idfa", this.idfa);
      localStorage.setItem("type", this.type);
      localStorage.setItem("isnuoer", this.isnuoer);
      // var appkey = "LLewi3rc2dseq2Q#"+this.appid+"#aeeEIYNC584";
      // localStorage.setItem("appkey", appkey);
      // console.log(appkey)
    }
    //把设备信息存储，其他页面可以从内存获取
    this.getGameTitle();
    this.getGameData();
  },
  mounted() {
    var that = this;
    //用户信息
    this.userInfo =
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};
    //获取设备信息
    var MobileDetect = require("mobile-detect");
    var md = new MobileDetect(window.navigator.userAgent);
    this.brand = md.mobile();
    this.os = md.os();
    var idfa_os=this.idfa?"ios":this.os;
    localStorage.setItem("os", idfa_os);
    var isPC;
    if (md.os()) {
      isPC = "0";
    } else {
      isPC = "1";
    }
    this.systemversion = md.version();
    this.os = this.os === "iOS" ? "ios" : "android";
    this.$store.commit("postDeviceData", {
      os: this.os,
      brand: this.brand,
      systemversion: this.systemversion,
      isPC: isPC,
    });
    var wxurl = escape(window.location.href);
    localStorage.setItem("wxurl", wxurl);
    //判断uuid是否存在，是否需要获取
    if (localStorage.getItem("uuid")) {
      //如果uuid已经存在则不再获取，
    } else {
      //清除缓存后uuid已失去，重新获取
      localStorage.setItem("uuid", this.guid());
    }
    // 上传玩家设备信息到服务器getGameOpenSerVO?
    if (!localStorage.getItem("isUploadUserInfo")) {
      this.getUploadDevice();
    } else {
    }
    var isweixin = this.isWeixn();

    //判断是否微信内--再把结果存储
    this.$store.commit("postWechatType", isweixin);
    //微信内去获取微信code
    if (isweixin) {
      this.wechatCode = fun.getQueryString("code");
      if (this.wechatCode) {
        this.getWeixinCode(this.wechatCode);
        localStorage.setItem("code", fun.getQueryString("code"));
      }
      this.wechatCode = localStorage.getItem("code");
      if (this.wechatCode) {
      } else {
        let redirect_uri = escape(window.location.href);
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe3a9a92cbd0d753e&redirect_uri=" +
          redirect_uri +
          "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
      }
    }
    this.agreement();
    this.getGameCurrency();
    //检查浏览器类型
    this.checkedBrowserType();
    this.getMemberMsg();

  },
  methods: {
    //获取uuid的方法
    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    guid() {
      return (
        this.S4() +
        this.S4() +
        "-" +
        this.S4() +
        "-" +
        this.S4() +
        "-" +
        this.S4() +
        "-" +
        this.S4() +
        this.S4() +
        this.S4()
      );
    },
    //获取游戏title
    getGameTitle() {
      var adid = fun.getQueryString("adid")
        ? fun.getQueryString("adid")
        : this.adid;
      this.$http
        .post(fun.apiDomain + "ad/getAdName?adId=" + adid)
        .then(function (res) {
          document.title = res.body.msg;
        });
    },
    //获取游戏信息
    getGameData() {
      this.$http
        .post(fun.center + "getGameData?appId=" + this.appid)
        .then(function (res) {
          if (res.body.code == 200) {
            this.gameData = res.body.data;
            localStorage.setItem("gameData", JSON.stringify(res.body.data));
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    //获取游币
    getGameCurrency() {
      if (!this.userInfo.uid) {
        return false;
      }
      var time = new Date().getTime();
      var sign = hex_md5(
        this.adid +
          this.agentId +
          this.appid +
          this.userInfo.uid +
          time +
          "153b8e8d884796af035dd05121e024ba"
      );
      var data = {
        adid: this.adid,
        agentId: this.agentId,
        uid: this.userInfo.uid ? this.userInfo.uid : "",
        appid: this.appid,
        time: time,
        sign: sign,
        os: "h5",
      };
      this.$http
        .post(fun.center + "gameCenter/getCenterCoin", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.$store.commit(
              "postGameCurrency",
              JSON.parse(res.data.data).data.coin + ""
            );
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
   
    // 判断是否在微信内
    isWeixn() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    // 获取微信code
    getWeixinCode(wechatCode) {
      let data = {
        code: wechatCode,
      };
      this.$http
        .post(
          fun.apiPayUrl + "paycenter/pay/saveWxCodeAndCacheThisOpenId",
          data
        )
        .then(
          function (res) {},
          function (res) {}
        );
    },

    // 检查浏览器类型
    checkedBrowserType() {
      var isSafari =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent) &&
        !/HUAWEI/.test(navigator.userAgent); // 是否safari浏览器

      var isAndroid = /Android/.test(navigator.userAgent); // 是否安卓浏览器
      var isWeixn = this.isWeixn(); // 是否微信
      var isIOS = this.os == "ios" ? true : false;

      if (isWeixn) {
        if (isAndroid) {
          document.getElementById("wx_bg_img").style.display = "";
          document.getElementById("wx_bg_img").src =
            "http://noerpineapple.oss-cn-shenzhen.aliyuncs.com/test/1579165647975.png";
        }
        if (isIOS) {
          document.getElementById("wx_bg_img").style.display = "";
          document.getElementById("wx_bg_img").src =
            "http://noerpineapple.oss-cn-shenzhen.aliyuncs.com/test/1579165647975.png";
        }
        return;
      }

      var isDeskIcon = navigator.standalone; // 是否桌面ICON打开
      if (isDeskIcon) {
        this.deskIcon = true;
        localStorage.setItem("deskIcon", this.deskIcon);
        if (JSON.stringify(this.userInfo) == "{}") {
          // 记录第一次从桌面图标打开，并且没有登录的，记录一次下载
          this.countDeskIconUser();
          this.countDownload();
        }
        return;
      }

      // 获取URL参数
      var adid = this.adid;
      var agentId = this.agentId;
      if (!agentId || isNaN(agentId)) {
        if (agentId.indexOf("268") > -1) {
          agentId = 268;
        } else {
          agentId = 266;
        }
      }
      var appid = fun.getQueryString("appid");
      var devType = isIOS ? 0 : 1; // 1是安卓，0是IOS
      // 请求获取游戏ICON和名称
      var that = this;
      this.$http
        .get(fun.center + "getGameOpenSerVO", {
          params: {
            agentId: agentId,
            appid: appid,
            adid: adid,
            sign: "xx",
            devType: devType,
          },
        })
        .then(function (res) {
          var data = res.data.data;
          if (!(data instanceof Object)) return;
          document.title = data.title;
          if (this.os == "ios") {
            if (isSafari) {
              that.createDeskIconMeta(data.iconURL, data.title);
              localStorage.setItem("isSafariBrowser", true);
              localStorage.setItem("visibleGuideFloat", true);
            } else {
              localStorage.setItem("isSafariBrowser", false);
              localStorage.setItem("visibleGuideFloat", false);
            }
          } else {
            localStorage.setItem("isSafariBrowser", false);
            localStorage.setItem("visibleGuideFloat", true);
          };
          localStorage.setItem("downloadApkUrl", data.downloadURL);
          localStorage.setItem("gameIconUrl", data.iconURL);
        });
    },
    // 创建苹果移动设备添加主屏的ICON和名称
    createDeskIconMeta(iconUrl, title) {
      var headEl = document.head;
      var meta = document.createElement("meta");
      meta.name = "apple-mobile-web-app-title";
      meta.content = title;
      headEl.appendChild(meta);

      var iconSizeArr = [
        "57x57",
        "72x72",
        "76x76",
        "114x114",
        "120x120",
        "144x144",
        "152x152",
      ];
      iconSizeArr.forEach(function (size) {
        var link = document.createElement("link");
        link.rel = "apple-touch-icon";
        link.sizes = size;
        link.href = iconUrl;
        headEl.appendChild(link);
      });
    },

    //  上传数据 主屏幕图标进入的用户
    countDeskIconUser() {
      // type=0 是展示，  type=1是下载  type=3  第一次从桌面ICON进入游戏
      this.$http
        .post(
          this.gameCountUrl,
          {
            os: this.os,
            pageid: this.adid,
            type: 3,
            t: Math.random(),
            ip: this.ipAdress,
          },
          {
            emulateJSON: true,
          }
        )
        .then(function (res) {});
    },
    //  上传数据 下载
    countDownload() {
      // type=0 是展示，  type=1是下载
      this.$http
        .post(
          this.gameCountUrl,
          {
            os: this.os,
            pageid: this.adid,
            type: 1,
            t: Math.random(),
            ip: this.ipAdress,
          },
          {
            emulateJSON: true,
          }
        )
        .then(function (res) {});
    },

    // 上传玩家设备信息到服务器
    getUploadDevice() {
      this.time = new Date().getTime();
      this.sign = hex_md5(
        this.userInfo.uid
          ? this.userInfo.uid
          : "" + this.agentId + this.adid + this.time + this.appid
      );
      var os = this.idfa?"ios":this.os;
      let device_params = {
        os: os,
        uuid: localStorage.getItem("uuid"),
        idfa: this.idfa,
      };

      let data = {
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        sign: this.sign,
        time: this.time,
        os:os,
        uid: this.userInfo.uid,
        device_params: device_params,
        ipAdress: this.ipAdress,
      };
      this.$http.post(fun.apiDomain_go + "member/device", data).then(
        function (res) {
          if (res.body.code === 200) {
            localStorage.setItem("isUploadUserInfo", true);
            this.isUploadUserInfo = true;
          } else {
            this.$toast.text(res.body.msg);
          }
        },
        function (res) {}
      );
    },
    //获取用户协议
    agreement() {
      this.$http.get(fun.apiDomain_go + "member/agreement", {}).then(
        function (res) {
          if (res.body.code === 200) {
            this.$store.commit("postAgreement", res.body.data);
          } else {
            this.$toast.text(res.body.msg);
          }
        }.bind(this)
      );
    },
    getMemberMsg() {
      if (!this.userInfo.uid) {
        return false;
      }
      var time = new Date().getTime();
      var sign = hex_md5(
        this.adid +
          this.agentId +
          this.appid +
          this.userInfo.uid +
          time +
          "d76f8025623554b843631ee676a9b8c5"
      );
      var data = {
        userId: this.userInfo.uid,
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        loginStatus: 1,
        dateTime:time,
        type: 1,
        sign: sign,
      };
      this.$http
        .post(
          fun.center+"website/sobot/getUserInfo",
          data
        )
        .then(function (res) {
          if(res.body.code == 200){
            localStorage.setItem("memberMsg",JSON.stringify(res.body.data));
          }else{
            this.$toast.text(res.body.msg);
          }
        });
    },
    //页面刷新
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.userInfo =
        localStorage.getItem("userInfo") &&
        localStorage.getItem("userInfo") != "undefined"
          ? JSON.parse(localStorage.getItem("userInfo"))
          : {};
      this.$nextTick(function () {
        this.getGameCurrency();
        this.getMemberMsg();
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>

<style>
#app {
  width: 100%;
  letter-spacing: 0.01rem;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #484545;
  /* margin-top: 60px; */
}
body {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
* {
  touch-action: pan-y;
}
.coupon .nut-swiper {
  height: auto;
  flex: 1;
}
.coupon .nut-swiper.horizontal .nut-swiper-wrap {
  height: auto;
}
.coupon .nut-swiper.horizontal .nut-swiper-pagination {
  bottom: 0.5rem;
}
.coupon .nut-swiper .nut-swiper-pagination .swiper-pagination-bullet.active {
  background-color: #f35c14;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px rgba(239, 239, 239, 1) inset !important;
}

@media all and (orientation: portrait) {
  /* .winBox {
    width: 6.22rem;y
    height: 6.29rem;
    background-color: #fff;
  } */
}
@media all and (orientation: landscape) {
  /* .winBox {
    width: 7rem;
    height: 6.6rem;
    background-color: #fff;
  } */
  .coupon .nut-swiper.horizontal .nut-swiper-pagination {
    bottom: 0.3rem;
  }
}
.exchange .toast_style {
  background-color: red;
}
</style>
