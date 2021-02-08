<template>
  <div class="recharge">
    <div class="header">
      <div class="headerIcon" @click="back">
        <img :src="backImg" class="exchangeBack" />
      </div>
      <div class="title">
        <span class="titleText">充值</span>
      </div>
      <div class="headerIcon" @click="close">
        <img :src="closeImg" class="exchangeClose" />
      </div>
    </div>
    <div class="selectBox">
      <Select
        v-model="model1"
        class="selectItem"
        @on-change="selamount"
        placeholder="点击充值"
      >
        <Option v-for="item in rechargeData" :value="item.id" :key="item.id">{{
          item.optionName
        }}</Option>
      </Select>
    </div>
    <div class="rechargeMessage">
      <div class="messageTitle">
        <div
          class="messageTitle_l"
          :class="rechargeListType == 1 ? 'active' : ''"
          @click="selRechargeListType(1)"
        >
          <span class="messageTitle_t">奖励明细</span>
        </div>
        <div
          class="messageTitle_l"
          :class="rechargeListType == 2 ? 'active' : ''"
          @click="selRechargeListType(2)"
        >
          <span class="messageTitle_t">充值记录</span>
        </div>
      </div>
      <div class="listTitle">
        <span class="listTitle_left">时间</span>
        <span class="listTitle_middle">金额</span>
        <span class="listTitle_right" v-if="rechargeListType == 1">收入</span>
        <span class="listTitle_right" v-if="rechargeListType == 2">支出</span>
      </div>
      <div class="listBox">
        <div class="recordList" v-if="rechargeListType == 1">
          <div class="recordListContent" v-if="rechargeDetail.length > 0">
            <div
              class="listItem"
              v-for="(item, index) of rechargeDetail"
              :key="index"
            >
              <span class="listItem_left">{{ item.createTime }}</span>
              <span class="listItem_middle">{{ item.amount }}</span>
              <span v-if="item.status == 0" class="listItem_right">未发送</span>
              <span v-if="item.status == 1" class="listItem_right">已发送</span>
            </div>
          </div>
          <div class="recordListEmpty" v-if="rechargeDetail.length == 0">
            <img :src="emptyImg" />
          </div>
        </div>
        <div class="detailList" v-if="rechargeListType == 2">
          <div class="detailListContent" v-if="rechargeRecord.length > 0">
            <div
              class="listItem"
              v-for="(item, index) of rechargeRecord"
              :key="index"
            >
              <span class="listItem_left">{{ item.createTime }}</span>
              <span class="listItem_middle">{{ item.amount }}</span>
              <span v-if="item.status == 0" class="listItem_right">待处理</span>
              <span v-if="item.status == 1" class="listItem_right"
                >充值成功</span
              >
              <span v-if="item.status == 2" class="listItem_right"
                >充值失败</span
              >
            </div>
          </div>
          <div class="detailListEmpty" v-if="rechargeRecord.length == 0">
            <img :src="emptyImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fun from "@/common/js/common";
export default {
  data() {
    return {
      backImg: require("../../assets/img/back.png"), //返回
      closeImg: require("../../assets/img/closeWhite.png"), //返回
      emptyImg: require("../../assets/img/none.png"), //返回
      adid: "",
      userInfo: "",
      rechargeData: [], //奖品列表
      rechargeRecord: [], //奖品兑换记录
      rechargeDetail: [], //奖品兑换明细
      rechargeListType: 1, //查看列表类型
      model1: "",
      serviceInfo: {},
    };
  },
  created() {},
  mounted() {
    this.userInfo =
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};
    this.adid = localStorage.getItem("adid")? localStorage.getItem("adid"): "";

    
    this.serviceInfo = localStorage.getItem("serviceInfo")
      ? JSON.parse(localStorage.getItem("serviceInfo"))
      : {};
    this.getRechargeData();
    this.getRechargeRecord();
    this.getRechargeDetail();
  },
  methods: {
    //返回上一窗口
    back() {
      this.$store.dispatch("IsRechargeFun", false);
    },
    //关闭窗口
    close() {
      this.$store.dispatch("IsRechargeFun", false);
    },
    //获取奖品列表
    getRechargeData() {
      var data = {
        adid: this.adid,
        serverId:  this.serviceInfo.serverID ?  this.serviceInfo.serverID : "",
      };
      this.$http
        .post(fun.apiDomain + "wallet/getProductList", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.rechargeData = res.body.data;
          }
        });
    },
    //选择奖品
    selamount(val) {
      this.selAmount = val;
      var data = {
        uid: this.userInfo.uid,
        productId: val,
        roleId: this.serviceInfo.roleId ? this.serviceInfo.roleId : "",
        serverId:this.serviceInfo.serverID ?  this.serviceInfo.serverID : "",
        adid: this.adid,
        isEmulator: 0, //是否是模拟器
      };
      this.$http
        .post(fun.apiDomain + "wallet/chargeGame", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.$toast.text(res.body.msg);
            this.$store.dispatch("WzAmountFun", res.body.data.wzAmount);
            this.$store.dispatch("IsRechargeFun", false);
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    //获取奖品充值记录
    getRechargeRecord(id) {
      var data = {
        uid: this.userInfo.uid,
        adid: this.adid,
      };
      this.$http
        .post(fun.apiDomain + "wallet/getChargeRecord", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.rechargeRecord = res.body.data;
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    //获取奖励兑换明细
    getRechargeDetail() {
      var data = {
        uid: this.userInfo.uid,
        adid: this.adid,
      };
      this.$http
        .post(fun.apiDomain + "wallet/getRewardRecord", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.rechargeDetail = res.body.data;
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    selRechargeListType(type) {
      this.rechargeListType = type;
    },
  },
};
</script>
<style lang="scss" scoped>
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
  .recharge {
    width: 90%;
    max-width: 320px;
    @include flex_box(column, none, stretch);
    border-radius: 24px;
    background-color: #fff;
    padding-bottom: 10px;
    border-radius: 0.2rem;
    @include flex_box(column, none, stretch);
  }
}
@media all and (orientation: landscape) {
  .recharge {
    width: 90%;
    max-width: 320px;
    // height: 400px;
    @include flex_box(column, none, stretch);
    border-radius: 24px;
    background-color: #fff;
    padding-bottom: 10px;
    border-radius: 0.2rem;
    @include flex_box(column, none, stretch);
  }
  .header {
    height: 0.92rem;
    @include flex_box(row, space-between, stretch);
    background-color: #f35c14;
    border-radius: 0.2rem 0.2rem 0 0;
  }
  .headerIcon,
  .headerIcon {
    width: 0.92rem;
    height: 0.92rem;
    @include flex_box(row, center, center);
  }
  .exchangeClose {
    width: 0.4rem;
  }
  .exchangeBack {
    width: 0.3rem;
  }
  .title {
    @include flex_box(row, center, center);
  }
  .titleText {
    color: #fff;
    font-size: 19px;
  }
  .selectBox {
    @include flex_box(column, none, center);
    padding-top: 0.1rem;
  }
  .rechargeMessage {
    width: 86%;
    margin: 5px auto 0;
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .messageTitle {
    padding: 10px 0;
    @include flex_box(row, none, center);
  }
  .messageTitle_l {
    flex: 1;
    @include flex_box(row, center, center);
  }
  .messageTitle_t {
    font-size: 16px;
    line-height: 16px;
    color: #303030;
  }
  .active .messageTitle_t {
    color: #eb7331;
    text-decoration: underline;
  }
  .listBox,
  .recordList,
  .detailList {
    @include flex_box(column, none, stretch);
  }
  .recordList {
    overflow-y: scroll;
  }
  .listBox {
    overflow: hidden;
    height: 3rem;
    border-radius: 8px;

    border: 1px solid #dddddd;
  }
  .recordListContent,
  .detailListContent {
    overflow: scroll;
    flex: 1;
    padding: 8px 0;
    box-sizing: border-box;
    height: 182px;
    @include flex_box(column, none, stretch);
    // background-color: #fff;
  }
  .list {
    @include flex_box(column, none, stretch);
  }
  .recordListEmpty,
  .detailListEmpty {
    padding-top: 20px;
    @include flex_box(row, center, center);
  }
  .recordListEmpty img,
  .detailListEmpty img {
    width: 140px;
  }
  .listTitle {
    padding: 5px 12px;
    @include flex_box(row, space-between, center);
  }
  .listTitle span {
    flex: 1;
    font-size: 14px;
    color: #333;
  }
  .listItem {
    @include flex_box(row, space-between, stretch);
    height: 28px;
    padding: 0 12px;
    border-bottom: 1px solid #f5f5f5;
  }
  .listItem span {
    line-height: 28px;
    font-size: 12px;
    color: #808080;
    flex: 1;
  }
  .listItem_left,
  .listTitle_left {
    text-align: left;
  }
  .listItem_middle,
  .listTitle_middle {
    text-align: center;
  }
  .listItem_right,
  .listTitle_right {
    text-align: right;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .selectItem {
    width: 250px;
    height: 40px;
    Option {
      height: 40px;
    }
  }
}
@media all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .recharge {
    width: 90%;
    max-width: 320px;
    // height: 400px;
    @include flex_box(column, none, stretch);
    border-radius: 24px;
    background-color: #fff;
    padding-bottom: 10px;
    border-radius: 0.2rem;
    margin: auto;
    @include flex_box(column, none, stretch);
  }
}
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .header {
    height: 0.92rem;
    @include flex_box(row, space-between, stretch);
    background-color: #f35c14;
    border-radius: 0.2rem 0.2rem 0 0;
  }
  .headerIcon,
  .headerIcon {
    width: 0.92rem;
    height: 0.92rem;
    @include flex_box(row, center, center);
  }
  .exchangeClose {
    width: 0.4rem;
  }
  .exchangeBack {
    width: 0.3rem;
  }
  .title {
    @include flex_box(row, center, center);
  }
  .titleText {
    color: #fff;
    font-size: 19px;
  }
  .selectBox {
    @include flex_box(column, none, center);
    padding-top: 6px;
  }
  .rechargeMessage {
    width: 86%;
    margin: 0.1rem auto 0;
    @include flex_box(column, none, stretch);
  }
  .messageTitle {
    padding: 10px 0;
    @include flex_box(row, none, center);
  }
  .messageTitle_l {
    flex: 1;
    @include flex_box(row, center, center);
  }
  .messageTitle_t {
    font-size: 16px;
    line-height: 16px;
    color: #303030;
  }
  .active .messageTitle_t {
    color: #eb7331;
    text-decoration: underline;
  }
  .listBox,
  .recordList,
  .detailList {
    @include flex_box(column, none, stretch);
  }
  .recordList {
    overflow-y: scroll;
  }
  .listBox {
    overflow: hidden;
    min-height: 3rem;
    border-radius: 8px;

    border: 1px solid #dddddd;
  }
  .recordListContent,
  .detailListContent {
    overflow: scroll;
    flex: 1;
    padding: 8px 0;
    box-sizing: border-box;
    @include flex_box(column, none, stretch);
    // background-color: #fff;
  }
  .list {
    @include flex_box(column, none, stretch);
  }
  .recordListEmpty,
  .detailListEmpty {
    @include flex_box(row, center, center);
  }
  .recordListEmpty img,
  .detailListEmpty img {
    width: 2.8rem;
  }
  .listTitle {
    padding: 5px 12px;
    @include flex_box(row, space-between, center);
  }
  .listTitle span {
    flex: 1;
    font-size: 14px;
    color: #333;
  }
  .listItem {
    @include flex_box(row, space-between, stretch);
    height: 28px;
    padding: 0 12px;
    border-bottom: 1px solid #f5f5f5;
  }
  .listItem span {
    line-height: 28px;
    font-size: 12px;
    color: #808080;
    flex: 1;
  }
  .listItem_left,
  .listTitle_left {
    text-align: left;
  }
  .listItem_middle,
  .listTitle_middle {
    text-align: center;
  }
  .listItem_right,
  .listTitle_right {
    text-align: right;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .selectItem {
    width: 5rem;
    max-width: 290px;
    height: 40px;
    Option {
      height: 40px;
    }
  }
}
</style>