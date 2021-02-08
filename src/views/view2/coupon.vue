<template>
  <div class="coupon">
    <div class="couponTitle">
      <div class="couponTitle_l">
        <span>代金券</span>
      </div>
    </div>
    <div class="couponList" v-if="showType == 'vertical'">
      <nut-swiper
        direction="horizontal"
        :swiperData="couponList"
        :paginationVisible="true"
        :paginationClickable="true"
        ref="demo2"
      >
        <div
          v-for="(arr, index) in team1"
          :key="index"
          class="nut-swiper-slide couponListPage"
        >
          <div
            v-for="(item, idx) in arr"
            :key="idx"
            class="couponListItem"
            @click="getCoupon"
          >
            <span class="couponMoney">{{ item.money }}</span>
            <span class="couponThreshold">{{ item.threshold }}</span>
            <div class="moneyIcon">
              <img :src="moneyIcon" alt />
            </div>
          </div>
        </div>
      </nut-swiper>
    </div>
    <div class="couponList" v-if="showType == 'across'">
      <nut-swiper
        direction="horizontal"
        :swiperData="couponList"
        :paginationVisible="true"
        :paginationClickable="true"
        ref="demo2"
      >
        <div
          v-for="(arr, index) in team2"
          :key="index"
          class="nut-swiper-slide couponListPage"
        >
          <div
            v-for="(item, idx) in arr"
            :key="idx"
            class="couponListItem"
            @click="getCoupon"
          >
            <span class="couponMoney">{{ item.money }}</span>
            <span class="couponThreshold">{{ item.threshold }}</span>
            <div class="moneyIcon">
              <img :src="moneyIcon" alt />
            </div>
          </div>
        </div>
      </nut-swiper>
    </div>
    <div class="couponSub" @click="getCoupon">
      <span>获取代金券</span>
    </div>
    <div class="outWin" @click="back">
      <img :src="outIcon" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "coupon",
  data() {
    return {
      outIcon: require("../../assets/img/out.png"),
      moneyIcon: require("../../assets/img/moneyIcon.png"),
      team1: "",
      team2: "",
      showType: "vertical",
      couponList: [
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },

        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
        {
          money: 6,
          threshold: "无门槛",
        },
      ],
    };
  },
  created() {
    //   this.getSize()
  },
  mounted() {
    var _this = this;
    this.team1 = this.getData(6);
    this.team2 = this.getData(4);
    this.getShowType();
    window.addEventListener("resize", function () {
      _this.getShowType();
    });
  },
  methods: {
    back() {
      this.$store.dispatch("IsCouponFun", false);
      this.$store.dispatch("IsUserInfoMaskFun", true);
    },
    getData(num) {
      var result = [];
      for (var i = 0; i < this.couponList.length; i += num) {
        result.push(this.couponList.slice(i, i + num));
      }
      return result;
    },
    getShowType() {
      var w = document.documentElement.clientWidth;
      var h = document.documentElement.clientHeight;
      if (
        (window.orientation == 90 ||
          window.orientation == -90 ||
          (window.screen.orientation && window.screen.orientation.angle == 90) ||
          (window.screen.orientation && window.screen.orientation.angle == -90)) &&
        (w / h < 3 / 4 || w / h > 4 / 3)
      ) {
        this.showType = "across";
      } else {
        this.showType = "vertical";
      }
    },
    getCoupon() {
      this.$toast.text("暂未开放，敬请期待");
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
  .coupon {
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
  .coupon {
    background: #fff;
    width: 7.32rem;
    height: 5.5rem;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, space-between, stretch);
  }
  .couponTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    height: 1.02rem;
  }
  .couponTitle_l {
    @include flex_box(row, none, center);
    height: 0.39rem;
    border-left: 0.06rem solid #f35c14;
    padding-left: 0.16rem;
    span {
      font-size: 0.28rem;
      color: #282b2d;
    }
  }
  .couponList {
    flex: 1;
    @include flex_box(column, none, center);
  }
  .couponListPage {
    @include flex_box(row, space-between, stretch);
    flex-wrap: wrap;
  }
  .couponListItem {
    background: url("../../assets/img/couponIcon.png") no-repeat 0 0;
    background-size: 1.51rem auto;
    margin-top: 0.5rem;
    width: 1.51rem;
    // width: 25%;
    height: 1.62rem;
    @include flex_box(column, none, center);
    position: relative;
  }
  .couponMoney {
    margin-top: 0.2rem;
    font-size: 0.65rem;
    line-height: 0.86rem;
    color: #fff;
  }
  .couponThreshold {
    font-size: 0.2rem;
    line-height: 0.3rem;
    color: #fff;
  }
  .moneyIcon {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.72rem;
    height: 0.58rem;
    @include flex_box(row, center, center);
    img {
      width: 0.16rem;
    }
  }
  .couponSub {
    height: 0.59rem;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    background-color: #f35c14;
    margin-bottom: 0.24rem;
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
@media all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .coupon {
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
  .couponTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    height: 1.23rem;
  }
  .couponTitle_l {
    @include flex_box(row, none, center);
    height: 0.53rem;
    border-left: 0.08rem solid #f35c14;
    padding-left: 0.22rem;
    span {
      font-size: 0.38rem;
      color: #282b2d;
    }
  }
  .couponList {
    flex: 1;
    @include flex_box(column, none, center);
  }
  .couponListPage {
    @include flex_box(row, space-between, stretch);
    flex-wrap: wrap;
  }
  .couponListItem {
    background: url("../../assets/img/couponIcon.png") no-repeat 0 0;
    background-size: 1.94rem auto;
    margin-top: 0.2rem;
    width: 1.94rem;
    // width: 33%;
    height: 2.09rem;
    @include flex_box(column, none, center);
    position: relative;
  }
  .couponMoney {
    margin-top: 0.32rem;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #fff;
  }
  .couponThreshold {
    font-size: 0.25rem;
    line-height: 0.38rem;
    color: #fff;
  }
  .moneyIcon {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.76rem;
    height: 0.54rem;
    @include flex_box(row, center, center);
    img {
      width: 0.19rem;
    }
  }
  .couponSub {
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