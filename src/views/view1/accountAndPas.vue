<template>
  <!-- 注册成功 -->
  <div class="accountAndPas winBox">
    <div class="headerTite">
      <span>账号密码截图</span>
    </div>
    <div class="content" id="content" ref="imageDom">
      <img :src="logoImg" class="logoImg" />
      <div class="account">
        <span>账号：</span>
        <span>{{ userInfo.uname }}</span>
      </div>
      <div class="password">
        <span>密码：</span>
        <span>{{ $store.state.registerPwd }}</span>
      </div>
      <div class="accountAndPasTip">
        <span>请妥善保管好自己的账号密码，勿与他人分享！</span>
        <span>点击红点钱包可查看等级红包</span>
        <span class="closeTip">5s后自动关闭</span>
      </div>
    </div>
    <!-- <div class="base">
      <span>长按保存截图</span>

      <img :src="baseImg" class="baseImg" alt />
    </div> -->
  </div>
</template>
<script>
import { hex_md5 } from "@/common/js/md5";
// import html2canvas from "html2canvas";
export default {
  props: ["isShowContact", "isCloseBtn"],
  data() {
    return {
      userInfo: "",
      returnRightImg: require("../../assets/img/right.png"), // 返回
      closeImg: require("../../assets/img/greyclose.png"), // 关闭
      // logoImg: require("../../assets/img/logo.png"),
      logoImg: require("../../assets/img/cmLogo.png"),
      baseImg: "",
    };
  },
  creater() {},
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.canvas();
  },
  methods: {
    //返回
    back: function () {
      this.$store.dispatch("IsCustomerServiceFun", false);
      this.$store.dispatch("IsShowFun", true);
    },
    // 关闭当前窗口
    closeWin: function () {
      this.$store.dispatch("IsCustomerServiceFun", false);
    },

    canvas() {
      html2canvas(document.getElementById("content"), {
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        var timers = new Date();
        var fullYear = timers.getFullYear();
        var month = timers.getMonth() + 1;
        var date = timers.getDate();
        var randoms = Math.random() + "";
        //年月日加上随机数
        var numberFileName =
          fullYear + "" + month + date + randoms.slice(3, 10);
        var imgData = canvas.toDataURL();

        // canvas为转换后的Canvas对象
        // let oImg = new Image();
        // oImg.src = canvas.toDataURL(); // 导出图片
        // this.baseImg = canvas.toDataURL("image/png");
        // document.body.appendChild(oImg); // 将生成的图片添加到body
        var saveFile = function (data, filename) {
          var save_link = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "a"
          );
          save_link.href = data;
          save_link.download = filename;

          var event = document.createEvent("MouseEvents");
          event.initMouseEvent(
            "click",
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null
          );
          save_link.dispatchEvent(event);
        };
        //最终文件名+文件格式
        var filename = numberFileName + ".png";
        saveFile(imgData, filename);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  box-shadow: none;
  /*去除阴影*/
  outline: none;
  /*聚焦input的蓝色边框*/
  resize: none;
  /*textarea 禁止拖拽*/
  border: none;
  /*去除边框*/
  -webkit-appearance: none;
  /*常用于IOS下移除原生样式*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /*点击高亮的颜色*/
}
.accountAndPas {
  width: 80%;
  max-width: 360px;
  height: 300px;
  background: #fff;
  border-radius: 10px;
  font-size: 14px;
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
}
/* 账号 */
.headerTite {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  /* background: #007AFF; */
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  background-color: #f35c14;
  color: #ffffff;
}
.logoImg {
  width: 60px;
}
.content {
  flex: 1;
  width: 100%;
  padding: 10px 10px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.account,
.password {
  padding: 10px 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  span:nth-of-type(1) {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  span:nth-of-type(2) {
    font-size: 14px;
    color: #f35c14;
  }
}
.accountAndPasTip {
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    font-size: 12px;
    line-height: 24px;
    color: #ff0000;
  }
  .closeTip{
    font-size: 12px;
    color: #bebebe;
  }
}
.base {
  position: absolute;
  width: 200px;
  height: 200px;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
  background-color: aqua;
}
.baseImg {
  width: 150px;
}
</style>