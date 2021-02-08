<template>
  <div class="phoneLogin">
    <div class="phoneLoginTitle">
      <img :src="header" alt />
    </div>
    <div class="phoneBox">
      <div class="phoneItem">
        <div class="phoneItem_l">
          <span class="phoneItem_lText">+86</span>
          <input
            class="phoneItem_lInput input_right"
            onkeyup="this.value=this.value.replace(/\D/g,'')"
            onafterpaste="this.value=this.value.replace(/\D/g,'')"
            type="text"
            maxlength="11"
            name="mobile"
            v-model="mobile"
            placeholder="手机登录免注册"
          />
        </div>
      </div>

      <div class="phoneItem">
        <div class="phoneItem_l">
          <input
            class="phoneItem_lInput codeInput"
            maxlength="6"
            type="text"
            name="code"
            v-model="code"
            placeholder="请输入手机验证码"
          />
        </div>
        <div
          class="phoneItem_right"
          @click="getCode"
          :disabled="countdownTime < 60 && countdownTime >= 1"
        >
          <span>{{
            countdownTime < 60 && countdownTime >= 1
              ? `${countdownTime}秒后可重发`
              : "获取验证码"
          }}</span>
        </div>
      </div>
      <div class="passWordItem2">
        <div class="toRegister" @click="toRegister"><span>立即注册</span></div>
        <div class="cutType" @click="toPassWordLogin">
          <span>密码登录</span>
        </div>
      </div>
    </div>
    <div class="phoneSub" @click="phoneUserPhone">
      <span>确定</span>
    </div>
    <div class="outWin" @click="back">
      <img :src="outIcon" alt />
    </div>
  </div>
</template>

<script>
import { hex_md5 } from "@/common/js/md5.js";
import fun from "@/common/js/common.js";
export default {
  name: "phoneLogin",
  inject: ["reload"], //注入App里的reload方法
  data() {
    return {
      clientWidth: "",
      // header: require("../../assets/img/logo.png"),//海象logo
      // header: require("../../assets/img/cmLogo.png"), //草莓logo
      header: require("../../assets/img/hmLogo.png"), //虹猫logo

      outIcon: require("../../assets/img/out.png"),
      mobile: "", //手机号
      code: "", //验证码
      countdownTime: 60, //验证码倒计时
      userInfo: {}, //用户资料
      adid: "", // 广告id
      agentId: "", // 渠道id
      appid: "", // appid
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
    this.device_params.idfa = localStorage.getItem("idfa")
      ? localStorage.getItem("idfa")
      : ""; //ios壳包专用参数

    this.device_params.os = localStorage.getItem("os")
      ? localStorage.getItem("os")
      : "";
    this.device_params.uuid = localStorage.getItem("uuid")
      ? localStorage.getItem("uuid")
      : "";
  },
  methods: {
    back() {
      this.$store.dispatch("IsPhoneLoginFun", false);
      this.$store.dispatch("IsLoginBoxFun", true);
    },
    toPassWordLogin() {
      this.$store.dispatch("IsPhoneLoginFun", false);
      this.$store.dispatch("IsPassWordLoginFun", true);
    },
    toRegister() {
      this.$store.dispatch("IsPhoneLoginFun", false);
      this.$store.dispatch("IsRegisterFun", true);
    },
    // 手机号登录
    phoneUserPhone() {
      if (!this.mobile) {
        this.$toast.text("请输入手机号");
        return false;
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
        this.$toast.text("手机号码有误，请重新输入");
        return false;
      }
      if (!this.code) {
        this.$toast.text("请输入验证码");
        return false;
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
        phone: this.mobile,
        code: this.code,
        reg_type: "3",
      };
      this.$http.post(fun.apiDomain_go + "member/login", data).then(
        function (res) {
          if (res.body.code === 200) {
            this.$store.dispatch("IsPhoneLoginFun", false);
            // 注册成功后存储用户信息
            localStorage.setItem("userInfo", JSON.stringify(res.body.data));
            this.userInfo = res.body.data;
            this.$store.commit("postLogoIconShow", 1);
            //start---------实名认证版本
            // if (res.body.data.fcm == "0") {
            //   this.$store.dispatch("IsReconiseInfoFun", true);
            // } else {
            //   this.reload();
            // }
            //end------------实名认证版本
            this.reload();
          } else {
            this.$toast.text(res.body.msg);
          }
        }.bind(this),
        function (res) {
          this.$toast.text(res.body.msg);
        }.bind(this)
      );
    },
    // 获取验证码
    getCode() {
      if (!this.mobile) {
        this.$toast.text("请输入手机号");
        return false;
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
        this.$toast.text("手机号码有误，请重新输入");
        return false;
      }
      // 发送验证码
      if (this.countdownTime < 60 && this.countdownTime >= 1) {
        return;
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
        phone: this.mobile,
      };
      this.$http.post(fun.apiDomain_go + "member/code", data).then(
        function (res) {
          this.countDown();
          this.$toast.text(res.body.msg);
        }.bind(this),
        function (res) {}.bind(this)
      );
    },
    // 倒计时
    countDown() {
      if (this.countdownTime < 60 && this.countdownTime >= 1) {
        return;
      }
      let self = this;
      self.countdownTime = 60;
      self.countdownTime -= 1;
      if (self.clear) {
        clearInterval(self.clear);
      }
      self.clear = null;
      self.clear = setInterval((_) => {
        if (self.countdownTime > 0) {
          self.countdownTime -= 1;
        } else {
          clearInterval(self.clear);
        }
      }, 1000);
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
input {
  outline: none;
  border: none;
}
::-webkit-input-placeholder {
  color: #909090;
}
::-moz-placeholder {
  color: #909090;
} /* firefox 19+ */
:-ms-input-placeholder {
  color: #909090;
} /* ie */
input:-moz-placeholder {
  color: #909090;
}

@media all and (orientation: landscape) {
  .phoneLogin {
    background: #fff;
    border-radius: 0.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 5.2rem;
    height: 4.68rem;
    border-radius: 0.4rem;
    padding: 0.9rem 0.31rem 0.31rem;
    box-sizing: border-box;
    position: relative;
    margin: 0 auto;
    @include flex_box(column, space-between, center);
  }
  .phoneLoginTitle {
    position: absolute;
    top: -0.2rem;
    left: 50%;
    margin-left: -0.54rem;
    @include flex_box(column, center, center);
    box-shadow: 0 1px 1px #efefef;
    border-radius: 50%;
    img {
      width: 1.08rem;
    }
  }
  .phoneBox {
    flex: 1;
    width: 100%;
    @include flex_box(column, none, stretch);
  }
  .phoneItem {
    width: 100%;
    @include flex_box(row, space-between, stretch);
    margin-top: 0.31rem;
  }
  .phoneItem_l {
    flex: 1;
    padding-left: 0.23rem;
    box-sizing: border-box;
    height: 0.56rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    @include flex_box(row, none, center);
  }
  .phoneItem_lText {
    font-size: 0.2rem;
    line-height: 0.27rem;
    color: #909090;
    padding-right: 0.12rem;
    border-right: 1px solid #909090;
  }
  .phoneItem_lInput {
    background-color: #efefef;
    font-size: 0.2rem;
    line-height: 0.27rem;
    color: #909090;
  }
  .codeInput {
    max-width: 2.4rem;
  }
  .input_right {
    padding-left: 0.12rem;
  }
  .phoneItem_right {
    background-color: #f35c14;
    margin-left: 0.24rem;
    width: 1.71rem;
    height: 0.56rem;
    border-radius: 0.1rem;
    @include flex_box(row, center, center);
    span {
      font-size: 0.2rem;
      line-height: 0.27rem;
      color: #fff;
    }
  }
  .passWordItem2 {
    margin-top: 0.24rem;
    @include flex_box(row, space-between, center);
  }
  .toRegister {
    height: 0.65rem;
    @include flex_box(row, center, center);
    span {
      font-size: 0.2rem;
      color: #fd3f3f;
    }
  }
  .cutType {
    height: 0.65rem;
    @include flex_box(row, flex-end, center);
    span {
      font-size: 0.2rem;
      color: #fd3f3f;
    }
  }
  .phoneSub {
    width: 100%;
    height: 0.6rem;
    border-radius: 0.1rem;
    background-color: #f35c14;
    @include flex_box(row, center, center);

    span {
      font-size: 0.23rem;
      line-height: 0.31rem;
      color: #fff;
    }
  }
  .outWin {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.68rem;
    height: 0.68rem;
    @include flex_box(row, center, center);
    img {
      width: 0.38rem;
    }
  }
}
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .phoneLogin {
    background: #fff;
    width: 6.34rem;
    height: 5.69rem;
    border-radius: 0.4rem;
    padding: 1.1rem 0.38rem 0.38rem;
    box-sizing: border-box;
    position: relative;
    margin: auto;
    @include flex_box(column, space-between, center);
  }
  .phoneLoginTitle {
    position: absolute;
    top: -0.9rem;
    left: 50%;
    margin-left: -0.9rem;
    @include flex_box(column, center, center);
    box-shadow: 0 1px 1px #efefef;
    border-radius: 50%;
    img {
      width: 1.8rem;
    }
  }
  .phoneBox {
    flex: 1;
    width: 100%;
    @include flex_box(column, none, stretch);
  }
  .phoneItem {
    width: 100%;
    @include flex_box(row, space-between, stretch);
    margin-top: 0.38rem;
  }
  .phoneItem_l {
    flex: 1;
    padding-left: 0.29rem;
    box-sizing: border-box;
    height: 0.68rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    @include flex_box(row, none, center);
  }
  .phoneItem_lText {
    font-size: 0.25rem;
    line-height: 0.33rem;
    color: #909090;
    padding-right: 0.12rem;
    border-right: 1px solid #909090;
  }
  .phoneItem_lInput {
    background-color: #efefef;
    font-size: 0.25rem;
    line-height: 0.33rem;
    color: #909090;
  }
  .codeInput {
    max-width: 2.4rem;
  }
  .input_right {
    min-width: 4rem;
    padding-left: 0.12rem;
  }
  .phoneItem_right {
    background-color: #f35c14;
    margin-left: 0.32rem;
    width: 2rem;
    height: 0.68rem;
    border-radius: 0.1rem;
    @include flex_box(row, center, center);
    span {
      font-size: 0.25rem;
      line-height: 0.35rem;
      color: #fff;
    }
  }
  .passWordItem2 {
    margin-top: 0.29rem;
    @include flex_box(row, space-between, center);
  }
  .toRegister {
    @include flex_box(row, center, center);
    height: 0.68rem;
    span {
      font-size: 0.2rem;
      color: #fd3f3f;
    }
  }
  .cutType {
    height: 0.68rem;
    @include flex_box(row, flex-end, center);
    span {
      font-size: 0.2rem;
      color: #fd3f3f;
    }
  }
  .phoneSub {
    width: 100%;
    height: 0.72rem;
    border-radius: 0.1rem;
    background-color: #f35c14;
    @include flex_box(row, center, center);

    span {
      font-size: 0.28rem;
      line-height: 0.37rem;
      color: #fff;
    }
  }
  .outWin {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.84rem;
    height: 0.84rem;
    @include flex_box(row, center, center);
    img {
      width: 0.48rem;
    }
  }
}
</style>