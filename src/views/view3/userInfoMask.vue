<template>
  <div class="userInfoMask winBox">
    <div class="header" v-if="showType == 'vertical'">
      <div class="header_Icon" @click="outHeader">
        <img :src="userData.header" v-if="isOutHeader" alt />
        <img :src="userData.header" v-else alt />
      </div>
      <div class="header_r">
        <span class="header_uname">账号:{{ userInfo.uname }}</span>
        <div class="header_r_m">
          <span class="header_r_m_l">用户ID:{{ userInfo.uid }}</span>
          <span class="header_r_m_r" @click="toGameCenterRecharge">
            充值游币>>
          </span>
        </div>
        <div class="header_r_b">
          <div class="header_member" @click="openMember">
            <span>开通会员</span>
          </div>
          <span class="header_coupon">剩余游币:{{ gameCurrency }}</span>
        </div>
      </div>
    </div>
    <div class="header" v-if="showType == 'across'">
      <div class="header_Icon" @click="outHeader">
        <img :src="userData.header" v-if="isOutHeader" alt />
        <img :src="userData.header" v-else alt />
      </div>
      <div class="header_r">
        <div class="header_r_t">
          <span class="header_uname">账号:{{ userInfo.uname }}</span>
          <span class="header_uname">用户ID:{{ userInfo.uid }}</span>
          <span class="header_coupon">剩余游币:{{ gameCurrency }}</span>
        </div>
        <div class="header_r_b">
          <div class="header_r_b_t">
            <span>开通会员</span>
          </div>
          <div class="header_r_b_b" @click="toGameCenterRecharge">
            <span>充值游币>></span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="list">
        <div class="listItem" @click="toEmail">
          <img class="dataIcon" :src="messageIcon" alt />
          <span class="dataTitle">我的消息</span>
          <div class="redDot" v-if="redCountData.emailCount > 0">
            <span>{{ redCountData.emailCount }}</span>
          </div>
        </div>
        <div class="listItem" @click="toAccount">
          <img class="dataIcon" :src="account_icon" alt />
          <span class="dataTitle">账号</span>
          <div
            class="redDot"
            v-if="
              isFirstLoginData.mobileBind == 0 &&
              userInfo.bindPhone != '1' &&
              $store.state.isBindPhone != '1'
            "
          >
            <span>1</span>
          </div>
        </div>
        <div class="listItem" @click="toGameCenter">
          <img class="dataIcon" :src="gameIcon" alt />
          <span class="dataTitle">游戏中心</span>
        </div>
        <div class="listItem" @click="toWechat">
          <img class="dataIcon" :src="wechatIcon" alt />
          <span class="dataTitle">公众号</span>
          <div class="redDot" v-if="isFirstLoginData.officialAccount == 0">
            <span>1</span>
          </div>
        </div>
        <div class="listItem" @click="toCustomerService">
          <img class="dataIcon" :src="serviceIcon" alt />
          <span class="dataTitle">联系客服</span>
        </div>
      </div>
      <div class="tipBox" @click="toWechat" v-if="newestMessage.title">
        <span class="tip">{{ newestMessage.title }}</span>
      </div>
      <div class="borBottom" v-if="showType == 'vertical'"></div>
    </div>
    <div class="userInfoMaskSub" @click="loginOut">
      <span>切换账号</span>
    </div>
    <div class="outWin" @click="back">
      <img :src="outIcon" alt />
    </div>
    <div class="serviceWin" v-if="isServiceWin">
      <iframe
        :width="$store.state.iframeSize.m_w"
        :height="$store.state.iframeSize.m_h"
        :src="kefuHref"
      ></iframe>
      <div class="serviceWinBox" @click="closeServiceWin">
        <img :src="closeImgWhite" />
      </div>
    </div>
  </div>
</template>

<script>
import fun from "@/common/js/common.js";
import { hex_md5 } from "@/common/js/md5.js";

export default {
  name: "userInfoMask",
  inject: ["reload", "innerReload", "updateLogoType"], //注入App里的reload方法
  data() {
    return {
      appid: "",
      agentId: "",
      adid: "",
      redCountData: {},
      isServiceWin: false,
      isOutHeader: true,
      userData: {
        // header: require("../../assets/img/logo.png"), //海象logo
        header: require("../../assets/img/cmLogo.png"), //草莓logo
        // header: require("../../assets/img/hmLogo.png"), //虹猫logo
      },
      userInfo: {},
      showType: "vertical",
      newestMessage: {},
      outIcon: require("../../assets/img/out.png"),
      messageIcon: require("../../assets/img/message.png"),
      walletIcon: require("../../assets/img/wallet.png"),
      couponIcon: require("../../assets/img/coupon.png"),
      gameIcon: require("../../assets/img/game.png"),
      cardIcon: require("../../assets/img/card.png"),
      wechatIcon: require("../../assets/img/wechat.png"),
      bindPhoneIcon: require("../../assets/img/bindPhone.png"),
      serviceIcon: require("../../assets/img/service.png"),
      closeImgWhite: require("../../assets/img/close.png"),
      account_icon: require("../../assets/img/account_icon.png"),

      serviceInfo: {},
      kefuHref: "",
      isFirstLoginData: {}, //是否第一次登录
      gameCurrency: "", //游戏币
      gameData: "", //游戏信息
      memberMsg: "",
    };
  },
  created() {
    //   this.getSize()
  },
  mounted() {
    var _this = this;
    this.userInfo =
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};
    this.serviceInfo = localStorage.getItem("serviceInfo")
      ? JSON.parse(localStorage.getItem("serviceInfo"))
      : {};
    this.appid = localStorage.getItem("appid")
      ? localStorage.getItem("appid")
      : "";
    this.adid = localStorage.getItem("adid")
      ? localStorage.getItem("adid")
      : "";
    this.agentId = localStorage.getItem("agentId")
      ? localStorage.getItem("agentId")
      : "";
    this.gameData = localStorage.getItem("gameData")
      ? localStorage.getItem("gameData")
      : "";
    this.gameCurrency = this.$store.state.gameCurrency;
    this.memberMsg = localStorage.getItem("memberMsg")
      ? JSON.parse(localStorage.getItem("memberMsg"))
      : "";
    
    window.addEventListener("resize", function () {
      _this.getShowType();
    });

    this.getNews();
    this.getShowType();
    this.isFirstLogin();

    if (this.$store.state.deviceData.isPC == "1") {
      this.kefuHref =
        "https://liulian.sobot.com/chat/pc/v2/index.html?sysnum=4320d7c716434025bbc81cac3481b269&channelid=3";
    } else {
      this.kefuHref =
        "https://liulian.sobot.com/chat/h5/v2/index.html?sysnum=4320d7c716434025bbc81cac3481b269&channelid=5";
    }
    var accounut = this.userInfo.uname ? this.userInfo.uname : "";
    var roleid = this.serviceInfo.roleId ? this.serviceInfo.roleId : "";
    var rolename = this.serviceInfo.roleName ? this.serviceInfo.roleName : "";
    var serverName = this.serviceInfo.serverName
      ? this.serviceInfo.serverName
      : "";
    var role_level = this.serviceInfo.roleLevel
      ? this.serviceInfo.roleLevel
      : "";
    var game_id = this.serviceInfo.gameId ? this.serviceInfo.gameId : "";
    var time = fun.formDate(new Date().getTime());
    var qqParams = {
      公司名称: "流连游戏",
      账号: accounut,
      角色id: roleid,
      角色名称: rolename,
      角色区服: serverName,
      角色等级: role_level,
      分包id: this.appid,
      联系时间: time,
      广告位: this.adid,
      游戏: this.memberMsg ? this.memberMsg.gameName : "",
      登录IP: this.memberMsg.ip ? this.memberMsg.ip : "",
      是否VIP: this.memberMsg.isVip ? this.memberMsg.isVip : 0,
      累计充值: this.memberMsg.tolMoney ? this.memberMsg.tolMoney : 0,
    };

    qqParams = fun.ch2Unicdoe(JSON.stringify(qqParams));
    this.kefuHref =
      this.kefuHref + "&partnerid=" + this.userInfo.uid + "&params=" + qqParams;
  },
  methods: {
    //游戏中心
    toGameCenterRecharge() {
      let url = "http://web.bingxuer.com/#/recharge?";
      this.toGameCenterFun(url);
    },
    toGameCenter() {
      let url = "http://web.bingxuer.com/#/home?";
      this.toGameCenterFun(url);
    },
    toGameCenterFun(url) {
      let time = new Date().getTime();
      var sign = hex_md5(this.userInfo.uid ? this.userInfo.uid : "" + time);
      var device_params = {
        os: localStorage.getItem("os") ? localStorage.getItem("os") : "",
      };
      let data = {
        uid: this.userInfo.uid,
        sign: sign,
        time: time,
        os: localStorage.getItem("os") ? localStorage.getItem("os") : "",
        device_params: device_params,
        gameCenterType: localStorage.getItem("type")
          ? localStorage.getItem("type")
          : "1",
        isnuoer: localStorage.getItem("isnuoer")
          ? localStorage.getItem("isnuoer")
          : "0",
      };
      this.$http
        .post(fun.center + "gameCenter/getCenterData", data)
        .then(function (res) {
          if (res.body.code == 200) {
            var userInfo = res.body.data;
            var href =
              url +
              "platform=" +
              userInfo.platform +
              "&uid=" +
              this.userInfo.uid +
              "&game_id=" +
              userInfo.game_id +
              "&channel=" +
              userInfo.channel +
              "&req_time=" +
              userInfo.req_time +
              "&expire_time=" +
              userInfo.expire_time +
              "&access_token=" +
              userInfo.access_token +
              "&type=" +
              userInfo.type +
              "&isnuoer=" +
              userInfo.isnuoer +
              "&phone=" +
              userInfo.bindPhone +
              "&card=" +
              userInfo.fcm +
              "&sign=" +
              userInfo.sign;
            window.location.href = href;
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    back() {
      this.innerReload();
      this.$store.dispatch("IsUserInfoMaskFun", false);
      this.$store.commit("postLogoIconShow", 1);
      this.updateLogoType();
    },
    openMember() {
      this.$toast.text("暂未开放，敬请期待");
    },
    //切换头像
    outHeader() {
      this.isOutHeader = !this.isOutHeader;
    },
    getShowType() {
      if (
        window.orientation == 90 ||
        window.orientation == -90 ||
        (window.screen.orientation && window.screen.orientation.angle == 90) ||
        (window.screen.orientation && window.screen.orientation.angle == -90)
      ) {
        this.showType = "across";
      } else {
        this.showType = "vertical";
      }
    },
    toEmail() {
      this.switchContent("IsEmailFun");
    },
    toWallet() {
      this.$toast.text("暂未开放，敬请期待");
      // if (this.isFirstLoginData.wallet == 0) {
      //   this.postRedStatus(55);
      // }
      // this.$store.commit('clickWallet');
      // this.switchContent("IsWalletFun");
    },
    toCoupon() {
      this.$toast.text("暂未开放，敬请期待");

      // if (this.isFirstLoginData.voucher == 0) {
      //   this.postRedStatus(66);
      // }
      // this.switchContent("IsCouponFun");
      // this.$store.commit('clickVoucher');
    },
    toGame() {
      this.$toast.text("暂未开放，敬请期待");
    },
    toReconiseIn() {
      if (this.userInfo.fcm == "1") {
        this.$toast.text("已实名认证");
      } else {
        this.switchContent("IsReconiseInfoFun");
      }
    },
    toWechat() {
      if (this.isFirstLoginData.officialAccount == 0) {
        this.postRedStatus(22);
      }
      this.switchContent("IsWechatFun");
      this.$store.commit("clickOfficialAccount");
    },
    toBindPhone() {
      if (this.isFirstLoginData.isReport == 0) {
        this.postRedStatus(0);
      }
      this.$store.commit("clickMobileBind");
      this.isFirstLoginData.mobileBind = 1;
      if (
        this.userInfo.bindPhone == "1" ||
        this.$store.state.isBindPhone == "1"
      ) {
        this.$toast.text("已绑定手机");
      } else {
        this.switchContent("IsBindPhoneFun");
      }
    },
    toAccount() {
      this.switchContent("IsAccountFun");
    },
    toCustomerService() {
      this.isServiceWin = true;
    },
    switchContent(name) {
      this.$store.dispatch("IsUserInfoMaskFun", false);
      this.$store.dispatch(name, true);
    },
    closeServiceWin() {
      this.isServiceWin = false;
    },
    isFirstLogin() {
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
      if (this.serviceInfo.serverID) {
        data.serverId = this.serviceInfo.serverID;
      }
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
    postRedStatus(type) {
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
        redType: type,
        dateTime: time,
        type: 1,
        sign: sign,
      };
      this.$http
        .post(fun.apiDomain + "sdk/new/addSdkRedLog", data)
        .then(function (res) {
          if (res.body.code == 200) {
            var status = res.body.data;
            if (status == 1) {
              if (type == 55) {
                this.isFirstLoginData.wallet = 1;
              }
            }
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    getNews() {
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
        serverId: this.serviceInfo.serverID ? this.serviceInfo.serverID : "",
        roleId: this.serviceInfo.roleId ? this.serviceInfo.roleId : "",
      };
      this.$http
        .post(fun.apiDomain + "sdk/new/getAllRedPoint", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.redCountData = res.body.data;
            this.$store.commit("redCountData", res.body.data);
            this.getEmails();
          }
        });
    },
    getEmails() {
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
        pageNum: 1,
        pageSize: 1000,
        roleId: this.serviceInfo.roleId ? this.serviceInfo.roleId : "",
        sign: sign,
      };
      this.$http
        .post(fun.apiDomain + "sdk/new/newsList", data)
        .then(function (res) {
          if (res.body.code == 200) {
            if (res.body.data.length > 0 && res.body.data[0].isRead == "3") {
              this.newestMessage = res.body.data[0].sdkNews;
            }
            this.$store.commit("getEmailData", res.body.data);
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },

    // 退出登陆
    loginOut() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isUploadUserInfo");
      this.$store.dispatch("IsUserInfoMaskFun", false);
      this.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
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
// 正常竖屏样式
@media all and (orientation: portrait) {
  .userInfoMask {
    @include flex_box(column, space-between, stretch);
    background: #fff;
    width: 7.5rem;
    height: 8.69rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem 0.2rem 0 0;
  }
}
// 正常横屏样式
@media all and (orientation: landscape) {
  .userInfoMask {
    @include flex_box(column, space-between, stretch);
    background: #fff;
    width: 6.65rem;
    height: 5.5rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
  }
  .header {
    @include flex_box(row, space-between, center);
    width: 5.9rem;
    min-height: 1.22rem;
    box-sizing: border-box;
    margin: 0 auto;
    border-bottom: 1px solid #efefef;
  }
  .header_Icon {
    width: 0.75rem;
    height: 0.75rem;
    @include flex_box(row, center, center);
    img {
      width: 0.75rem;
    }
  }
  .header_r {
    flex: 1;
    margin: 0 0.2rem 0 0.23rem;
    @include flex_box(row, space-between, center);
  }
  .header_r_t,
  .header_r_b {
    @include flex_box(column, none, none);
  }
  .header_uname {
    font-size: 0.2rem;
    line-height: 0.3rem;
    color: #282b2d;
  }
  .header_coupon {
    font-size: 0.2rem;
    line-height: 0.31rem;
  }
  .header_r_b_t {
    width: 1.6rem;
    height: 0.35rem;
    background-color: #fd3f3f;
    border-radius: 0.1rem;
    @include flex_box(row, center, center);
    span {
      font-size: 0.2rem;
      color: #fff;
      padding-top: 0.02rem;
    }
  }
  .header_r_b_b {
    margin-top: 0.2rem;
    @include flex_box(row, flex-end, center);
    span {
      color: #fc0606;
      font-size: 0.2rem;
    }
  }
  .content {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .list {
    padding: 0.24rem 0;
    @include flex_box(row, none, stretch);
    flex-wrap: wrap;
  }
  .listItem {
    @include flex_box(column, center, center);
    width: 1.66rem;
    height: 1.18rem;
    position: relative;
  }
  .dataIcon {
    width: 0.46rem;
    height: 0.46rem;
  }
  .dataTitle {
    margin-top: 0.05rem;
    font-size: 0.23rem;
    line-height: 0.31rem;
  }
  .redDot {
    position: absolute;
    top: 0.02rem;
    right: 0.42rem;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    @include flex_box(row, center, center);
    background-color: #f35c14;
    span {
      // padding: 0 0.1rem;
      font-size: 0.12rem;
      color: #fff;
    }
  }
  .tipBox {
    @include flex_box(row, center, center);
    padding: 0 0.8rem;
  }
  .tip {
    font-size: 0.23rem;
    line-height: 0.31rem;
    color: #f35c14;
    // text-align: center;
    text-decoration: underline;
  }

  .userInfoMaskSub {
    height: 0.6rem;
    background-color: #f35c14;
    border-radius: 0.1rem;
    width: 5.9rem;
    margin: 0.38rem auto 0.23rem;
    @include flex_box(row, center, center);

    span {
      font-size: 0.23rem;
      color: #fff;
    }
  }
  .outWin {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.6rem;
    height: 0.6rem;
    @include flex_box(row, center, center);
    img {
      width: 0.38rem;
    }
  }
  .serviceWin {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .serviceWinBox {
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;
    width: 0.6rem;
    height: 0.6rem;
    background-color: #aeaeae;
    border-radius: 50%;
    @include flex_box(row, center, center);

    img {
      width: 0.3rem;
    }
  }
}
@media all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .userInfoMask {
    margin: auto;
    @include flex_box(column, space-between, stretch);
    background: #fff;
    width: 7.5rem;
    height: 8.69rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem;
  }
}
// 伪横屏下竖屏样式
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .header {
    @include flex_box(row, space-between, center);
    width: 6.6rem;
    height: 2.16rem;
    box-sizing: border-box;
    margin: 0 auto;
    border-bottom: 1px solid #efefef;
  }
  .header_Icon {
    width: 1.4rem;
    height: 1.4rem;
    @include flex_box(row, center, center);
    img {
      width: 1.4rem;
    }
  }
  .header_r {
    flex: 1;
    margin-left: 0.3rem;
    @include flex_box(column, center, flex-start);
  }
  .header_uname,
  .header_r_m_l {
    font-size: 0.2rem;
    line-height: 0.36rem;
    color: #282b2d;
  }
  .header_r_m {
    width: 100%;
    padding-right: 0.3rem;
    @include flex_box(row, space-between, center);
  }
  .header_r_m_r {
    font-size: 0.24rem;
    line-height: 0.46rem;
    color: #fc0606;
    letter-spacing: 1px;
    text-decoration: underline;
  }
  .header_r_b {
    width: 100%;
    padding-right: 0.3rem;
    margin-top: 0.14rem;
    @include flex_box(row, space-between, center);
  }
  .header_member {
    margin-right: 0.27rem;
    width: 1.99rem;
    height: 0.43rem;
    background-color: #fd3f3f;
    border-radius: 0.1rem;
    @include flex_box(row, center, center);
    span {
      font-size: 0.2rem;
      color: #fff;
    }
  }
  .header_coupon {
    // margin-left: 0.27rem;
    font-size: 0.24rem;
  }
  .content {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .list {
    padding: 0.12rem 0;
    @include flex_box(row, none, stretch);
    flex-wrap: wrap;
  }
  .listItem {
    @include flex_box(column, center, center);
    width: 1.87rem;
    height: 1.9rem;
    position: relative;
  }
  .dataIcon {
    width: 0.56rem;
    height: 0.56rem;
  }
  .dataTitle {
    margin-top: 0.2rem;
    font-size: 0.28rem;
    line-height: 0.37rem;
  }
  .redDot {
    position: absolute;
    top: 0.18rem;
    right: 0.46rem;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    @include flex_box(row, center, center);
    background-color: #f35c14;
    span {
      // padding: 0 0.1rem;
      font-size: 0.12rem;
      color: #fff;
    }
  }
  .tipBox {
    @include flex_box(row, center, center);
    padding: 0 0.8rem;
  }
  .tip {
    line-height: 0.37rem;
    font-size: 0.28rem;
    color: #f35c14;
    // text-align: center;
    text-decoration: underline;
  }
  .borBottom {
    width: 6.59rem;
    height: 1px;
    background-color: #efefef;
    margin: 0.36rem auto 0;
  }
  .userInfoMaskSub {
    height: 0.72rem;
    background-color: #f35c14;
    border-radius: 0.1rem;
    width: 6.59rem;
    margin: 0.38rem auto 0.63rem;
    @include flex_box(row, center, center);

    span {
      font-size: 0.28rem;
      color: #fff;
    }
  }
  .outWin {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.8rem;
    height: 0.8rem;
    @include flex_box(row, center, center);
    img {
      width: 0.47rem;
    }
  }
  .serviceWin {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .serviceWinBox {
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;
    width: 0.6rem;
    height: 0.6rem;
    background-color: #aeaeae;
    border-radius: 50%;
    align-items: center;
    @include flex_box(row, center, center);

    img {
      width: 0.3rem;
    }
  }
}
</style>
