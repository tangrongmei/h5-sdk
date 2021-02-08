<template>
  <div class="antiAddiction">
    <!-- 邀请实名提示 -->
    <div class="realNameTip" v-if="$store.state.winType.isRealNameTip">
      <div class="content">
        <span> 特邀填写实名认证</span>
        <span> 填写完成后可前往公众号领取礼包奖励 </span>
      </div>
      <div class="btn" @click="toRealNameForm">
        <span>立即认证</span>
      </div>
      <div class="close" @click="closeRealNameTip">
        <img :src="closeIcon" alt="" />
      </div>
    </div>
    <!-- 实名表单填写 -->
    <div class="realNameForm" v-if="$store.state.winType.isRealNameForm">
      <div class="title"><span>实名认证</span></div>
      <div class="form">
        <div class="formList">
          <input
            type="text"
            placeholder="请输入正式姓名"
            name="trueName"
            v-model="trueName"
          />
        </div>
        <div class="formList">
          <input
            type="text"
            placeholder="请输入真实有效的身份证信息"
            name="cardId"
            v-model="cardId"
          />
        </div>
      </div>
      <div class="explain">
        <span class="tipTitle">尊敬的游戏用户：</span>
        <span class="tipMessage">根据国家规定，游戏用户需进行实名认证；</span>
        <span class="tipTitle">申明：</span>
        <span class="tipMessage">1.用户信息仅用于认证绝对保密；</span>
        <span class="tipMessage">2.未成年人不允许在游戏内支付；</span>
      </div>
      <div class="btn">
        <div class="cancel" @click="cancelForm"><span>取消</span></div>
        <div class="comfirm" @click="comfirmForm"><span>完成认证</span></div>
      </div>
    </div>
    <!-- 疲劳提醒--解除疲劳 -->
    <div class="relieveTiredTip" v-if="$store.state.winType.isRelieveTiredTip">
      <div class="content">
        <span> 您已在线{{$store.state.fcmOverTime}}小时处于疲劳期 </span>
        <span> 填写实名认证解除 </span>
      </div>
      <div class="btn" @click="toRealNameForm">
        <span>立即认证</span>
      </div>
      <div class="close" @click="closeRelieveTiredTip">
        <img :src="closeIcon" alt="" />
      </div>
    </div>
    <!-- 疲劳提醒--未成年 -->
    <div class="tiredTip" v-if="$store.state.winType.isTiredTip">
      <span> 您已在线{{$store.state.fcmOverTime}}小时处于疲劳期 </span>
      <div class="close" @click="abandonRelieve">
        <img :src="closeIcon" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { hex_md5 } from "@/common/js/md5";
import fun from "@/common/js/common";
export default {
  name: "antiAddiction",
  inject: ["reload"],
  data() {
    return {
      closeIcon: require("../../assets/img/closeIcon.png"),
      trueName: "", //真实姓名
      cardId: "", //身份证号码
      userInfo: "",
      adid: "",
      appid: "",
      agentId: "",
      serviceInfo: "",
    };
  },
  created() {},
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
  },
  methods: {
    //关闭邀请实名提示弹窗
    closeRealNameTip() {
      this.$store.dispatch("IsRealNameTipFun", false);
    },
    //前往实名表单弹窗
    toRealNameForm() {
      this.$store.dispatch("IsRealNameTipFun", false);
      this.$store.dispatch("IsRelieveTiredTipFun", false);
      this.$store.dispatch("IsRealNameFormFun", true);
    },
    //关闭实名表单弹窗
    cancelForm() {
      this.$store.dispatch("IsRealNameFormFun", false);
      if (this.$store.state.fcmLoginTime !="0") {
        this.$store.dispatch("IsTiredTipFun", true);
      }
    },
    //关闭解除疲劳提醒弹窗
    abandonRelieve() {
      this.$store.dispatch("IsTiredTipFun", false);
    },
    //关闭未成年的疲劳提醒弹窗
    closeRelieveTiredTip() {
      this.$store.dispatch("IsRelieveTiredTipFun", false);
    },
    //提交实名表单
    comfirmForm() {
      if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.trueName)) {
        this.$toast.text("请输入真实姓名");
        return false;
      }
      if (!this.cardId) {
        this.$toast.text("请输入身份证号码");
        return false;
      }
      if (
        !/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(this.cardId)
      ) {
        this.$toast.text("身份证号有误，请重新输入");
        return false;
      }
      var time = new Date().getTime();
      this.sign = hex_md5(
        this.userInfo.uid
          ? this.userInfo.uid
          : "" + this.agentId + this.adid + time + this.appid
      );
      let data = {
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        sign: this.sign,
        time: time,
        truename: this.trueName,
        idcard: this.cardId,
        os: this.$store.state.deviceData.os,
        uid: this.userInfo.uid,
      };
      //实名认证
      this.$http.post(fun.apiDomain_go + "member/setFcm", data).then(
        function (res) {
          if (res.body.code === 200) {
            this.$toast.text(res.body.msg);
            this.$store.dispatch("IsRealNameFormFun", false);
            this.userInfo.fcm = "1";
            this.userInfo.age = res.body.data;
            let userInfo = {
              uname: this.userInfo.uname,
              uid: this.userInfo.uid,
              token: this.userInfo.token,
              pwd: this.userInfo.pwd,
              bindPhone: this.userInfo.bindPhone,
              phone: this.userInfo.phone,
              fcm: this.userInfo.fcm,
              loginFcm: this.userInfo.loginFcm,
              payFcm: this.userInfo.payFcm,
              age: res.data,
              newRegist: this.userInfo.newRegist,
            };
            window.localStorage.setItem("userInfo", JSON.stringify(userInfo)); //对象转字符串
            this.reload();
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

// 正常竖屏样式
@media all and (orientation: portrait) {
  .antiAddiction {
    width: 100%;
    height: 100%;
    @include flex_box(column, none, center);
    font-family: PingFang SC;
  }
}
// 正常横屏样式
@media all and (orientation: landscape) {
  .antiAddiction {
    width: 100%;
    height: 100%;
    @include flex_box(column, none, center);
    font-family: PingFang SC;
  }
  .realNameTip,
  .relieveTiredTip {
    margin: auto;
    width: 6.34rem;
    height: 5.7rem;
    padding: 0.38rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.36rem;
    @include flex_box(column, space-between, stretch);
    position: relative;
    .content {
      flex: 1;
      @include flex_box(column, center, center);
      span {
        text-align: center;
        font-size: 0.34rem;
        line-height: 0.52rem;
        font-weight: bold;
        color: #282b2d;
      }
    }
    .btn {
      height: 0.72rem;
      background: #f35c14;
      box-shadow: 0px 0.07rem 0.09rem rgba(243, 92, 20, 0.36);
      border-radius: 4px;
      @include flex_box(row, center, center);
      span {
        font-size: 0.29rem;
        font-weight: bold;
        color: #ffffff;
        letter-spacing: 2px;
      }
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 1.04rem;
      height: 1.04rem;
      @include flex_box(row, center, center);
      img {
        width: 0.28rem;
      }
    }
  }
  .realNameForm {
    width: 6.34rem;
    max-height: 95%;
    margin: auto;
    padding-bottom: 0.3rem;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
    border-radius: 0.36rem;
    @include flex_box(column, space-between, stretch);
    .title {
      min-height: 1rem;
      background: #f35c14;
      border-radius: 0.36rem 0.36rem 0px 0px;
      @include flex_box(row, center, center);
      span {
        font-size: 0.34rem;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: 2px;
      }
    }
    .form {
      padding: 0 0.45rem;
      @include flex_box(column, none, stretch);
      .formList {
        margin-top: 0.2rem;
        height: 0.69rem;
        background: #efefef;
        border-radius: 4px;
        @include flex_box(row, none, center);
        padding-left: 0.29rem;
        input {
          flex: 1;
          font-size: 0.29rem;
          font-weight: 500;
          color: #909090;
          border: none;
          outline: none;
          background-color: transparent;
        }
      }
    }
    .explain {
      flex: 1;
      overflow-y: scroll;
      padding: 0 0.45rem;
      margin-top: 0.3rem;
      @include flex_box(column, none, stretch);
      span {
        padding-top: 0.11rem;
        font-size: 0.25rem;
        font-weight: 400;
        line-height: 0.36rem;
      }
      .tipTitle {
        color: #282b2d;
      }
      .tipMessage {
        color: #707070;
      }
    }
    .btn {
      margin-top: 0.3rem;
      padding: 0 0.45rem;
      @include flex_box(row, space-between, stretch);
      .cancel,
      .comfirm {
        width: 2.46rem;
        height: 0.72rem;
        @include flex_box(row, center, center);
        border-radius: 4px;
        span {
          font-size: 0.29rem;
        }
      }
      .cancel {
        background: #efefef;
        span {
          color: #c0c0c0;
        }
      }
      .comfirm {
        background: #f35c14;
        span {
          color: #fff;
        }
      }
    }
  }
  .tiredTip {
    margin: auto;
    width: 6.34rem;
    height: 5.7rem;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 0.36rem;
    @include flex_box(column, center, center);
    padding: 0 0.38rem;
    position: relative;
    box-shadow: 0 1px 1px #efefef;
    span {
      font-size: 0.38rem;
      font-weight: bold;
      color: #282b2d;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 1.04rem;
      height: 1.04rem;
      @include flex_box(row, center, center);
      img {
        width: 0.28rem;
      }
    }
  }
}
@media all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
}

// 伪横屏下竖屏样式
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .realNameTip,
  .relieveTiredTip {
    margin: 2.9rem auto 0;
    width: 6.34rem;
    height: 5.7rem;
    padding: 0.38rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.36rem;
    @include flex_box(column, space-between, stretch);
    position: relative;
    .content {
      flex: 1;
      @include flex_box(column, center, center);
      span {
        text-align: center;
        font-size: 0.34rem;
        line-height: 0.52rem;
        font-weight: bold;
        color: #282b2d;
      }
    }
    .btn {
      height: 0.72rem;
      background: #f35c14;
      box-shadow: 0px 0.07rem 0.09rem rgba(243, 92, 20, 0.36);
      border-radius: 4px;
      @include flex_box(row, center, center);
      span {
        font-size: 0.29rem;
        font-weight: bold;
        color: #ffffff;
        letter-spacing: 2px;
      }
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 1.04rem;
      height: 1.04rem;
      @include flex_box(row, center, center);
      img {
        width: 0.28rem;
      }
    }
  }
  .realNameForm {
    width: 6.34rem;
    margin: 1.18rem auto 0;
    padding-bottom: 0.62rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.36rem;
    @include flex_box(column, space-between, stretch);
    .title {
      height: 1rem;
      background: #f35c14;
      border-radius: 0.36rem 0.36rem 0px 0px;
      @include flex_box(row, center, center);
      span {
        font-size: 0.34rem;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: 2px;
      }
    }
    .form {
      margin-top: 0.11rem;
      padding: 0 0.45rem;
      @include flex_box(column, none, stretch);
      .formList {
        margin-top: 0.38rem;
        height: 0.69rem;
        background: #efefef;
        border-radius: 4px;
        @include flex_box(row, none, center);
        padding-left: 0.29rem;
        input {
          flex: 1;
          font-size: 0.29rem;
          font-weight: 500;
          color: #909090;
          border: none;
          outline: none;
          background-color: transparent;
        }
      }
    }
    .explain {
      padding: 0 0.45rem;
      margin-top: 0.38rem;
      @include flex_box(column, none, stretch);
      span {
        padding-top: 0.11rem;
        font-size: 0.25rem;
        font-weight: 400;
        line-height: 0.36rem;
      }
      .tipTitle {
        color: #282b2d;
      }
      .tipMessage {
        color: #707070;
      }
    }
    .btn {
      margin-top: 0.83rem;
      padding: 0 0.45rem;
      @include flex_box(row, space-between, stretch);
      .cancel,
      .comfirm {
        width: 2.46rem;
        height: 0.72rem;
        @include flex_box(row, center, center);
        border-radius: 4px;
        span {
          font-size: 0.29rem;
        }
      }
      .cancel {
        background: #efefef;
        span {
          color: #c0c0c0;
        }
      }
      .comfirm {
        background: #f35c14;
        span {
          color: #fff;
        }
      }
    }
  }
  .tiredTip {
    margin-top: 2.9rem;
    width: 6.34rem;
    height: 5.7rem;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 0.36rem;
    @include flex_box(column, center, center);
    padding: 0 0.38rem;
    position: relative;
    span {
      font-size: 0.38rem;
      font-weight: bold;
      color: #282b2d;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 1.04rem;
      height: 1.04rem;
      @include flex_box(row, center, center);
      img {
        width: 0.28rem;
      }
    }
  }
}
</style>