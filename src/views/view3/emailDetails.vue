<template>
  <div class="emailDetails">
    <div class="emailDetailsTitle">
      <div class="emailDetailsTitle_l">
        <span>邮件详情</span>
      </div>
    </div>
    <div class="emailDetailsContent">
      <span>关注公众号，无限活动，无限礼品</span>
      <span>2020-08-28</span>
      <span>积分是为了感谢广大游娱粉丝对爱微游的支持，根据用户体验游戏，游戏中心活跃度等情况推出的一项长期的回馈服务积分是为了感谢广大游娱粉丝对爱微游的支持，根据用户体验游戏，游戏中心活跃度等情况推出的一项长期的回馈服务。积分作为游娱积分商城的一种货币，可用于兑换积分商城里面的各种虚拟奖励，游戏礼包等。</span>
    </div>
    <div class="outWin">
      <img :src="outIcon" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "emailDetails",
  data() {
    return {
      header: require("../../assets/img/header.png"),
      outIcon: require("../../assets/img/out.png"),
      right: require("../../assets/img/right.png"),
      emailDetailsList: [
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
        {
          time: "08-28",
          title: "关注公众号，无限活动，无限礼品",
        },
      ],
    };
  },
  created() {
    //   this.getSize()
  },
  mounted(){

  },
  methods: {},
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
@media all and (orientation: portrait) {
  .emailDetails {
    background: #fff;
    width: 7.5rem;
    height: 8.69rem;
    padding: 0 0.45rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem 0.2rem 0 0;
    @include flex_box(column, none, stretch);
  }
  .emailDetailsTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    min-height: 1.23rem;
  }
  .emailDetailsTitle_l {
    @include flex_box(row, none, center);
    height: 0.53rem;
    border-left: 0.08rem solid #f35c14;
    padding-left: 0.22rem;
    span {
      font-size: 0.38rem;
      color: #282b2d;
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
@media all and (orientation: landscape) {
  .emailDetails {
    background: #fff;
    width: 6.65rem;
    height: 5.5rem;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, none, stretch);
  }
  .emailDetailsTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    min-height: 1.02rem;
  }
  .emailDetailsTitle_l {
    @include flex_box(row, none, center);
    height: 0.39rem;
    border-left: 0.06rem solid #f35c14;
    padding-left: 0.16rem;
    span {
      font-size: 0.27rem;
      color: #282b2d;
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
    width: 1.36rem;
    height: 1.23rem;
    @include flex_box(row, center, center);
    img {
      width: 0.47rem;
    }
  }
}
</style>