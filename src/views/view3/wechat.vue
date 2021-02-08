<template>
  <div class="wechat">
    <div class="wechatTitle">
      <div class="wechatTitle_l">
        <span>公众号</span>
      </div>
    </div>
    <div class="wechatContent">
      <span>关注官方公众号，领取福利礼包</span>
      <img :src="gzhIcon" alt />
      <span>公众号：草莓游戏</span>
      <span>长按二维码一键关注</span>

    </div>
    <div class="copyBtn" @click="copy" @mouseenter="copy()" ref="btn" data-clipboard-text="草莓游戏">
      <span>点击复制</span>
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
  name: "wechat",
  data() {
    return {
      header: require("../../assets/img/header.png"),
      outIcon: require("../../assets/img/out.png"),
      // gzhIcon: require("../../assets/img/haixiang.jpg"),//海象公众号
      // gzhIcon: require("../../assets/img/hongmao.jpg"),//虹猫公众号
      gzhIcon: require("../../assets/img/cmyx.jpg"),//草莓游戏公众号
    };
  },
  created() {
    //   this.getSize()
  },
  methods: {
    back() {
      this.$store.dispatch("IsWechatFun", false);
      this.$store.dispatch("IsUserInfoMaskFun", true);
    },
    copy() {
      let _this = this;
      let btn = this.$refs.btn;
      var clipboard = new Clipboard(btn);
      clipboard.on("success", function (e) {
        _this.$toast.text("已复制");
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

@media all and (orientation: portrait) {
  .wechat {
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

@media all and (orientation: landscape) {
  .wechat {
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
  .wechatContent {
    flex: 1;
    @include flex_box(column, none, center);
    span {
      color: #282b2d;
      &:nth-of-type(1) {
        margin-top: 0.23rem;
        font-size: 0.28rem;
        line-height: 0.37rem;
      }
      &:nth-of-type(2) {
        margin-top: 0.15rem;
        font-size: 0.23rem;
        line-height: 0.31rem;
      }
       &:nth-of-type(3) {
        margin-top: 0.15rem;
        font-size: 0.23rem;
        line-height: 0.31rem;
        color: #f35c14;
      }
    }
    img {
      width: 1.95rem;
      margin-top: 0.2rem;
    }
  }
  .copyBtn {
    height: 0.59rem;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    background-color: #f35c14;
    margin-bottom: 0.14rem;
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
@media 
all and (orientation: landscape) and (min-width:600px) and (min-height:800px),
all and (min-device-aspect-ratio:3/4) and (max-device-aspect-ratio:4/3),
all and (device-aspect-ratio:4/3) {
  .wechat {
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
@media 
all and (orientation: portrait),
all and (orientation: landscape) and (min-width:600px) and (min-height:800px),
all and (min-device-aspect-ratio:3/4) and (max-device-aspect-ratio:4/3),
all and (device-aspect-ratio:4/3)  {
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
  .wechatContent {
    flex: 1;
    @include flex_box(column, none, center);
    span {
      color: #282b2d;
      &:nth-of-type(1) {
        margin-top: 0.37rem;
        font-size: 0.34rem;
        line-height: 0.46rem;
      }
      &:nth-of-type(2) {
        margin-top: 0.17rem;
        font-size: 0.28rem;
        line-height: 0.37rem;
      }
       &:nth-of-type(3) {
        margin-top: 0.25rem;
        font-size: 0.28rem;
        line-height: 0.37rem;
        color:  #f35c14;
      }
    }
    img {
      width: 3.45rem;
      margin-top: 0.41rem;
    }
  }
  .copyBtn {
    height: 0.8rem;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    background-color: #f35c14;
    margin-bottom: 0.5rem;
    span {
      font-size: 0.32rem;
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