<template>
  <div class="bindPhone">
    <div class="bindPhoneTitle">
      <div class="bindPhoneTitle_l">
        <span>绑定手机</span>
      </div>
    </div>
    <div class="bindPhoneContent">
      <div class="bindPhoneTip">
        <!-- <span>尊敬的玩家：根据国家规定，游戏用户需要进行实名认证</span> -->
      </div>
      <div class="bindPhoneRow">
        <div class="bindPhoneRow_l">
          <input
            onkeyup="this.value=this.value.replace(/\D/g,'')"
            onafterpaste="this.value=this.value.replace(/\D/g,'')"
            type="text"
            maxlength="11"
            name="bindMobile"
            v-model="bindMobile"
            placeholder="请输入手机号码"
          />
        </div>
      </div>
      <div class="bindPhoneRow">
        <div class="bindPhoneRow_l">
          <input maxlength="6" type="text" name="bindCode" v-model="bindCode" placeholder="请输入验证码" />
        </div>

        <div
          class="bindPhoneRow_r"
          @click="getCode"
          :disabled="countdownTime < 60 && countdownTime >= 1"
        >
          <span>{{ countdownTime < 60 && countdownTime >= 1 ? `${countdownTime}秒后可重发` : '获取验证码' }}</span>
        </div>
      </div>
    </div>
    <div class="bindPhoneSub" @click="bindUserPhone">
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
  name: "bindPhone",
  inject:['innerReload'],
  data() {
    return {
      bindMobile: "", //手机号码
      bindCode: "", //验证码
      outIcon: require("../../assets/img/out.png"),
      countdownTime: 60, //验证码倒计时
      userInfo: {}, //用户资料
      adid: "", // 广告id
      agentId: "", // 渠道id
      appid: "", // appid
      device_params: {
        os: "",
        uuid: "",
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
    this.appid = localStorage.getItem("appid")?localStorage.getItem("appid"):'';
    this.adid = localStorage.getItem("adid")?localStorage.getItem("adid"):'';
    this.agentId = localStorage.getItem("agentId")?localStorage.getItem("agentId"):'';
  },
  methods: {
    back() {
      this.$store.dispatch("IsBindPhoneFun", false);
      this.$store.dispatch("IsAccountFun", true);
    },
    // 绑定手机
    bindUserPhone() {
      if (!this.bindMobile) {
        this.$toast.text("请输入手机号");
        return false;
      }
      if (!/^1(3|4|5|7|8|9)\d{9}$/.test(this.bindMobile)) {
        this.$toast.text("手机号码有误，请重新输入");
        return false;
      }
      if (!this.bindCode) {
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
        phone: this.bindMobile,
        code: this.bindCode,
        reg_type: "1",
        os: this.$store.state.deviceData.os,
        uid: this.userInfo.uid,
      };
      this.$http.post(fun.apiDomain_go + "member/bind_phone_code", data).then(
        function (res) {
          // this.countDown()
          if (res.body.code === 200) {
            this.$store.dispatch("IsBindPhoneFun", false);
            this.$store.commit("getIsBindPhone", "1");
            this.userInfo.bindPhone = "1";
            this.$toast.text(res.body.msg);
            this.innerReload();
          } else {
            this.$toast.text(res.body.msg);
          }
        }.bind(this),
        function (res) {
        }.bind(this)
      );
    },
    getCode() {
      if (!this.bindMobile) {
        this.$toast.text("请输入手机号");
        return false;
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.bindMobile)) {
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
        os: this.$store.state.deviceData.os,
        phone: this.bindMobile,
      };
      this.$http.post(fun.apiDomain_go + "member/code", data).then(
        function (res) {
          this.countDown();
          this.$toast.text(res.body.msg);
        }.bind(this),
        function (res) {
        }.bind(this)
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
@media all and (orientation: portrait) {
  .bindPhone {
    background: #fff;
    width: 7.5rem;
    height: 8.69rem;
    padding: 0 0.45rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem 0.2rem 0 0;
    @include flex_box(column, space-between, stretch);
  }
}

@media all and (orientation: landscape) {
  .bindPhone {
    background: #fff;
    width: 6.65em;
    height: 5.5rem;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, space-between, stretch);
  }
  .bindPhoneTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    height: 1.02rem;
  }
  .bindPhoneTitle_l {
    @include flex_box(row, none, center);
    height: 0.4rem;
    border-left: 0.06rem solid #f35c14;
    padding-left: 0.16rem;
    span {
      font-size: 0.28rem;
      color: #282b2d;
    }
  }
  .bindPhoneContent {
    flex: 1;
    @include flex_box(column, none, center);
  }
  .bindPhoneTip {
    padding: 0.31rem 0;
    @include flex_box(row, none, center);
    span {
      color: #f35c14;
      font-size: 0.2rem;
      line-height: 0.27rem;
    }
  }
  .bindPhoneRow {
    @include flex_box(row, space-between, center);
    width: 5.9rem;
    height: 0.68rem;
    border-radius: 0.1rem;
    margin: 0.15rem 0;
    input {
      padding-left: 0.24rem;
      font-size: 0.2rem;
      background-color: transparent;
    }
  }
  .bindPhoneRow_l {
    flex: 1;
    height: 0.68rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    margin: 0.19rem 0;
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
  .bindPhoneRow_r {
    background-color: #f35c14;
    margin-left: 0.24rem;
    width: 1.71rem;
    height: 0.68rem;
    border-radius: 0.1rem;
    @include flex_box(row, center, center);
    span {
      font-size: 0.2rem;
      line-height: 0.27rem;
      color: #fff;
    }
  }
  .bindPhoneSub {
    height: 0.6rem;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    background-color: #f35c14;
    margin-bottom: 0.24rem;
    span {
      font-size: 0.28rem;
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
  .bindPhone {
    background: #fff;
    width: 7.5rem;
    height: 8.69rem;
    padding: 0 0.45rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem;
    margin: auto;
    @include flex_box(column, space-between, stretch);
  }
}

@media 
all and (orientation: portrait),
all and (orientation: landscape) and (min-width:600px) and (min-height:800px),
all and (min-device-aspect-ratio:3/4) and (max-device-aspect-ratio:4/3),
all and (device-aspect-ratio:4/3) {
  .bindPhoneTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    height: 1.23rem;
  }
  .bindPhoneTitle_l {
    @include flex_box(row, none, center);
    height: 0.53rem;
    border-left: 0.08rem solid #f35c14;
    padding-left: 0.22rem;
    span {
      font-size: 0.38rem;
      color: #282b2d;
    }
  }
  .bindPhoneContent {
    flex: 1;
    @include flex_box(column, none, center);
  }
  .bindPhoneTip {
    padding: 0.38rem 0;
    @include flex_box(row, none, center);
    span {
      color: #f35c14;
      font-size: 0.25rem;
      line-height: 0.33rem;
    }
  }
  .bindPhoneRow {
    @include flex_box(row, space-between, center);
    width: 6.66rem;
    background-color: transparent;
  }
  .bindPhoneRow_l {
    flex: 1;
    height: 0.68rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    margin: 0.19rem 0;
    @include flex_box(row, none, center);
    input {
      flex: 1;
      padding-left: 0.34rem;
      font-size: 0.25rem;
      color: #909090;
      background-color: transparent;
    }
  }
  .bindPhoneRow_r {
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
  .bindPhoneSub {
    height: 0.72rem;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    background-color: #f35c14;
    margin-bottom: 0.63rem;
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