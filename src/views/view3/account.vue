<template>
  <div class="account">
    <div class="wechatTitle">
      <div class="wechatTitle_l">
        <span>账号</span>
      </div>
    </div>
    <div class="accountContent">
      <div class="content_item">
        <div class="content_item_l">
          <img :src="pwd_icon" alt="" />
          <span>修改密码</span>
        </div>
        <div class="content_item_r" @click="toAlertPwd">
          <span>前往</span>
        </div>
      </div>
      <div class="bor_bot"></div>
      <div class="content_item">
        <div class="content_item_l">
          <img :src="bind_phone" alt="" />
          <span>{{
            userInfo.bindPhone == "1" || $store.state.isBindPhone == "1"
              ? "已绑定手机"
              : "手机绑定"
          }}</span>
        </div>
        <div class="content_item_r" @click="toBindPhone">
          <span>前往</span>
        </div>
      </div>
      <div class="bor_bot"></div>
      <div class="content_item">
        <div class="content_item_l">
          <img :src="realName_icon" alt="" />
          <span>{{ userInfo.fcm == "1" ? "已实名认证" : "实名认证" }}</span>
        </div>
        <div class="content_item_r" @click="toPostRealName">
          <span>前往</span>
        </div>
      </div>
    </div>
    <div class="userInfoMaskSub" @click="loginOut">
      <span>切换账号</span>
    </div>
    <div class="outWin" @click="back">
      <img :src="outIcon" alt />
    </div>
  </div>
</template>

<script>
import { hex_md5 } from "@/common/js/md5";
import fun from "@/common/js/common";
export default {
  name: "account",
  inject: ["reload"],
  data() {
    return {
      header: require("../../assets/img/header.png"),
      outIcon: require("../../assets/img/out.png"),
      realName_icon: require("../../assets/img/realName_icon.png"),
      bind_phone: require("../../assets/img/bind_phone.png"),
      pwd_icon: require("../../assets/img/pwd_icon.png"),
      userInfo: "",
      adid:"",
      appid:"",
      agentId:""
    };
  },
  created() {
    //   this.getSize()
  },
  mounted() {
    this.userInfo =
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
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
  },
  methods: {
    back() {
      this.$store.dispatch("IsAccountFun", false);
      this.$store.dispatch("IsUserInfoMaskFun", true);
    },
    toAlertPwd() {
      this.$store.dispatch("IsAccountFun", false);
      this.$store.dispatch("IsAlertPwdFun", true);
    },
    toBindPhone() {
      if (this.$store.state.isFirstLoginData.isReport == 0) {
        this.postRedStatus(0);
      }
      this.$store.commit("clickMobileBind");
      this.$store.state.isFirstLoginData.mobileBind = 1;
      if (
        this.userInfo.bindPhone == "1" ||
        this.$store.state.isBindPhone == "1"
      ) {
        this.$toast.text("已绑定手机");
      } else {
        this.$store.dispatch("IsAccountFun", false);
        this.$store.dispatch("IsBindPhoneFun", true);
      }
    },
    toPostRealName() {
      if (this.userInfo.fcm == "1") {
        this.$toast.text("已实名认证");
      } else {
        this.$store.dispatch("IsAccountFun", false);
        this.$store.dispatch("IsReconiseInfoFun", true);
      }
    },
    // 退出登陆
    loginOut() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isUploadUserInfo");
      this.$store.dispatch("IsAccountFun", false);
      this.reload();
    },
    //上报绑定手机点击情况
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
        redType: "0",
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

// 正常竖屏样式
@media all and (orientation: portrait) {
  .account {
    background: #fff;
    width: 7.5rem;
    height: 8.69rem;
    padding: 0 0.45rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem 0.2rem 0 0;
    @include flex_box(column, none, stretch);
  }
}
// 正常横屏样式
@media all and (orientation: landscape) {
  .account {
    background: #fff;
    width: 6.65rem;
    height: 6rem;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, space-between, stretch);
  }
  .wechatTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    height: 1.02rem;
  }
  .wechatTitle_l {
    @include flex_box(row, none, center);
    height: 0.4rem;
    border-left: 0.06rem solid #f35c14;
    padding-left: 0.16rem;
    span {
      font-size: 0.28rem;
      color: #282b2d;
    }
  }
  .accountContent {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .bor_bot {
    height: 1px;
    background: #efefef;
  }
  .content_item {
    flex: 1;
    height: 1.2rem;
    @include flex_box(row, space-between, center);
  }
  .content_item_l {
    padding-left: 0.26rem;
    @include flex_box(row, none, center);
    img {
      width: 0.7rem;
      height: 0.7rem;
    }
    span {
      margin-left: 0.54rem;
      font-size: 0.3rem;
      font-weight: bold;
      color: #282b2d;
    }
  }
  .content_item_r {
    width: 1.4rem;
    background: #f35c14;
    border-radius: 4px;
    @include flex_box(row, center, center);
    height: 0.5rem;
    span {
      font-size: 0.2rem;
      color: #ffffff;
    }
  }
  .userInfoMaskSub {
    height: 0.6rem;
    background-color: #f35c14;
    border-radius: 0.1rem;
    width: 5.9rem;
    margin: 0.23rem auto;
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
    width: 1.12rem;
    height: 1.02rem;
    @include flex_box(row, center, center);
    img {
      width: 0.38rem;
    }
  }
}
@media all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .account {
    background: #fff;
    width: 7.5rem;
    height: 8.69rem;
    padding: 0 0.45rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem;
    margin: auto;
    @include flex_box(column, none, stretch);
  }
}
// 伪横屏下竖屏样式
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .wechatTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    height: 1.23rem;
  }
  .wechatTitle_l {
    @include flex_box(row, none, center);
    height: 0.53rem;
    border-left: 0.08rem solid #f35c14;
    padding-left: 0.22rem;
    span {
      font-size: 0.38rem;
      color: #282b2d;
    }
  }
  .accountContent {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .bor_bot {
    height: 1px;
    background: #efefef;
  }
  .content_item {
    height: 1.88rem;
    @include flex_box(row, space-between, center);
  }
  .content_item_l {
    padding-left: 0.26rem;
    @include flex_box(row, none, center);
    img {
      width: 0.9rem;
      height: 0.9rem;
    }
    span {
      margin-left: 0.54rem;
      font-size: 0.3rem;
      font-weight: bold;
      color: #282b2d;
    }
  }
  .content_item_r {
    width: 1.4rem;
    background: #f35c14;
    border-radius: 4px;
    @include flex_box(row, center, center);
    height: 0.5rem;
    span {
      font-size: 0.2rem;
      color: #ffffff;
    }
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
    width: 1.36rem;
    height: 1.23rem;
    @include flex_box(row, center, center);
    img {
      width: 0.47rem;
    }
  }
}
</style>