<template>
  <!-- 扫码关注微信公众号 -->
  <div class="agreement">
    <div class="agreementTitle">
      <span>用户协议</span>
      <div class="closeBtn" @click="closeAgreement">
        <img :src="closeImg" alt />
      </div>
    </div>
    <div class="agreementContent">
      <span>{{$store.state.agreement.title}}{{$store.state.agreement.details}}</span>
    </div>
  </div>
</template>
<script>
import fun from "@/common/js/common";

import Clipboard from "clipboard";

export default {
  props: [""],
  name:"agreement",
  data() {
    return {
      closeImg: require("../../assets/img/greyclose.png"), // 关闭
      adid:'',
      appid:'',
      agentId:''
    };
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
    // 关闭当前窗口
    closeAgreement() {
      this.$store.dispatch("AgreementShowFun", false);
      this.$store.dispatch("IsPhoneLoginFun", true);
    },
  },
};
</script>
<style lang="scss" scoped>
.agreement {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  color: #000;
}
.agreementTitle {
  min-height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
  position: relative;
  span {
    font-size: 16px;
  }
}
.closeBtn {
  position: absolute;
  left: 0;
  top: 0;
  width: 44px;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    width: 15px;
  }
}
.agreementContent {
  padding: 10px 15px;
  font-size: 16px;
  line-height: 24px;
  overflow: scroll;
}
/* 账号 */
</style>