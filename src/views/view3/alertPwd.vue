<template>
  <div class="alertPwd">
    <div class="wechatTitle">
      <div class="wechatTitle_l">
        <span>修改密码</span>
      </div>
    </div>
    <div class="alertPwdContent">
      <div class="pwd_item">
        <input
          type="text"
          name="myName"
          v-model="myName"
          placeholder="请输入账号"
        />
      </div>
      <div class="pwd_item">
        <input
          maxlength="20"
          type="password"
          name="old_pwd"
          v-model="old_pwd"
          secureTextEntry="NO"
          placeholder="请输入原密码"
        />
      </div>
      <div class="pwd_item">
        <input
          maxlength="20"
          type="password"
          name="new_pwd"
          v-model="new_pwd"
          secureTextEntry="NO"
          placeholder="请输入新密码"
        />
      </div>
    </div>
    <div class="userInfoMaskSub" @click="toAlertPwd">
      <span>修改密码</span>
    </div>
    <div class="outWin" @click="back">
      <img :src="outIcon" alt />
    </div>
  </div>
</template>

<script>
import { hex_md5 } from "@/common/js/md5";
import fun from "@/common/js/common";
import Clipboard from "clipboard";
export default {
  name: "alertPwd",
  inject: ["reload"],
  data() {
    return {
      header: require("../../assets/img/header.png"),
      outIcon: require("../../assets/img/out.png"),
      myName: "",
      old_pwd: "",
      new_pwd: "",
      userInfo: "",
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
  },
  methods: {
    back() {
      this.$store.dispatch("IsAlertPwdFun", false);
      this.$store.dispatch("IsAccountFun", true);
    },

    toAlertPwd() {
      if (!this.myName) {
        this.$toast.text("请输入用户名");
        return false;
      }
      if (!this.old_pwd) {
        this.$toast.text("请输入旧密码");
        return false;
      }
      if (!this.new_pwd) {
        this.$toast.text("请输入新密码");
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
        uname: this.myName,
        pwd: this.old_pwd,
        newpwd: this.new_pwd,
        os: this.$store.state.deviceData.os,
      };
      var _this = this;
      this.$http.post(fun.apiDomain_go + "member/password", data).then(
        function (res) {
          if (res.body.code === 200) {
            this.$toast.text(res.body.msg);
            localStorage.removeItem("userInfo");
            // 注册成功后存储用户信息
            setTimeout(function () {
              _this.$store.dispatch("IsAlertPwdFun", false);
              _this.$store.dispatch("IsLoginBoxFun", true);
              _this.reload();
            }, 1500);
          } else {
            this.$toast.text(res.body.msg);
          }
        }.bind(this),
        function (res) {}.bind(this)
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
// 正常竖屏样式
@media all and (orientation: portrait) {
  .alertPwd {
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
  .alertPwd {
    background: #fff;
    width: 6.65rem;
    height: 5.5rem;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, none, stretch);
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
  .alertPwdContent {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .pwd_item {
    height: 0.68rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    margin-top: 0.3rem;
    @include flex_box(row, none, center);
    input {
      flex: 1;
      max-width: 180px;
      padding-left: 0.34rem;
      font-size: 0.25rem;
      color: #909090;
      background-color: transparent;
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
  .alertPwd {
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
  .alertPwdContent {
    flex: 1;
    padding-top: 0.3rem;
    box-sizing: border-box;
    @include flex_box(column, none, stretch);
  }
  .pwd_item {
    width: 100%;
    padding-left: 0.29rem;
    box-sizing: border-box;
    height: 0.8rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    margin-top: 0.5rem;
    @include flex_box(row, none, center);
    input {
      min-width: 4.8rem;
      background-color: #efefef;
      text-indent: 0.13rem;
      font-size: 0.25rem;
      line-height: 0.33rem;
      color: #909090;
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