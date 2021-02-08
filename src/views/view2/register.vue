<template>
  <div class="passWordLogin">
    <div class="passWordLoginTitle">
      <img :src="header" alt />
    </div>
    <div class="passWordBox">
      <div class="passWordItem">
        <input
          type="text"
          name="registerName"
          v-model="registerName"
          placeholder="请输入账号"
        />
      </div>
      <div class="passWordItem">
        <input
          maxlength="20"
          type="password"
          name="registerPass"
          v-model="registerPass"
          secureTextEntry="NO"
          placeholder="请输入密码"
        />
      </div>
      <div class="userRule">
        <span>我已阅读并同意</span
        ><span @click="toAgreement">用户协议及隐私政策</span>
      </div>
    </div>
    <div class="passWordSub" @click="registAcount">
      <span>立即注册</span>
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
  name: "register",
  inject: ["reload"], //注入App里的reload方法
  data() {
    return {
      clientWidth: "",
      header: require("../../assets/img/cmLogo.png"),
      outIcon: require("../../assets/img/out.png"),
      registerName: "", //账号
      registerPass: "", //密码
      userInfo: {}, //用户资料
      adid: "", // 广告id
      agentId: "", // 渠道id
      appid: "", // appid
      idfa: "", //壳包专用参数
      device_params: {},
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
    this.idfa = localStorage.getItem("idfa")
      ? localStorage.getItem("idfa")
      : "";
    this.device_params.os = localStorage.getItem("os")
      ? localStorage.getItem("os")
      : "";
    this.device_params.uuid = localStorage.getItem("uuid")
      ? localStorage.getItem("uuid")
      : "";
    this.device_params.idfa = this.idfa;
  },
  methods: {
    back() {
      this.$store.dispatch("IsRegisterFun", false);
      this.$store.dispatch("IsLoginBoxFun", true);
    },
    //打开用户协议
    toAgreement() {
      this.$store.dispatch("IsRegisterFun", false);
      this.$store.dispatch("AgreementShowFun", true);
    },
    // 注册账号(用户名注册)
    registAcount() {
      if (!this.registerName) {
        this.$toast.text("请输入用户名");
        return false;
      } else if (!/^[a-zA-Z0-9_\-]+$/.test(this.registerName)) {
        this.$toast.text("账号由字母、数字、下划线或中划线任意组合");
        return false;
      }
      if (!this.registerPass) {
        this.$toast.text("请输入密码");
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
        uname: this.registerName,
        pwd: this.registerPass,
        reg_type: "1", //1：用户名注册，2：随机注册，3：短信登录,0:为游客登录
        device_params: this.device_params,
      };

      this.$http.post(fun.apiDomain_go + "member/reg", data).then(
        function (res) {
          if (res.body.code === 200) {
            this.$toast.text(res.body.msg);
            this.$store.dispatch("IsRegisterFun", false);
            localStorage.setItem("userInfo", JSON.stringify(res.body.data));
            this.userInfo = res.body.data;
            this.$store.commit("postRegisterPwd", this.registerPass);
            this.$store.dispatch("IsAccountAndPasFun", true);

            let _this = this;
            setTimeout(function () {
              _this.$store.dispatch("IsAccountAndPasFun", false);
              _this.$store.commit("postLogoIconShow", 1);
              _this.reload();
            }, 5000);
            // 注册成功后存储用户信息
          } else {
            this.$toast.text(res.body.msg);
          }
        },
        function (res) {
          // 请求完成，修改防止重复提交标识，让其他请求可以提交
          this.isCommit = false;
        }
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
// input:-webkit-autofill {
//   -webkit-box-shadow: 0 0 0 1000px rgba(239, 239, 239, 1) inset !important;
// }
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
  .passWordLogin {
    background: #fff;
    border-radius: 0.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 5.21rem;
    height: 4.68rem;
    border-radius: 0.4rem;
    padding: 0.9rem 0.31rem 0.31rem;
    box-sizing: border-box;
    position: relative;
    margin: auto;
    @include flex_box(column, space-between, center);
  }
  .passWordLoginTitle {
    position: absolute;
    top: -0.2rem;
    left: 50%;
    margin-left: -0.54rem;
    @include flex_box(column, center, center);
    img {
      width: 1.08rem;
    }
  }
  .passWordBox {
    flex: 1;
    width: 100%;
    @include flex_box(column, none, stretch);
  }
  .passWordItem {
    width: 100%;
    padding-left: 0.24rem;
    box-sizing: border-box;
    height: 0.65rem;
    margin-top: 0.32rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    @include flex_box(row, none, center);
    span {
      font-size: 0.2rem;
      line-height: 0.27rem;
      color: #909090;
      padding-right: 0.12rem;
      border-right: 1px solid #909090;
    }
    input {
      background-color: #efefef;
      font-size: 0.2rem;
      line-height: 0.27rem;
      color: #909090;
    }
    .passWordItem_l {
      padding-left: 0.12rem;
    }
  }
  .userRule {
    height: 0.48rem;
    @include flex_box(row, none, center);
    font-size: 0.18rem;
    span:nth-of-type(2) {
      color: #f35c14;
    }
  }
  .passWordSub {
    width: 100%;
    height: 0.8rem;
    border-radius: 0.1rem;
    background-color: #f35c14;
    @include flex_box(row, center, center);

    span {
      font-size: 0.32rem;
      line-height: 0.43rem;
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
  .passWordLogin {
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
  .passWordLoginTitle {
    position: absolute;
    top: -0.9rem;
    left: 50%;
    margin-left: -0.9rem;
    @include flex_box(column, center, center);
    img {
      width: 1.8rem;
    }
  }
  .passWordBox {
    flex: 1;
    width: 100%;
    @include flex_box(column, none, stretch);
  }
  .passWordItem {
    width: 100%;
    padding-left: 0.29rem;
    box-sizing: border-box;
    height: 0.68rem;
    background-color: #efefef;
    border-radius: 0.1rem;
    margin-top: 0.38rem;
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
  .userRule {
    height: 0.6rem;
    @include flex_box(row, none, center);
    font-size: 0.18rem;
    span:nth-of-type(2) {
      color: #f35c14;
    }
  }
  .passWordSub {
    width: 100%;
    height: 0.72rem;
    border-radius: 0.1rem;
    background-color: #f35c14;
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
    width: 0.84rem;
    height: 0.84rem;
    @include flex_box(row, center, center);
    img {
      width: 0.48rem;
    }
  }
}
</style>