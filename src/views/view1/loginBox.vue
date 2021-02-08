<template>
  <div class="loginBox">
    <div class="loginBoxTitle">
      <img :src="logoIcon" alt />
    </div>
    <div class="loginType">
      <!-- <div class="loginTypeItem">
        <img :src="speed" alt />
        <span>快速登录</span>
        <div class="redDot"></div>
      </div>-->
      <div class="loginTypeItem" @click="toPhoneLogin">
        <div class="loginTypeItemIcon">
          <img :src="phone" alt />
          <div class="redDot"></div>
        </div>
        <span>手机登录</span>
      </div>
      <!-- <div class="loginTypeItem" @click="toPassWordLogin">
        <img :src="userInfo" alt />
        <span>账号登录</span>
        <div class="redDot"></div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "loginBox",
  data() {
    return {
      clientWidth: "",
      // logoIcon: require("../../assets/img/logo.png"),
      logoIcon: require("../../assets/img/cmLogo.png"),
      speed: require("../../assets/img/speed.png"),
      phone: require("../../assets/img/phone.png"),
      userInfo: require("../../assets/img/userInfo.png"),
    };
  },
  created() {
    //   this.getSize()
  },
  mounted() {},
  methods: {
    toPhoneLogin() {
      this.$store.dispatch("IsLoginBoxFun", false);
      this.$store.dispatch("IsPhoneLoginFun", true);
    },
    toPassWordLogin() {
      this.$store.dispatch("IsLoginBoxFun", false);
      this.$store.dispatch("IsPassWordLoginFun", true);
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
      width: 1.6rem;
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