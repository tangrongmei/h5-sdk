<template>
  <div class="email">
    <div class="emailTitle">
      <div class="emailTitle_l">
        <span v-if="!isDetails">我的消息</span>
        <span v-if="isDetails">消息详情</span>
      </div>
    </div>
    <div class="emailContent">
      <div class="emailList" v-if="!isDetails">
        <div
          class="emailItem"
          :class="index == emailList.length - 1 ? 'borderNone' : ''"
          v-for="(item, index) in emailList"
          :key="index"
          @click="toEmailDetails(index, item)"
        >
          <span class="emailItem_time">{{ item.createTime }}</span>
          <span class="emailItem_title" :class="item.isRead ? 'read' : ''">{{
            item.title
          }}</span>
          <img class="emailItem_img" :src="right" alt />
        </div>
      </div>
      <div class="emailDetailsContent" v-if="isDetails">
        <span>{{ emailList[select].title }}</span>
        <span>{{ emailList[select].createTime }}</span>
        <span>{{ emailList[select].content }}</span>
      </div>
    </div>
    <div class="outWin" @click="back">
      <img :src="outIcon" alt />
    </div>
  </div>
</template>

<script>
import fun from "@/common/js/common.js";
import { hex_md5 } from "@/common/js/md5.js";
export default {
  name: "email",
  props: ["emailData"],
  data() {
    return {
      header: require("../../assets/img/header.png"),
      outIcon: require("../../assets/img/out.png"),
      right: require("../../assets/img/right.png"),
      isDetails: false,
      select: 0,
      appid: "",
      adid: "",
      agentId: "",
      userInfo: {},
      emailList: [],
    };
  },
  created() {
    //   this.getSize()
  },
  mounted() {
    var _this = this;
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
    this.emailList = this.getEmailsData();
  },
  methods: {
    back() {
      if (this.isDetails) {
        this.isDetails = false;
      } else {
        this.$store.dispatch("IsEmailFun", false);
        this.$store.dispatch("IsUserInfoMaskFun", true);
      }
    },
    getEmailsData() {
      var data = this.$store.state.emailData;
      var newData = [];
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].isRead != "3") {
            var item = {};
            item.isRead = data[i].isRead;
            item = Object.assign(item, data[i].sdkNews);
            item.createTime = fun.formDate(item.createTime);
            item.updateTime = fun.formDate(item.updateTime);
            newData.push(item);
          }
        }
      }
      return newData;
    },

    toEmailDetails(idx, item) {
      this.isDetails = true;
      this.select = idx;
      this.emailList[idx].isRead = 1;
      this.postEmailState(item);
      this.$store.commit("redEmails");
    },
    postEmailState(item) {
      var time = new Date().getTime();
      var sign = hex_md5(
        this.adid +
          this.agentId +
          this.appid +
          (this.userInfo.uid ? this.userInfo.uid : time) +
          time +
          "d76f8025623554b843631ee676a9b8c5"
      );
      var data = {
        userId: this.userInfo.uid,
        sdkNewsId: item.id,
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        msgType: item.msgType,
        dateTime: time,
        type: 1,
        pageNum: 1,
        pageSiz: 15,
        sign: sign,
      };

      this.$http
        .post(fun.apiDomain + "sdk/new/getNewsDetail", data)
        .then(function (res) {
          if (res.body.code == 200) {
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
::-webkit-scrollbar {
  display: none;
}
// 正常竖屏样式
@media all and (orientation: portrait) {
  .email {
    background: #fff;
    width: 7.5rem;
    height: 8.73rem;
    padding: 0 0.45rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem 0.2rem 0 0;
    @include flex_box(column, none, stretch);
  }
}
// 正常横屏样式
@media all and (orientation: landscape) {
  .email {
    background: #fff;
    width: 6.65rem;
    height: 5.5rem;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, none, stretch);
  }
  .emailTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    min-height: 1.02rem;
  }
  .emailContent {
    flex: 1;
    overflow: hidden;
    @include flex_box(column, none, stretch);
  }
  .emailTitle_l {
    @include flex_box(row, none, center);
    height: 0.39rem;
    border-left: 0.06rem solid #f35c14;
    padding-left: 0.16rem;
    span {
      font-size: 0.27rem;
      color: #282b2d;
    }
  }
  .emailList {
    @include flex_box(column, none, stretch);
    overflow-y: scroll;
  }
  .emailItem {
    @include flex_box(row, space-between, center);
    padding-left: 0.22rem;
    border-bottom: 1px solid #efefef;
    min-height: 1.12rem;
    .emailItem_time {
      font-size: 0.18rem;
      color: #848484;
    }
    .emailItem_title {
      margin: 0 0.34rem;
      flex: 1;
      font-size: 0.21rem;
      color: #f35c14;
    }
    .emailItem_img {
      width: 0.38rem;
    }
    .read {
      color: #848484;
    }
  }
  .emailDetailsContent {
    @include flex_box(column, none, stretch);
    padding: 0 0.22rem;
    span:nth-of-type(1) {
      margin-top: 0.3rem;
      font-size: 0.25rem;
      line-height: 0.33rem;
      color: #f35c14;
    }
    span:nth-of-type(2) {
      margin-top: 0.07rem;
      font-size: 0.2rem;
      line-height: 0.27rem;
      color: #848484;
    }
    span:nth-of-type(3) {
      max-height: 2.6rem;
      margin-top: 0.26rem;
      font-size: 0.32rem;
      line-height: 0.5rem;
      color: #000000;
      overflow-y: scroll;
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
  .email {
    background: #fff;
    width: 7.5rem;
    height: 8.73rem;
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
  .emailTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    min-height: 1.24rem;
  }
  .emailTitle_l {
    @include flex_box(row, none, center);
    height: 0.53rem;
    border-left: 0.08rem solid #f35c14;
    padding-left: 0.22rem;
    span {
      font-size: 0.38rem;
      color: #282b2d;
    }
  }
  .emailContent {
    flex: 1;
    overflow: hidden;
    @include flex_box(column, none, stretch);
  }
  .emailList {
    @include flex_box(column, none, stretch);
    overflow-y: scroll;
  }
  .emailItem {
    @include flex_box(row, space-between, center);
    padding-left: 0.27rem;
    border-bottom: 1px solid #efefef;
    min-height: 1.49rem;
    .emailItem_time {
      font-size: 0.23rem;
      color: #848484;
    }
    .emailItem_title {
      margin: 0 0.34rem;
      flex: 1;
      font-size: 0.29rem;
      color: #f35c14;
    }

    .emailItem_img {
      width: 0.47rem;
    }
    .read {
      color: #848484;
    }
  }
  .emailDetailsContent {
    @include flex_box(column, none, stretch);
    padding: 0 0.24rem;
    span:nth-of-type(1) {
      margin-top: 0.37rem;
      font-size: 0.3rem;
      line-height: 0.4rem;
      color: #f35c14;
    }
    span:nth-of-type(2) {
      margin-top: 0.12rem;
      font-size: 0.23rem;
      line-height: 0.21rem;
      color: #848484;
    }
    span:nth-of-type(3) {
      max-height: 5.27rem;
      margin-top: 0.4rem;
      font-size: 0.3rem;
      line-height: 0.54rem;
      color: #000000;
      overflow: hidden;
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