<template>
  <div class="reconiseInfo">
    <div class="reconiseInfoTitle">
      <div class="reconiseInfoTitle_l">
        <span>实名认证</span>
      </div>
    </div>
    <div class="reconiseInfoContent">
      <div class="reconiseInfoTip">
        <span>尊敬的玩家：根据国家规定，游戏用户需要进行实名认证</span>
      </div>
      <div class="reconiseInfoRow">
        <input
          placeholder="请输入真实姓名"
          onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')"
          type="text"
          maxlength="10"
          name="truename"
          v-model="truename"
        />
      </div>
      <div class="reconiseInfoRow">
        <input
          type="text"
          name="idcard"
          v-model="idcard"
          placeholder="请填写真实有效的身份信息"
        />
      </div>
      <!-- start---------实名认证版本 -->
      <!-- <div class="cutAccount" @click="loginOut">
        <span>切换账号</span>
      </div> -->
      <!-- end---------实名认证版本 -->
    </div>
    <div class="reconiseInfoSub" @click="setFcmInfo">
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
  name: "reconiseInfo",
  inject: ["reload"], //注入App里的reload方法

  data() {
    return {
      truename: "", //真实姓名
      idcard: "", //身份证号
      outIcon: require("../../assets/img/out.png"),
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
    this.appid = localStorage.getItem("appid")
      ? localStorage.getItem("appid")
      : "";
    this.adid = localStorage.getItem("adid")
      ? localStorage.getItem("adid")
      : "";
    this.agentId = localStorage.getItem("agentId")
      ? localStorage.getItem("agentId")
      : "";
    this.device_params.os = localStorage.getItem("os")
      ? localStorage.getItem("os")
      : "";
  },
  methods: {
    //start---------实名认证版本
    // loginOut() {
    //   localStorage.removeItem("userInfo");
    //   localStorage.removeItem("isUploadUserInfo");
    //   this.$store.dispatch("IsUserInfoMaskFun", false);
    //   this.reload();
    // },
    //end---------实名认证版本
    back() {
      //start---------实名认证版本
      // if (this.userInfo.fcm == "0") {
      //   this.$toast.text("请先完成实名认证再进入游戏!");
      //   return false;
      // }
      //end---------实名认证版本
      this.$store.dispatch("IsReconiseInfoFun", false);
      this.$store.dispatch("IsAccountFun", true);
    },
    // 实名验证
    setFcmInfo() {
      if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.truename)) {
        this.$toast.text("请输入真实姓名");
        return false;
      }
      if (!this.idcard) {
        this.$toast.text("请输入身份证号码");
        return false;
      }
      if (
        !/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(this.idcard)
      ) {
        this.$toast.text("身份证号有误，请重新输入");
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
        truename: this.truename,
        idcard: this.idcard,
        os: this.device_params.os,
        uid: this.userInfo.uid,
      };
      //实名认证
      this.$http.post(fun.apiDomain_go + "member/setFcm", data).then(
        function (res) {
          if (res.body.code === 200) {
            this.$toast.text(res.body.msg);
            this.$store.dispatch("IsReconiseInfoFun", false);
            // this.trueCard = true;

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
input {
  outline: none;
  border: none;
}
@media all and (orientation: portrait) {
  .reconiseInfo {
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
  .reconiseInfo {
    background: #fff;
    width: 6.65em;
    height: 5.5rem;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, space-between, stretch);
  }
  .reconiseInfoTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    height: 1.02rem;
  }
  .reconiseInfoTitle_l {
    @include flex_box(row, none, center);
    height: 0.4rem;
    border-left: 0.06rem solid #f35c14;
    padding-left: 0.16rem;
    span {
      font-size: 0.28rem;
      color: #282b2d;
    }
  }
  .reconiseInfoContent {
    flex: 1;
    @include flex_box(column, none, center);
  }
  .reconiseInfoTip {
    padding: 0.31rem 0;
    @include flex_box(row, none, center);
    span {
      color: #f35c14;
      font-size: 0.2rem;
      line-height: 0.27rem;
    }
  }
  .reconiseInfoRow {
    @include flex_box(row, none, center);
    width: 5.9rem;
    height: 0.56rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    margin: 0.1rem 0;
    input {
      padding-left: 0.24rem;
      font-size: 0.2rem;
      color: #909090;
      background-color: transparent;
    }
  }
  .cutAccount {
    width: 5.9rem;
    @include flex_box(row, flex-end, center);
    span {
      text-align: right;
      font-size: 0.24rem;
      line-height: 0.4rem;
      color: #f35c14;
    }
  }
  .reconiseInfoSub {
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
  .reconiseInfo {
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
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .reconiseInfoTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    height: 1.23rem;
  }
  .reconiseInfoTitle_l {
    @include flex_box(row, none, center);
    height: 0.53rem;
    border-left: 0.08rem solid #f35c14;
    padding-left: 0.22rem;
    span {
      font-size: 0.38rem;
      color: #282b2d;
    }
  }
  .reconiseInfoContent {
    flex: 1;
    @include flex_box(column, none, center);
  }
  .reconiseInfoTip {
    padding: 0.38rem 0;
    @include flex_box(row, none, center);
    span {
      color: #f35c14;
      font-size: 0.25rem;
      line-height: 0.33rem;
    }
  }
  .reconiseInfoRow {
    @include flex_box(row, none, center);
    width: 6.66rem;
    height: 0.68rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    margin: 0.19rem 0;
    input {
      flex: 1;
      padding-left: 0.34rem;
      font-size: 0.25rem;
      color: #909090;
      background-color: transparent;
    }
  }
  .cutAccount {
    width: 6.66rem;
    @include flex_box(row, flex-end, center);
    span {
      font-size: 0.3rem;
      line-height: 0.4rem;
      color: #f35c14;
    }
  }
  .reconiseInfoSub {
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