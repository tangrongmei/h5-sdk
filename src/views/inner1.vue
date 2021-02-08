<template>
  <!-- <div id="inner" :style="{width: m_w+'px', height:m_h+'px'}"> -->
  <div id="inner">
    <iframe
      :src="url"
      :height="m_h"
      allowtransparency="yes"
      scrolling="no"
      frameborder="0"
      :width="m_w"
      style="overflow: hidden"
      id="h5-game-iframe"
      class="iframe"
    ></iframe>
    <div
      class="logoIcon"
      @click="openTopWin"
      id="MotionButton"
      v-show="$store.state.logoIconShow"
    >
      <!-- <img
        :src="logoIcon2"
        class
        v-if="
          $store.state.redCountData.emailCount > 0 ||
          $store.state.isFirstLoginData.voucher == 0 ||
          $store.state.isFirstLoginData.officialAccount == 0 ||
          $store.state.isFirstLoginData.welfare == 0 ||
          $store.state.redCountData.welfareTaskCount > 0
        "
      /> -->
      <img
        :src="logoIcon2"
        class
        v-if="
          $store.state.logoRedData.isShowRedpoint ||
          ($store.state.logoRedData.isShowRedpoint == 0 &&
            ($store.state.logoRedData.redPointCountsVo.emailCount > 0 ||
              $store.state.logoRedData.redPointCountsVo.welfareTaskCount > 0 ||
              $store.state.logoRedData.redPointCountsVo.walletCount > 0))
        "
      />
      <img :src="logoIcon" class v-else />
    </div>
    <div class="hideLogo" @click="showLogo" v-show="!$store.state.logoIconShow">
      <img
        :src="hideRedIcon"
        v-if="
          $store.state.logoRedData.isShowRedpoint ||
          ($store.state.logoRedData.isShowRedpoint == 0 &&
            ($store.state.logoRedData.redPointCountsVo.emailCount > 0 ||
              $store.state.logoRedData.redPointCountsVo.welfareTaskCount > 0 ||
              $store.state.logoRedData.redPointCountsVo.walletCount > 0))
        "
      />
      <img :src="hideIcon" v-else />
    </div>
    <div
      v-if="$store.state.isCreateRole"
      class="pointBox"
      :class="$store.state.logoIconShow ? 'pointBox2' : ''"
    >
      <img :src="point" alt="" />
    </div>
    <!-- 遮罩层 -->
    <div
      class="maskInfo"
      v-if="
        $store.state.winType.isUserInfoMask ||
        $store.state.winType.isLoginBox ||
        $store.state.winType.isPassWordLogin ||
        $store.state.winType.isPhoneLogin ||
        $store.state.winType.isCustomerService ||
        $store.state.winType.isWechat ||
        $store.state.winType.isEmail ||
        $store.state.winType.isEmailDetails ||
        $store.state.winType.isWelfare ||
        $store.state.winType.isReconiseInfo ||
        $store.state.winType.isBindPhone ||
        $store.state.winType.isCoupon ||
        $store.state.winType.isPayType ||
        $store.state.winType.isPayUrlInfo ||
        $store.state.winType.isRegister ||
        $store.state.winType.isWallet ||
        $store.state.winType.agreementShow ||
        $store.state.winType.isAccountAndPas ||
        $store.state.winType.isAccount ||
        $store.state.winType.isAlertPwd ||
        $store.state.winType.isRealNameTip ||
        $store.state.winType.isRealNameForm ||
        $store.state.winType.isTiredTip ||
        $store.state.winType.isRelieveTiredTip
      "
    >
      <!-- 总窗口 -->
      <userInfoMask v-if="$store.state.winType.isUserInfoMask" />
      <loginBox v-if="$store.state.winType.isLoginBox" />
      <accountAndPas v-if="$store.state.winType.isAccountAndPas" />
      <passWordLogin v-if="$store.state.winType.isPassWordLogin" />
      <phoneLogin v-if="$store.state.winType.isPhoneLogin" />
      <customerService v-if="$store.state.winType.isCustomerService" />
      <wechat v-if="$store.state.winType.isWechat" />
      <email v-if="$store.state.winType.isEmail" />
      <emailDetails v-if="$store.state.winType.isEmailDetails" />
      <welfare v-if="$store.state.winType.isWelfare" />
      <reconiseInfo v-if="$store.state.winType.isReconiseInfo" />
      <register v-if="$store.state.winType.isRegister" />
      <bindPhone v-if="$store.state.winType.isBindPhone" />
      <coupon v-if="$store.state.winType.isCoupon" />
      <agreement v-if="$store.state.winType.agreementShow" />
      <wallet v-if="$store.state.winType.isWallet" />
      <account v-if="$store.state.winType.isAccount" />
      <alertPwd v-if="$store.state.winType.isAlertPwd" />
      <antiAddiction
        class="reconiseInfoWin"
        v-if="
          $store.state.winType.isRealNameTip ||
          $store.state.winType.isRealNameForm ||
          $store.state.winType.isTiredTip ||
          $store.state.winType.isRelieveTiredTip
        "
      />
      <payType
        :pay-info="payInfo"
        v-if="
          $store.state.winType.isPayType || $store.state.winType.isPayUrlInfo
        "
      />
    </div>
    <!-- 退出弹窗 -->
    <div class="closeWinShade" v-if="isCloseWinShow">
      <div class="closeWinBox">
        <div class="closeWinTitle">
          <span>退出确定</span>
        </div>
        <!-- <div class="closeWinContent">
          <span>客官,您确定要退出吗?</span>
        </div>-->
        <div class="closeWinContent">
          <div @click="copy" class="closeWinCopy" @mouseenter="copy()">
            公众号：草莓游戏
            <span ref="btn" data-clipboard-text="草莓游戏">(点击复制)</span>
          </div>
          <div class="closeWinHint">
            <span>搜索关注公众号</span>
            <span>无需下载即可登录游戏</span>
          </div>
          <div class="closeWinQrCode">
            <img :src="gzhIcon" />
          </div>
        </div>
        <div class="closeWinBtn">
          <div class="closeWinBtn_l" @click="outGame">
            <span>退出游戏</span>
          </div>
          <div class="closeWinBtn_r" @click="goOnGame">
            <span>继续游戏</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="safari-float"
      :class="isSafariBrowser ? 'isSafari-browser' : ''"
      v-if="visibleGuideFloat"
      @click="downloadApk"
    >
      <img class="safari-logo" :src="gameIconUrl" alt />
      <!-- safari -->
      <div class="safari-tips" v-if="isSafariBrowser">
        <p>
          先点击
          <img :src="share" alt="" />
        </p>
        <p>
          再“添加到主屏幕”
          <img :src="add" alt="" />
        </p>
      </div>
      <!-- android -->
      <div class="safari-tips" v-else>
        <p>点击下载</p>
        <p>游戏端到主屏幕</p>
      </div>
      <div class="safari-close" @click.stop="closeSafariFloat($event)">
        <img src="../assets/img/close.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import Clipboard from "clipboard";
import { hex_md5 } from "@/common/js/md5.js";
import fun from "@/common/js/common";

import userInfoMask from "./view1/userInfoMask";
import loginBox from "./view1/loginBox";
import accountAndPas from "./view1/accountAndPas";
import passWordLogin from "./view1/passWordLogin";
import phoneLogin from "./view1/phoneLogin";
import customerService from "./view1/customerService";
import wechat from "./view1/wechat";
import email from "./view1/email";
import emailDetails from "./view1/emailDetails";
import welfare from "./view1/welfare";
import reconiseInfo from "./view1/reconiseInfo";
import bindPhone from "./view1/bindPhone";
import coupon from "./view1/coupon";
import payType from "./view1/payType";
import register from "./view1/register";
import wallet from "./view1/wallet";
import agreement from "./view1/agreement"; //用户协议
import account from "./view1/account";
import alertPwd from "./view1/alertPwd";
import antiAddiction from "./view1/antiAddiction";

export default {
  name: "inner",
  inject: ["reload", "countDownload"], //注入App里的reload方法
  props: [""],
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      innerReload: this.innerReload,
      updateLogoType: this.updateLogoType,
    };
  },
  components: {
    userInfoMask,
    loginBox,
    accountAndPas,
    passWordLogin,
    phoneLogin,
    customerService,
    wechat,
    email,
    emailDetails,
    welfare,
    reconiseInfo,
    bindPhone,
    coupon,
    payType,
    register,
    wallet,
    agreement,
    account,
    alertPwd,
    antiAddiction,
  },

  data() {
    return {
      gzhIcon: require("../assets/img/cmyx.jpg"),

      payInfo: "", // 支付弹窗展示信息
      // logoIcon: require("../assets/img/logo.png"),
      // logoIcon2: require("../assets/img/logoRed.png"),
      logoIcon: require("../assets/img/cmLogo.png"),
      logoIcon2: require("../assets/img/cmLogo.png"),
      hideIcon: require("../assets/img/hide.png"),
      point: require("../assets/img/point.gif"),
      hideRedIcon: require("../assets/img/hideRed.png"),
      share: require("../assets/img/share.png"),
      add: require("../assets/img/add.png"),
      url: "", // iframe游戏路径
      m_h: "", // iframe高度
      m_w: "", // iframe宽度
      userInfo: "", // 用户信息
      appid: "", // appid
      adid: "",
      agentId: "",
      sign: "", // 签名
      time: "", // 时间戳
      isSafariBrowser: false, // 是否safari浏览器
      guideTimeout: 60, // safari引导弹窗时间间隔（秒）
      downloadApkUrl: "",
      gameIconUrl: "",
      firstLoad: true,
      isCloseWinShow: "", //提示弹窗开关
      visibleGuideFloat: "", //ios添加到桌面弹窗开关
      model: "",
      isFirstLoginData: {}, //是否第一次登录
      redCountData: {}, //红点数量
      serviceInfo: {},
      isUserFCM: "", //用户是否实名过
      isLonginFCM: "", //是否开启游戏迷系统
      isAdult: "", //是否是未成年实名
      isPayFCM: "", //是否开启支付防沉迷
      timmer: null,
      overTip: 0, //是否已经开启过超时提醒
    };
  },
  created() {
    var _this = this;
    var MobileDetect = require("mobile-detect");

    var device_type = navigator.userAgent; //获取userAgent信息
    var md = new MobileDetect(device_type); //初始化mobile-detect
    var os = md.os(); //获取系统
    if (os == "AndroidOS") {
      //Android系统的处理
      os = md.os() + md.version("Android");
      var sss = device_type.split(";");
      var i = fun.getModel(sss, "Build/");
      if (i > -1) {
        this.model = sss[i]
          .substring(0, sss[i].indexOf("Build/"))
          .replace("-", "");
      }
    }
    this.h5_screen_orientation();
    this.getSize();
    document.addEventListener("DOMContentLoaded", _this.getSize, false);
    window.addEventListener("resize", function () {
      setTimeout(function () {
        _this.h5_screen_orientation();
      }, 1000);
      _this.getSize();
    });
    addEventListener("load", _this.getSize, false);
  },
  mounted() {
    var _this = this;
    window.localStorage.removeItem("serviceInfo");
    this.$store.commit("postIsCreateRole", false);

    // 时间戳
    this.time = new Date().getTime();
    this.appid = localStorage.getItem("appid")
      ? localStorage.getItem("appid")
      : "";
    this.adid = localStorage.getItem("adid")
      ? localStorage.getItem("adid")
      : "";
    this.agentId = localStorage.getItem("agentId")
      ? localStorage.getItem("agentId")
      : "";
    this.isSafariBrowser = localStorage.getItem("isSafariBrowser")
      ? JSON.parse(localStorage.getItem("isSafariBrowser"))
      : false;
    this.visibleGuideFloat = localStorage.getItem("visibleGuideFloat")
      ? JSON.parse(localStorage.getItem("visibleGuideFloat"))
      : false;
    this.gameIconUrl = localStorage.getItem("gameIconUrl")
      ? localStorage.getItem("gameIconUrl")
      : "";
    this.downloadApkUrl = localStorage.getItem("downloadApkUrl")
      ? localStorage.getItem("downloadApkUrl")
      : "";
    //获取用户信息
    this.userInfo =
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};

    if (!this.userInfo.uid) {
      this.$store.dispatch("IsLoginBoxFun", true);
    } else {
      this.getAddictionOpen();
    }
    _this.timmer = setInterval(_this.getUserOnLineTime, 600000);
    this.uname = this.userInfo.uname;
    // 获取签名--加密
    this.sign = hex_md5(
      (this.userInfo.uid ? this.userInfo.uid : this.time) +
        this.appid +
        this.award +
        this.time +
        "ae2ae511dbed7c9620691d45fbb6e17e"
    );
    this.verticitionToken();
    window.onmessage = function (e) {
      var obj = e.data;
      //问题：离开页面机会触发loginOut，导致跳支付宝也会触发强制用户重新登录
      //解决方法：监听支付行为时增加isPay字段，当监听到loginOut时再继续判断ispay，确保跳支付后再回来不会强制登录
      if (obj.type == "logOut" && _this.$store.state.isPay) {
        _this.$store.commit("postIsPay", false);
      } else if (
        obj.type == "logOut" &&
        !_this.$store.state.isPay &&
        !navigator.onLine
      ) {
        localStorage.removeItem("userInfo");
        _this.$store.dispatch("IsLoginBoxFun", true);
      } else if (obj.type == "logOut") {
        _this.verticitionToken();
      }
      if (obj.type == "send_user") {
        if (obj.dataType == 2) {
          _this.$store.commit("postIsCreateRole", true);
        }

        if (localStorage.getItem("activeId") && obj.dataType == 2) {
          _this.postActiveRole(obj);
        } else if (localStorage.getItem("activeId") && obj.dataType == 4) {
          if (
            (obj.roleLevel >= 350 && obj.roleLevel <= 355) ||
            (obj.roleLevel >= 600 && obj.roleLevel <= 605)
          ) {
            _this.postActiveRole(obj);
          }
        }
        _this.visibleGuideFloat = false;
        var serviceInfo = {
          roleId: e.data.roleID,
          roleName: e.data.roleName,
          serverName: e.data.serverName,
          roleLevel: e.data.roleLevel,
          serverID: e.data.serverID,
        };
        _this.serviceInfo = serviceInfo;
        localStorage.setItem("serviceInfo", JSON.stringify(serviceInfo));
        if(!obj.adid){
          obj.adid = _this.adid;
          obj.agentId = _this.agentId;
          obj.appid = _this.appid;
        }
        if (!obj.uid) {
          var id = _this.userInfo.uid;
          obj.uid = id;
        }
        var queryArr = [];
        for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
            queryArr.push(p + "=" + obj[p]);
          }
        }
        // queryArr.push("device_params={}");
        var protocal = window.location.protocol;
        var query = queryArr.join("&");
        var baseUrl =
          protocal + "//risedragon.hnllhy.cn/llpassport/api/member/getUserInfo";
        var url = baseUrl + "?" + query;
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", url, true);
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText; //获取到json字符串，还需解析
          }
        };
      }
      if (
        obj.type == "recharge_pay" ||
        e.data.ext ||
        obj.type == "cp_pay" ||
        obj.money >= 0
      ) {
        _this.$store.dispatch("IsPayTypeFun", true);
        _this.payInfo = e.data;
      }
    };
    this.updateLogoType();
    this.dragmover();
    // this.isFirstLogin();
    // this.getNews();
    this.isLogoRed();
    // 获取iframe中加载的游戏url
    this.url =
      "https://www.4ry.cn/game/login?uid=" +
      (this.userInfo.uid ? this.userInfo.uid : this.time) +
      "&uname=" +
      (this.userInfo.uname ? this.userInfo.uname : this.time) +
      "&appid=" +
      this.appid +
      "&time=" +
      this.time +
      "&award=" +
      this.award +
      "&sign=" +
      this.sign +
      "&os=ios";
    if (window.history && window.history.pushState) {
      window.history.pushState(null, null, document.URL);
      window.addEventListener("popstate", _this.backChange, false); // false阻止默认事件
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.backChange, false);
  },
  beforeDestroy() {
    var _this = this;
    clearInterval(_this.timmer); // 清除定时器
    _this.timmer = null;
  },
  methods: {
    //监听微信返回按钮
    backChange() {
      var _this = this;
      history.pushState(null, null, document.URL);
      if (_this.firstLoad) {
        _this.firstLoad = false;
      } else {
        _this.isCloseWinShow = true;
      }
    },
    //根据屏幕宽和高获取iframe高度
    h5_screen_orientation() {
      if (localStorage.getItem("deskIcon") && window.screen.availHeight) {
        this.m_h =
          window.screen.availHeight ||
          window.innerHeight ||
          document.documentElement.clientHeight;
      } else {
        this.m_h = window.innerHeight || document.documentElement.clientHeight;
      }
      this.m_w = window.innerWidth || document.documentElement.clientWidth;
      this.$store.commit("getIframeSize", { m_w: this.m_w, m_h: this.m_h });
    },
    //点击浮标打开总弹窗
    openTopWin() {
      if (this.userInfo.uid && this.userInfo.bindPhone == "1") {
        this.postRedStatus();
      }
      this.$store.dispatch("IsUserInfoMaskFun", true);
      this.$store.commit("postIsCreateRole", false);
    },
    //退出游戏
    outGame() {
      window.location.href = "about:blank";
      wx.closeWindow();
    },
    showLogo() {
      this.$store.commit("postLogoIconShow", 1);
      this.updateLogoType();
    },
    updateLogoType() {
      var _this = this;
      setTimeout(function () {
        _this.$store.commit("postLogoIconShow", 0);
      }, 3000);
    },
    //继续游戏
    goOnGame() {
      this.isCloseWinShow = false;
    },
    // 安卓下载
    downloadApk() {
      if (this.isSafariBrowser) return;
      //  上报下载数据
      this.countDownload();
      location.href = this.downloadApkUrl;
    },
    // 关闭显示safari提示添加到主屏提示
    closeSafariFloat(e) {
      e.stopPropagation();
      this.visibleGuideFloat = false;
      // 游戏内也会触发，所以要关闭倒计时打开引导框
      // 定时显示引导
      // setTimeout(
      //   function () {
      //     this.visibleGuideFloat = true;
      //   }.bind(this),
      //   this.guideTimeout * 1000
      // );
    },
    dragmover() {
      var _this = this;
      var flag = 0;
      if (!document.querySelector(".logoIcon")) {
        return false;
      }
      var motion = document.querySelector(".logoIcon");
      var disX, disY; //元素左/上 ‘半径’
      var moveX, moveY;
      var L, T; //可移动范围
      var starX, starY;
      var starXEnd, starYEnd;

      motion.addEventListener("touchstart", function (e) {
        flag = 0;
        e.preventDefault(); //阻止触摸按钮时页面滚动和缩放
        //获取元素左/上边到中心（clientX,clientY）的距离
        disX = e.touches[0].clientX - this.offsetLeft;
        disY = e.touches[0].clientY - this.offsetTop;
        //手指按下屏幕时的坐标
        starX = e.touches[0].clientX;
        starY = e.touches[0].clientY;
      });
      motion.addEventListener("touchmove", function (e) {
        L = e.touches[0].clientX - disX;
        T = e.touches[0].clientY - disY;
        //移动时当前位置和起始位置的差值
        starXEnd = e.touches[0].clientX - starX;
        starYEnd = e.touches[0].clientY - starY;
        if (Math.abs(starXEnd) > 0 || Math.abs(starYEnd) > 0) {
          flag = 1;
        }
        if (L < 0) {
          L = 0; //限制拖拽的X范围，不能拖出屏幕
        } else if (
          L >
          document.documentElement.clientWidth - this.offsetWidth
        ) {
          L = document.documentElement.clientWidth - this.offsetWidth;
        }
        if (T < 0) {
          T = 0; //限制拖拽的Y范围，不能拖出屏幕
        } else if (
          T >
          document.documentElement.clientHeight - this.offsetHeight
        ) {
          T = document.documentElement.clientHeight - this.offsetHeight;
        }

        moveX = L + "px";
        moveY = T + "px";
        this.style.left = moveX;
        this.style.top = moveY;
      });
      motion.addEventListener("touchend", function (e) {
        if (flag === 0) {
          e.preventDefault();
          /*
						点击处理事件.....
						*/
          // windosw.location.href = 'https://blog.csdn.net/';
          _this.$store.dispatch("IsUserInfoMaskFun", true);
          _this.$store.commit("postIsCreateRole", false);
          if (_this.userInfo.uid && _this.userInfo.bindPhone == "1") {
            _this.postRedStatus();
          }
        }
      });
    },
    isWeixn() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    getSize() {
      var _this = this;
      let root = document.documentElement;
      let clientWidth = root.clientWidth; //获取客户端宽度
      let clientHeight = root.clientHeight; //获取客户端宽度
      let k = root.clientWidth > root.clientHeight ? 1334 : 750;
      let pageWidth = null; //页面实际宽度
      //如果是移动端
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        pageWidth = clientWidth;
        root.style.width = "";
        var size = window.getComputedStyle(
          document.getElementsByTagName("html")[0]
        ).fontSize;
        if (size && this.isWeixn() && _this.model == " COLAL10 ") {
          var size = size.split("p")[0];
          if (size * 1.2 < 100 * (clientWidth / k)) {
            //如果当前html的font-size 的1.2倍仍然小于 之前想设置的值，就说明是问题机型，给之前想附的值乘1.25倍，这样他会被系统再次除1.25得到的才是我们想附的值
            root.style.fontSize = 125 * (clientWidth / k) + "px";
          }
        } else if (
          clientWidth / clientHeight >= 0.75 &&
          clientWidth / clientHeight <= 1 &&
          clientWidth > 600
        ) {
          root.style.fontSize = 100 * (clientWidth / k / 2) + "px";
        } else if (
          clientWidth / clientHeight > 1 &&
          clientWidth / clientHeight <= 1.4 &&
          clientWidth < 750
        ) {
          root.style.fontSize = 100 * (clientWidth / 750 / 1) + "px";
        } else if (
          clientWidth / clientHeight > 2.4 &&
          clientWidth / clientHeight < 3
        ) {
          root.style.fontSize = 100 * (clientWidth / k / 1.2) + "px";
        } else if (clientWidth / clientHeight > 3) {
          root.style.fontSize = 100 * (clientWidth / k / 1.4) + "px";
        } else {
          root.style.fontSize = 100 * (clientWidth / k) + "px";
        }
      } else if (
        clientWidth / clientHeight > 0.65 &&
        clientWidth / clientHeight <= 1
      ) {
        root.style.fontSize = 100 * (clientWidth / k / 1.5) + "px";
      } else if (
        clientWidth / clientHeight &&
        clientWidth > 900 &&
        clientWidth < 1180
      ) {
        root.style.fontSize = 100 * (clientWidth / k / 1.6) + "px";
      } else if (
        clientWidth / clientHeight &&
        clientWidth >= 1180 &&
        clientWidth < 1480
      ) {
        root.style.fontSize = 100 * (clientWidth / k / 2) + "px";
      } else if (clientWidth / clientHeight && clientWidth >= 1480) {
        root.style.fontSize = 100 * (clientWidth / k / 2.7) + "px";
      } else {
        clientWidth = clientWidth > 900 ? 900 : clientWidth;
        root.style.fontSize = 100 * (clientWidth / k) + "px";
      }
    },
    //验证token
    verticitionToken() {
      if (!this.userInfo.uid) {
        return false;
      }
      this.time = new Date().getTime();
      this.sign = hex_md5(
        this.userInfo.uid
          ? this.userInfo.uid
          : "" + this.agentId + this.adid + this.time + this.appid
      );
      let device_params = {
        uid: this.userInfo.uid,
        ip: this.$store.state.deviceData.ipAdress,
        os: this.$store.state.deviceData.os,
      };
      let data = {
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        device_params: device_params,
        os: this.$store.state.deviceData.os,
        sign: this.sign,
        time: this.time,
        uid: this.userInfo.uid,
        token: this.userInfo.token,
      };
      this.$http.post(fun.apiDomain_go + "member/token", data).then(
        function (res) {
          if (res.body.data) {
            this.$store.dispatch("IsInfoFun", res.body.data.isInfo);
            this.$store.dispatch("IsApplyPrizeFun", res.body.data.isApplyPrize);
          }
          if (res.body.code === 200) {
          } else {
            this.$toast.text(res.body.msg);
            localStorage.removeItem("userInfo");
            this.reload();
          }
        },
        function (res) {}
      );
    },
    //获取是否第一次登陆用于判断浮标是否带红点
    isFirstLogin() {
      if (!this.userInfo.uid) {
        return false;
      }
      var time = new Date().getTime();
      var sign = hex_md5(
        this.adid +
          this.agentId +
          this.appid +
          (this.userInfo.uid ? this.userInfo.uid : time) +
          time +
          "d76f8025623554b843631ee676a9b8c5"
      );
      var data = {
        userId: this.userInfo.uid,
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        dateTime: time,
        type: 1,
        sign: sign,
      };
      this.$http
        .post(fun.apiDomain + "sdk/new/getSdkRedLogs", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.isFirstLoginData = res.body.data;
            this.$store.commit("isFirstLoginData", res.body.data);
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    isLogoRed() {
      if (!this.userInfo.uid) {
        return false;
      }
      var time = new Date().getTime();
      var sign = hex_md5(
        this.adid +
          this.agentId +
          this.appid +
          (this.userInfo.uid ? this.userInfo.uid : time) +
          time +
          "d76f8025623554b843631ee676a9b8c5"
      );
      var data = {
        userId: this.userInfo.uid,
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        dateTime: time,
        type: 1,
        sign: sign,
        sdkType: 1,
        serverId: this.serviceInfo ? this.serviceInfo.serverID : "",
      };
      this.$http
        .post(fun.apiDomain + "sdk/new/isShowRedpoint", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.$store.commit("logoRedData", res.body.data);
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    postRedStatus() {
      var time = new Date().getTime();
      var sign = hex_md5(
        this.adid +
          this.agentId +
          this.appid +
          (this.userInfo.uid ? this.userInfo.uid : time) +
          time +
          "d76f8025623554b843631ee676a9b8c5"
      );
      var data = {
        userId: this.userInfo.uid,
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        redType: 0,
        dateTime: time,
        type: 1,
        sign: sign,
      };
      this.$http
        .post(fun.apiDomain + "sdk/new/addSdkRedLog", data)
        .then(function (res) {
          if (res.body.code == 200) {
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    //获取新消息数量用于判断浮标是否带红点
    getNews() {
      if (!this.userInfo.uid) {
        return false;
      }
      var time = new Date().getTime();
      var sign = hex_md5(
        this.adid +
          this.agentId +
          this.appid +
          (this.userInfo.uid ? this.userInfo.uid : time) +
          time +
          "d76f8025623554b843631ee676a9b8c5"
      );
      var data = {
        userId: this.userInfo.uid,
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        dateTime: time,
        type: 1,
        sign: sign,
      };
      this.$http
        .post(fun.apiDomain + "sdk/new/getAllRedPoint", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.redCountData = res.body.data;
            this.$store.commit("redCountData", res.body.data);
          }
        });
    },
 
    //复制公众
    copy() {
      let _this = this;
      let btn = this.$refs.btn;
      var clipboard = new Clipboard(btn);
      clipboard.on("success", function (e) {
        _this.$toast.text("已复制");
      });
    },
    //配合活动页面的角色变化上报
    postActiveRole(roleData) {
      var time = new Date().getTime();
      var sign = hex_md5(
        this.adid +
          this.agentId +
          this.appid +
          (this.userInfo.uid ? this.userInfo.uid : time) +
          time +
          "d76f8025623554b843631ee676a9b8c5"
      );
      let data = {
        activityId: localStorage.getItem("activeId")
          ? localStorage.getItem("activeId")
          : "",
        userId: this.userInfo.uid ? this.userInfo.uid : "",
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        dataType: roleData.dataType,
        roleId: roleData.roleID,
        roleName: roleData.roleName,
        roleCreateTime: roleData.roleCreateTime,
        roleLevel: roleData.roleLevel,
        serverId: roleData.serverID,
        serverName: roleData.serverName,
        dateTime: time,
        type: 1,
        sign: sign,
      };
      this.$http
        .post(fun.center + "activity/reportStandardsDetails", data)
        .then(function (res) {
          if (res.body.code == 200) {
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    //页面刷新
    innerReload() {
      this.isLogoRed();
    },
    //查询是否开启防沉迷系统
    getAddictionOpen() {
      //此处应该根据用户登陆后的实名状态判断是否继续执行，已实名则不请求改接口
      var _this = this;
      if (!_this.userInfo.uid || this.userInfo.fcm == "1") {
        return;
      }
      var data = {
        adid: _this.adid,
        id: _this.userInfo.uid,
      };
      _this.$http.post(fun.apiDomain_go + "member/checkFCMState", data).then(
        function (res) {
          if (res.body.code == 200) {
            var data = res.body.data;
            if (data.isLonginFCM && !data.isUserFCM) {
              _this.$store.dispatch("IsRealNameTipFun", true);
            } else if (data.isLonginFCM && data.isUserFCM && !data.isAdult) {
            }
            _this.isUserFCM = res.body.data.isUserFCM;
            _this.isLonginFCM = res.body.data.isLonginFCM;
            _this.isPayFCM = res.body.data.isPayFCM;
            _this.isAdult = res.body.data.isAdult;
          }
        },
        function (res) {
          this.$toast.text(res.body.msg);
        }
      );
    },
    //查询指定用户的在线时间
    getUserOnLineTime() {
      var _this = this;
      if (
        !_this.userInfo.uid ||
        _this.userInfo.fcm == "1" ||
        this.isLonginFCM == 0
      ) {
        return false;
      }
      var data = {
        adid: _this.adid,
        id: _this.userInfo.uid,
      };
      _this.$http.post(fun.apiDomain_go + "member/checkFCMTime", data).then(
        function (res) {
          if (res.body.code == 200 && res.body.data) {
            var data = res.body.data;
            if (data.overTime != "0" && this.overTip != data.overTime) {
              if (
                _this.isLonginFCM &&
                !_this.isUserFCM &&
                _this.userInfo.fcm != "1"
              ) {
                if (!_this.$store.state.winType.isRealNameForm) {
                  _this.$store.dispatch("IsRealNameTipFun", false);
                  _this.$store.dispatch("IsRelieveTiredTipFun", true);
                  _this.$store.commit("postFcmOverTime", data.overTime);
                  _this.overTip = data.overTime;
                }
              } else if (
                _this.isLonginFCM &&
                _this.isUserFCM &&
                !_this.isAdult
              ) {
                _this.$store.dispatch("IsTiredTipFun", true);
                _this.overTip = data.overTime;
              }
            }
            this.$store.commit("postFcmLoginTime", data.overTime);
          } else {
            this.$toast.text(res.body.msg);
          }
        },
        function (res) {
          this.$toast.text(res.body.msg);
        }
      );
    },
  },
};
</script>

<style  lang="scss" scoped>
@mixin flex_box(
  $flex-direction: row,
  $justify-content: none,
  $align-items: none
) {
  display: flex;
  flex-direction: $flex-direction;
  justify-content: $justify-content;
  align-items: $align-items;
}
body,
p {
  margin: 0;
  padding: 0;
}
#inner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 遮罩层  */
.maskInfo {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  background: rgba(0, 0, 0, 0.75);
}
.reconiseInfoWin {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
.logoIcon {
  // width: 50px;
  // height: 50px;
  position: fixed;
  @include flex_box(column, center, stretch);
  z-index: 111;
  img {
    width: 60px;
    // height: 50px;
  }
}
.hideLogo {
  width: 20px;
  position: fixed;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  z-index: 111;
  img {
    width: 25px;
    height: 41px;
  }
}
.pointBox {
  width: 140px;
  position: fixed;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-box-align: center;

  img {
    width: 140px;
    height: 140px;
  }
}
@media all and (orientation: landscape) {
  .logoIcon,
  .hideLogo {
    top: 5%;
    left: 0;
  }
  .pointBox {
    top: 5%;
    left: 0;
    margin-top: -51px;
  }
  .pointBox2 {
    left: 2%;
  }
  .maskInfo {
    align-items: flex-start;
    justify-content: center;
  }
  /* 退出弹窗遮罩层  */
  .closeWinShade {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.75);
  }
  /* 退出提示弹窗 */
  .closeWinBox {
    width: 5.22rem;
    height: 4.69rem;
    position: relative;
    background: #fff;
    border-radius: 0.2rem;
    font-size: 0.14rem;
    @include flex_box(column, space-between, stretch);
  }
  .closeWinTitle,
  .closeWinBtn_l,
  .closeWinBtn_r {
    @include flex_box(row, center, center);
  }
  .closeWinTitle {
    height: 0.8rem;
    background-color: #f35c14;
    border-radius: 0.2rem 0.2rem 0 0;
  }
  .closeWinTitle span {
    color: #fff;
    font-size: 0.22rem;
  }
  .closeWinContent {
    flex: 1;
    @include flex_box(column, space-between, center);
  }
  .closeWinCopy {
    display: flex;
    font-size: 0.14rem;
    color: #ff0000;
    height: 0.34rem;
    line-height: 0.34rem;
  }
  .closeWinCopy span {
    color: #333;
    font-size: 0.14rem;
    color: #ff0000;
    padding-left: 0.2rem;
    height: 0.34rem;
    line-height: 0.34rem;
  }
  .closeWinHint {
    @include flex_box(column, none, center);
  }
  .closeWinHint span {
    color: #333;
    font-size: 0.14rem;
  }
  .closeWinQrCode {
    @include flex_box(row, center, center);
  }
  .closeWinQrCode img {
    width: 2.2rem;
  }
  .closeWinBtn {
    height: 0.7rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    border-top: 1px solid #ccc;
    border-radius: 0 0 0.1rem 0.1rem;
  }
  .closeWinBtn_l,
  .closeWinBtn_r {
    flex: 1;
  }
  .closeWinBtn_l span,
  .closeWinBtn_r span {
    font-size: 0.24rem;
  }
  .closeWinBtn_r {
    border-left: 1px solid #ccc;
  }
  .closeWinBtn_l span {
    color: #333;
  }
  .closeWinBtn_r span {
    color: #f35c14;
  }
}
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .logoIcon,
  .hideLogo {
    top: 25%;
    left: 0;
  }
  .pointBox {
    top: 25%;
    left: 0;
    margin-top: -51px;
  }
  .pointBox2 {
    left: 4%;
  }
  .maskInfo {
    align-items: center;
    justify-content: flex-end;
  }
  /* 退出弹窗遮罩层  */
  .closeWinShade {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.75);
  }
  /* 退出提示弹窗 */
  .closeWinBox {
    width: 6.35rem;
    height: 5.7rem;
    position: relative;
    background: #fff;
    border-radius: 0.2rem;
    font-size: 0.14rem;
    @include flex_box(column, space-between, stretch);
  }
  .closeWinTitle,
  .closeWinBtn_l,
  .closeWinBtn_r {
    @include flex_box(row, center, center);
  }
  .closeWinTitle {
    height: 0.8rem;
    background-color: #f35c14;
    border-radius: 0.2rem 0.2rem 0 0;
  }
  .closeWinTitle span {
    color: #fff;
    font-size: 0.32rem;
  }
  .closeWinContent {
    flex: 1;
    @include flex_box(column, space-around, center);
  }
  .closeWinCopy {
    display: flex;
    font-size: 0.18rem;
    color: #ff0000;
    height: 0.34rem;
    line-height: 0.34rem;
  }
  .closeWinCopy span {
    color: #333;
    font-size: 0.18rem;
    color: #ff0000;
    padding-left: 0.2rem;
    height: 0.34rem;
    line-height: 0.34rem;
  }
  .closeWinHint {
    @include flex_box(column, none, center);
  }
  .closeWinHint span {
    color: #333;
    font-size: 0.14rem;
  }
  .closeWinQrCode {
    padding: 0.05rem 0;
    @include flex_box(row, center, center);
  }
  .closeWinQrCode img {
    width: 2.6rem;
  }
  .closeWinBtn {
    height: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    border-top: 1px solid #ccc;
    border-radius: 0 0 0.1rem 0.1rem;
  }
  .closeWinBtn_l,
  .closeWinBtn_r {
    flex: 1;
  }
  .closeWinBtn_l span,
  .closeWinBtn_r span {
    font-size: 0.24rem;
  }
  .closeWinBtn_r {
    border-left: 1px solid #ccc;
  }
  .closeWinBtn_l span {
    color: #333;
  }
  .closeWinBtn_r span {
    color: #f35c14;
  }
}
/* safari浏览器引导添加到主屏 */
.safari-float {
  position: fixed;
  bottom: 0px;
  left: 10%;
  width: 220px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 4px;
}

.isSafari-browser::after {
  display: block;
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 10px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.6) transparent transparent transparent;
}
.safari-float .safari-logo {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  vertical-align: top;
}

.safari-float .safari-tips {
  display: inline-block;
  padding: 4px 0 0 4px;
}

.safari-float .safari-tips p {
  font-size: 14px;
  color: white;
  line-height: 1.5;
}

.safari-float .safari-tips p img {
  width: 18px;
  height: 18px;
  margin-left: 4px;
  position: relative;
  top: 4px;
}

.safari-float .safari-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  @include flex_box(row, center, center);
}

.safari-float .safari-close img {
  width: 12px;
  height: 12px;
}
</style>
