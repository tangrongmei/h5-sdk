<template>
  <div class="loginBox">
    <div class="loginBoxTitle">
      <img :src="logoIcon" alt />
    </div>
    <div class="loginType">
      <div class="loginTypeItem" @click="toFreeLogin">
        <div class="loginTypeItemIcon">
          <img :src="speed" alt />
          <!-- <div class="redDot"></div> -->
        </div>
        <span>快速登录</span>
      </div>
      <div class="loginTypeItem" @click="toPhoneLogin">
        <div class="loginTypeItemIcon">
          <img :src="phone" alt />
          <div class="redDot"></div>
        </div>
        <span class="colorRed">手机登录</span>
      </div>
      <div class="loginTypeItem" @click="toPassWordLogin">
        <div class="loginTypeItemIcon">
          <img :src="userInfoIcon" alt />
          <!-- <div class="redDot"></div> -->
        </div>
        <span>账号登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { hex_md5 } from "@/common/js/md5.js";
import fun from "@/common/js/common.js";
export default {
  name: "loginBox",
  inject: ["reload"], //注入App里的reload方法

  data() {
    return {
      clientWidth: "",
      // logoIcon: require("../../assets/img/logo.png"),//海象logo
      // logoIcon: require("../../assets/img/cmLogo.png"), //草莓logo
      logoIcon: require("../../assets/img/hmLogo.png"), //虹猫logo

      speed: require("../../assets/img/speed.png"),
      phone: require("../../assets/img/phone.png"),
      userInfoIcon: require("../../assets/img/userInfo.png"),
      adid: "", // 广告id
      agentId: "", // 渠道id
      appid: "", // appid
      regType:0,
      device_params: {
        os: "",
        uuid: "",
        idfa: "",
      },
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

    this.device_params.uuid = localStorage.getItem("uuid")
      ? localStorage.getItem("uuid")
      : "";
    this.device_params.os = localStorage.getItem("os")
      ? localStorage.getItem("os")
      : "";
    this.device_params.idfa = localStorage.getItem("idfa")
      ? localStorage.getItem("idfa")
      : "";
  },
  methods: {
    toPhoneLogin() {
      this.$store.dispatch("IsLoginBoxFun", false);
      this.$store.dispatch("IsPhoneLoginFun", true);
    },
    toPassWordLogin() {
      this.$store.dispatch("IsLoginBoxFun", false);
      this.$store.dispatch("IsPassWordLoginFun", true);
    },
    toFreeLogin() {
      if(this.regType){
        return false;
      }else{
        this.regType = 1;
      }
      this.time = new Date().getTime();
      this.sign = hex_md5(
        this.userInfo.uid
          ? this.userInfo.uid
          : "" + this.agentId + this.adid + this.time + this.appid
      );

      let data = {
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        sign: this.sign,
        time: this.time,
        os: this.device_params.os,
        device_params: this.device_params,
        reg_type: "0",
      };
      this.$http
        .post(fun.apiDomain_go + "member/tourist", data)
        .then(function (res) {
          this.regType = 0;
          if (res.body.code === 200) {
            this.$toast.text(res.body.msg);
            this.$store.commit("getIsBindPhone", res.body.data.bindPhone);
            this.$store.dispatch("IsLoginBoxFun", false);
            localStorage.setItem("userInfo", JSON.stringify(res.body.data));
            this.$store.commit("postRegisterPwd", res.body.data.pwd);
            this.$store.dispatch("IsAccountAndPasFun", true);
            let _this = this;
            setTimeout(function () {
              _this.$store.dispatch("IsAccountAndPasFun", false);
              _this.$store.commit("postLogoIconShow", 1);
              _this.reload();
            }, 5000);
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

@media all and (orientation: landscape) {
  .loginBox {
    margin: auto;
    background: #fff;
    border-radius: 0.4rem;
    height: 4.68rem;
    width: 5.2rem;
    border-radius: 0.2rem;
    padding: 0.56rem 0 0.86rem 0;
    box-sizing: border-box;
    @include flex_box(column, space-between, center);
  }
  .loginBoxTitle {
    @include flex_box(column, center, center);
    img {
      width: 1.48rem;
    }
  }
  .loginType {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.28rem;
    @include flex_box(row, none, center);
  }
  .loginTypeItem {
    flex: 1;
    @include flex_box(column, center, center);
    span {
      font-size: 0.28rem;
      line-height: 0.37rem;
      color: #909090;
      margin-top: 0.23rem;
    }
    .colorRed {
      color: #fd3f3f;
    }
  }
  .loginTypeItemIcon {
    @include flex_box(row, center, center);
    position: relative;
    img {
      width: 0.6rem;
    }
    .redDot {
      position: absolute;
      right: 0.03rem;
      top: -0.1rem;
      width: 0.23rem;
      height: 0.23rem;
      background-color: #fd3f3f;
      border-radius: 50%;
    }
  }
}
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .loginBox {
    background: #fff;
    width: 6.34rem;
    height: 5.69rem;
    border-radius: 0.4rem;
    padding: 0.68rem 0 1.06rem 0;
    box-sizing: border-box;
    margin: auto;
    @include flex_box(column, space-between, space-between);
  }
  .loginBoxTitle {
    @include flex_box(column, center, center);
    img {
      width: 1.8rem;
      // width: 1.6rem;
    }
  }
  .loginType {
    width: 100%;
    box-sizing: border-box;
    margin-top: 0.78rem;
    padding: 0 0.36rem;
    @include flex_box(row, none, st);
  }
  .loginTypeItem {
    flex: 1;
    @include flex_box(column, none, center);
    span {
      font-size: 0.24rem;
      line-height: 0.32rem;
      color: #909090;
      margin-top: 0.29rem;
    }
    .colorRed {
      color: #fd3f3f;
    }
  }
  .loginTypeItemIcon {
    @include flex_box(column, center, center);
    position: relative;
    img {
      width: 0.74rem;
    }
    .redDot {
      position: absolute;
      right: 0.05rem;
      top: -0.1rem;
      width: 0.27rem;
      height: 0.27rem;
      background-color: #fd3f3f;
      border-radius: 50%;
    }
  }
}
</style>