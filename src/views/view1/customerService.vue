<template>
  <div class="customerService">
    <div class="customerTitle">
      <div class="customerTitle_l">
        <span>联系客服</span>
      </div>
    </div>
    <div class="customerQQ">
      <span>联系客服QQ：</span>
      <span>400 135 5185</span>
    </div>
    <div class="copyBtn"  @click="copy" @mouseenter="copy()" ref="btn" data-clipboard-text="400 135 5185">
      <span>点击复制</span>
    </div>
    <div class="outWin" @click="back">
      <img :src="outIcon" alt />
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "customerService",
  data() {
    return {
      header: require("../../assets/img/header.png"),
      outIcon: require("../../assets/img/out.png"),
    };
  },
  created() {
    //   this.getSize()
  },
  methods: {
    back() {
      this.$store.dispatch("IsCustomerServiceFun", false);
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
@media all and (orientation: portrait) {
  .customerService {
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


@media all and (orientation: landscape) {
  .customerService {
    background: #fff;
    border-radius: 0.1rem;
    width: 6.65rem;
    height: 5.5rem;
    border-radius: 0 0.2rem 0.2rem 0;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    @include flex_box(column, none, stretch);
  }
  .customerTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    min-height: 1.02rem;
  }
  .customerTitle_l {
    @include flex_box(row, none, center);
    height: 0.4rem;
    border-left: 0.06rem solid #f35c14;
    padding-left: 0.16rem;
    span {
      font-size: 0.28rem;
      color: #282b2d;
    }
  }
  .customerQQ {
    @include flex_box(row, center, center);
    padding: 1.39rem 0;
    span {
      color: #f35c14;
      font-size: 0.29rem;
      &:nth-of-type(2) {
        text-decoration: underline;
      }
    }
  }
  .copyBtn {
    height: 0.59rem;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    background-color: #f35c14;
    margin-top: 0.47rem;
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
  .customerService {
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
@media 
all and (orientation: portrait),
all and (orientation: landscape) and (min-width:600px) and (min-height:800px),
all and (min-device-aspect-ratio:3/4) and (max-device-aspect-ratio:4/3),
all and (device-aspect-ratio:4/3) {
  .customerTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    height: 1.24rem;
  }
  .customerTitle_l {
    @include flex_box(row, none, center);
    height: 0.48rem;
    border-left: 0.07rem solid #f35c14;
    padding-left: 0.2rem;
    span {
      font-size: 0.34rem;
      color: #282b2d;
    }
  }
  .customerQQ {
    @include flex_box(row, center, center);
    padding: 2.6rem 0;
    span {
      color: #f35c14;
      font-size: 0.34rem;
      line-height: 0.46rem;
      &:nth-of-type(2) {
        text-decoration: underline;
        line-height: 0.5rem;
      }
    }
  }
  .copyBtn {
    height: 0.72rem;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    background-color: #f35c14;
    margin-top: 0.4rem;
    span {
      font-size: 0.28rem;
      color: #fff;
    }
  }
  .outWin {
    position: absolute;
    right: 0;
    top: 0;
    width: 1.38rem;
    height: 1.24rem;
    @include flex_box(row, center, center);
    img {
      width: 0.48rem;
    }
  }
}
</style>