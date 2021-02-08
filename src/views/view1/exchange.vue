<template>
  <div class="exchange">
    <div class="exchange_box" v-if="!isShowList">
      <div class="exchangeBox" v-if="exchangeShow">
        <div class="header">
          <div class="headerIcon" @click="back">
            <img :src="backImg" class="exchangeBack" />
          </div>
          <div class="title">
            <span class="titleText">兑换</span>
          </div>
          <div class="headerIcon" @click="close">
            <img :src="closeImg" class="exchangeClose" />
          </div>
        </div>
        <div class="selectBox">
          <Select v-model="model1" class="selectItem" @on-change="selPrize">
            <Option
              v-for="item in prizeList"
              :value="item.id"
              :key="item.id"
              @click.native="getMoreParams(item)"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="model2"
            class="selectItem"
            @on-change="selPrizeMoney"
          >
            <Option
              v-for="item in prizeMoneyData"
              :value="item.id"
              :key="item.id"
              >{{ item.price }}</Option
            >
          </Select>
          <div class="submitBtn" @click="exchangeSub">
            <span class="submitBtn_t">兑换</span>
          </div>
        </div>
        <div class="exchangeRule">
          <div class="exchangeRuleTitle">
            <span>奖励兑换规则</span>
          </div>
          <div class="exchangeRuleList">
            <span
              >1、提现：余额和现金比例为1:1，如10元余额可兑换10元现金红包，无提现金额限制，玩家提现时需填写支付宝姓名和手机号；</span
            >
            <span>2、兑换：可兑换话费/京东E卡/视频VIP，具体兑换金额待定；</span>
          </div>
        </div>
        <div class="bindTip" v-if="bindTip">
          <div class="bindTipText">
            <span>{{ bindTipText[0] }}！</span>
            <span>{{ bindTipText[1] }}</span>
          </div>
        </div>
      </div>
      <div class="gameRule" v-if="isInfoWin">
        <div class="header">
          <div
            class="headerIcon"
            @click="(isInfoWin = false), (exchangeShow = true)"
          >
            <img :src="backImg" class="exchangeBack" />
          </div>
          <div class="title">
            <span class="titleText">个人资料</span>
          </div>
          <div
            class="headerIcon"
            @click="(isInfoWin = false), (exchangeShow = true)"
          >
            <img :src="closeImg" class="exchangeClose" />
          </div>
        </div>
        <div class="formBox">
          <div class="input">
            <div class="qqIConBox">
              <img :src="userImg" class="qqIcon" />
            </div>
            <input
              class="inputText"
              placeholder="点击填写姓名"
              v-model="nameValue"
            />
          </div>
          <div class="input" v-if="isQq">
            <div class="qqIConBox">
              <img :src="qqICon" class="qqIcon" />
            </div>
            <input
              class="inputText"
              placeholder="点击填写QQ号"
              v-model="qqValue"
            />
          </div>
          <div class="input">
            <div class="qqIConBox">
              <img :src="phoneICon" class="phoneIcon" />
            </div>
            <input
              class="inputText"
              placeholder="点击填写手机号码"
              v-model="phoneValue"
            />
          </div>
          <div class="hint">
            <span>提示：</span>
            <span>1，填写个人绑定支付宝手机号码</span>
            <span>2，支付宝绑定姓名</span>
            <span>3，兑换腾讯视频VIP卡，需填QQ账号</span>
          </div>
          <div class="submitBtn" @click="submitInfo">
            <span>提交</span>
          </div>
        </div>
      </div>
    </div>
    <div class="exchangeList" v-if="isShowList">
      <div class="header">
        <div class="headerIcon" @click="back">
          <img :src="backImg" class="exchangeBack" />
        </div>
        <div class="title">
          <span class="titleText">兑换</span>
        </div>
        <div class="headerIcon" @click="close">
          <img :src="closeImg" class="exchangeClose" />
        </div>
      </div>
      <div class="rechargeMessage">
        <div class="messageTitle">
          <div
            class="messageTitle_l"
            :class="exchangeListType == 1 ? 'active' : ''"
            @click="selexchangeListType(1)"
          >
            <span class="messageTitle_t">奖励明细</span>
          </div>
          <div
            class="messageTitle_l"
            :class="exchangeListType == 2 ? 'active' : ''"
            @click="selexchangeListType(2)"
          >
            <span class="messageTitle_t">兑换记录</span>
          </div>
        </div>
        <div class="listTitle">
          <span class="listTitle_left">时间</span>
          <span class="listTitle_middle">金额</span>
          <span class="listTitle_right" v-if="exchangeListType == 1">收入</span>
          <span class="listTitle_right" v-if="exchangeListType == 2">支出</span>
        </div>
        <div class="listBox">
          <div class="list" v-if="exchangeListType == 1">
            <div
              class="listItem"
              v-for="(item, index) of exchangeDetail"
              :key="index"
            >
              <span class="listItem_left">{{ item.createTime }}</span>
              <span class="listItem_middle">{{ item.amount }}</span>
              <span class="listItem_right" v-if="item.status == 0">未发送</span>
              <span class="listItem_right" v-if="item.status == 1">已发送</span>
            </div>
          </div>
          <div class="list" v-if="exchangeListType == 2">
            <div
              class="listItem"
              v-for="(item, index) of exchangeRecord"
              :key="index"
            >
              <span class="listItem_left">{{ item.createTime }}</span>
              <span class="listItem_middle">{{ item.amount }}</span>
              <span class="listItem_right" v-if="item.status == 0">待处理</span>
              <span class="listItem_right" v-if="item.status == 1">已发奖</span>
              <span class="listItem_right" v-if="item.status == 2">已驳回</span>
              <span class="listItem_right" v-if="item.status == 3">已通过</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirmBox" v-if="confirmBoxShow">
      <div class="confirmWin">
        <div class="confirmTitle">
          <span>提示</span>
          <div class="confirmCloseBtn" @click="confirmBoxShow = false">
            <img :src="closeImg" />
          </div>
        </div>
        <div class="confirmContent">
          <span>确认要提交吗？</span>
        </div>
        <div class="confirmBtnBox">
          <div class="confirmBtn" @click="confirmBoxShow = false">
            <span>取消</span>
          </div>
          <div class="confirmBtn" @click="submitUserMessage">
            <span>确定</span>
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
      qqICon: require("../../assets/img/qq.png"),
      aliIcon: require("../../assets/img/ali.png"),
      phoneICon: require("../../assets/img/phone2.png"),
      userImg: require("../../assets/img/user.png"),
      adid: "",
      userInfo: "",
      serviceInfo: {}, //角色信息
      prizeList: {}, //奖品列表
      selPrizeId: "", //奖品id
      prizeMoneyData: {}, //奖品对应价格
      selPrizeMoneyId: "", //奖品对应价格id
      isShowList: "", //是否显示兑换记录
      exchangeRecord: {}, //奖品兑换记录
      exchangeDetail: {}, //奖品兑换明细
      exchangeListType: 1, //查看列表类型
      exchangeShow: true, //显示兑换
      confirmBoxShow: false, //提交资料提示弹窗
      isQq: "", //是否需要填写QQ
      isInfoWin: false, //资料填写窗口
      nameValue: "",
      qqValue: "",
      phoneValue: "",
      userInfo: "",
      model1: "",
      model2: "",
      bindTip: false, //绑定手机号的提示
      bindTipText: "", //绑定手机号的提示内容
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
    if (this.$store.state.wzCommon.isApplyPrize) {
      this.isShowList = true;
      this.getexchangeRecord();
      this.getexchangeDetail();
    } else {
      this.isShowList = false;
      this.getPrizeList();
    }
  },
  methods: {
    //返回上一窗口
    back() {
      this.$store.dispatch("IsExchangeFun", false);
    },
    //关闭窗口
    close() {
      this.$store.dispatch("IsExchangeFun", false);
    },
    exchangeSub() {
      if (!this.selPrizeId) {
        this.$toast.text("请选择奖品");
        return false;
      }
      if (!this.selPrizeMoneyId) {
        this.$toast.text("请选择价位");
        return false;
      }
      if (this.$store.state.wzCommon.isInfo) {
        this.exchangeSubmint();
      } else {
        this.exchangeShow = false;
        this.isInfoWin = true;
      }
    },
    exchangeSubmint() {
      var data = {
        uid: this.userInfo.uid,
        convertTypeId: this.selPrizeId,
        priceId: this.selPrizeMoneyId,
        adid: this.adid,
      };
      this.$http
        .post(fun.apiDomain + "wallet/applyPrize", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.$store.dispatch("IsApplyPrizeFun", 1);
            this.$store.dispatch("WzAmountFun", res.body.data.wzAmount);
            this.$store.dispatch("IsExchangeFun", false);
          } else {
            if (res.body.msg.indexOf("请先绑定手机再进行兑换") != -1) {
              this.bindTip = true;
              this.bindTipText = res.body.msg.split("！");
              var _this = this;
              setTimeout(function () {
                _this.bindTip = false;
                _this.$store.dispatch("IsExchangeFun", false);
                _this.$store.dispatch("IsWalletFun", false);
                _this.$store.dispatch("IsBindPhoneFun", true);
              }, 1300);
            } else {
              this.$toast.text(res.body.msg);
            }
          }
        });
    },
    //获取奖品列表
    getPrizeList() {
      var data = {
        adid: this.adid,
        serverId: this.serviceInfo.serverId ? this.serviceInfo.serverId : "",
      };
      this.$http
        .post(fun.apiDomain + "wallet/getPrizeList", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.prizeList = res.body.data;
          }
        });
    },
    //选择奖品
    selPrize(val) {
      this.selPrizeId = val;
      this.getPrizeMoney(val);
    },
    //获取选择的奖品其他信息
    getMoreParams(params) {
      this.isQq = parseInt(params.isQq);
    },
    //获取奖品对应金额
    getPrizeMoney(id) {
      var data = {
        typeId: id,
      };
      this.$http
        .post(fun.apiDomain + "wallet/getPriceList", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.prizeMoneyData = res.body.data;
          }
        });
    },
    //选择奖品价格
    selPrizeMoney(val) {
      this.selPrizeMoneyId = val;
    },
    //获取奖品兑换记录
    getexchangeRecord(id) {
      var data = {
        uid: this.userInfo.uid,
        adid: this.adid,
      };
      this.$http
        .post(fun.apiDomain + "wallet/getConvertRecord", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.exchangeRecord = res.body.data;
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    //获取奖励兑换明细
    getexchangeDetail() {
      var data = {
        uid: this.userInfo.uid,
        adid: this.adid,
      };
      this.$http
        .post(fun.apiDomain + "wallet/getRewardRecord", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.exchangeDetail = res.body.data;
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    selexchangeListType(type) {
      this.exchangeListType = type;
    },
    submitInfo() {
      if (!this.nameValue) {
        this.$toast.text("请输姓名");
        return false;
      }
      if (this.isQq && !this.qqValue) {
        this.$toast.text("请输入QQ号");
        return false;
      }
      if (!this.phoneValue) {
        this.$toast.text("请输入手机号");
        return false;
      }
      this.confirmBoxShow = true;
    },
    //提交个人资料
    submitUserMessage() {
      var data = {
        uid: this.userInfo.uid,
        phone: this.phoneValue,
        realName: this.nameValue,
        qqNumber: this.qqValue,
        adid: this.adid,
      };
      this.$http
        .post(fun.apiDomain + "wallet/saveUserInfo", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.$store.dispatch("IsInfoFun", 1);
            this.confirmBoxShow = false;
            this.isInfoWin = false;
            this.exchangeShow = true;
            this.exchangeSubmint();
          } else {
            this.$toast.text(res.body.msg);
          }
        });
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
  .exchange {
    width:6.4rem;
    @include flex_box(column, none, stretch);
    overflow: hidden;
    border-radius: 0.2rem;
    @include flex_box(column, none, stretch);
  }
}
@media all and (orientation: landscape) {
  .exchange {
    width: 6.65rem;
    // height: 421px;
    @include flex_box(column, none, stretch);
    border-radius: 0.2rem;
    height: 90%;
    overflow: hidden;
  }
  .exchangeBox {
    padding-bottom: 10px;
    border-radius: 0.2rem;
    flex: 1;
    @include flex_box(column, none, stretch);
    background-color: #fff;
    position: relative;
    overflow: hidden;
  }
  .exchange_box {
    flex: 1;
    overflow: hidden;
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

  .title {
    @include flex_box(row, center, center);
  }

  .selectBox {
    @include flex_box(column, none, center);
    padding-top: 0.1rem;
  }
  .selectItem {
    width: 5rem;
    height: 36px;
    margin-top: 0.05rem;
    Option {
      height: 36px;
    }
  }
  .exchangeRule {
    width: 80%;
    height: 3rem;
    @include flex_box(column, none, stretch);
    border: 1px solid #cdcdcd;
    margin: 0.2rem auto 0;
    border-radius: 0.2rem;
    padding: 0.2rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .exchangeRuleTitle {
    @include flex_box(row, none, center);
  }
  .exchangeRuleTitle span {
    font-size: 16px;
    line-height: 22px;
    color: #303030;
  }
  .exchangeRuleList {
    @include flex_box(column, none, stretch);
    flex: 1;
    overflow: scroll;
    span {
      color: #808080;
      font-size: 12px;
      line-height: 16px;
    }
  }
  .bindTip {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    @include flex_box(row, center, center);
  }
  .bindTipText {
    width: 80%;
    padding: 15px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    @include flex_box(column, none, center);
    span {
      color: #fff;
      padding: 2px 0;
      font-size: 14px;
    }
  }
  .toast_style{
    background-color: red;
    color: yellow;
  }
  .exchangeList {
    background-color: #fff;
    border-radius: 0.2rem;
    @include flex_box(column, none, stretch);
    padding-bottom: 10px;
    flex: 1;
  }
  .rechargeMessage {
    width: 86%;
    margin: 18px auto 0;
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
  .listTitle {
    padding: 5px 12px;
    @include flex_box(row, space-between, center);
  }
  .listTitle span {
    flex: 1;
    font-size: 14px;
    color: #333;
  }
  .listTitle_left,
  .listItem_left {
    text-align: left;
  }
  .listTitle_middle,
  .listItem_middle {
    text-align: center;
  }
  .listTitle_right,
  .listItem_right {
    text-align: right;
  }
  .listBox {
    flex: 1;
    padding: 8px 0;
    box-sizing: border-box;
    height: 3rem;
    // margin-bottom: 20px;
    border: 1px solid #dddddd;
    border-radius: 8px;
    @include flex_box(column, none, stretch);
    background-color: #fff;
  }
  .list {
    @include flex_box(column, none, stretch);
    overflow: scroll;
    flex: 1;
  }
  .listItem {
    @include flex_box(row, space-between, stretch);
    height: 28px;
    padding: 0 12px;
    border-bottom: 1px solid #f5f5f5;
  }
  .listItem span {
    line-height: 28px;
    flex: 1;
    font-size: 12px;
    color: #808080;
  }
  // 个人资料
  .gameRule {
    flex: 1;
    // height: 412px;
    @include flex_box(column, none, stretch);
    border-radius: 0.2rem;
    background-color: #fff;
    padding-bottom: 10px;
  }

  .exchangeClose {
    width: 0.4rem;
  }
  .exchangeBack {
    width: 0.3rem;
  }

  .titleText {
    color: #fff;
    font-size: 19px;
  }
  .formBox {
    @include flex_box(column, none, center);
  }
  .input {
    margin-top: 13px;
    width: 5.2rem;
    height:0.74rem;
    line-height: 0.74rem;
    box-sizing: content-box;
    border: 2px solid #f5f5f5;
    border-radius: 6px;
    position: relative;
    @include flex_box(row, center, center);
  }
  .qqIConBox {
    position: absolute;
    width: 0.74rem;
    height: 0.74rem;
    left: 0;
    top: 0;
    @include flex_box(row, center, center);
  }
  .qqIcon {
    width: 0.4rem;
    height: 0.4rem;
  }
  .phoneIcon {
    width: 0.36rem;
  }
  .inputText {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .hint {
    width: 81%;
    margin-top: 0.2rem;
    @include flex_box(column, none, stretch);
    span {
      font-size: 14px;
      line-height: 24px;
      color: #808080;
    }
  }
  .submitBtn {
    margin-top: 0.06rem;
    width:4.5rem;
    min-height: 0.8rem;
    background-color: #f35c14;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    span {
      font-size: 18px;
      color: #fff;
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }

  //提交提示窗口
  .confirmBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    @include flex_box(row, center, center);
  }
  .confirmWin {
    border-radius: 0.1rem;
    width: 50%;
    max-width:5.5rem;
    @include flex_box(column, center, stretch);
  }
  .confirmTitle {
    border-radius: 0.1rem 0.1rem 0 0;
    height: 0.8rem;
    background-color: #f35c14;
    @include flex_box(row, center, center);
    position: relative;
    span {
      color: #fff;
      font-size: 16px;
    }
  }
  .confirmCloseBtn {
    width: 0.8rem;
    height: 0.8rem;
    @include flex_box(row, center, center);
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 0.4rem;
    }
  }
  .confirmContent {
    background-color: #fff;
    height: 2rem;
    @include flex_box(row, center, center);
    span {
      color: #333;
      font-size: 16px;
    }
  }
  .confirmBtnBox {
    border-radius:0 0 0.1rem 0.1rem;
    @include flex_box(row, space-around, center);
    background-color: #fff;
    padding-bottom: 10px;
  }
  .confirmBtn {
    width: 2.2rem;
    height: 0.72rem;
    @include flex_box(row, center, center);
    background-color: #f35c14;
    border-radius: 0.1rem;
    span {
      color: #fff;
      font-size: 14px;
    }
  }
}
@media all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .exchange {
    width: 90%;
    max-width: 6.7rem;
    // height: 421px;
    @include flex_box(column, none, stretch);
    border-radius: 24px;
    height: 90%;
    max-height:7rem ;
    overflow: hidden;
    // background-color: #fff;
    border-radius: 0.2rem;
    margin: auto;
    @include flex_box(column, none, stretch);
  }
}
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .exchangeBox {
    padding-bottom: 10px;
    border-radius:0.2rem;
    flex: 1;
    @include flex_box(column, none, stretch);
    background-color: #fff;
    position: relative;
  }
  .exchange_box {
    flex: 1;
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
  .title {
    @include flex_box(row, center, center);
  }

  .selectBox {
    @include flex_box(column, none, center);
    padding-top: 0.1rem;
  }
  .selectItem {
    width: 5rem;
    height: 38px;
    margin-top: 0.1rem;
    Option {
      height: 38px;
    }
  }
  .exchangeRule {
    margin-top: 0.2rem;
    width: 80%;
    height: 3rem;
    @include flex_box(column, none, stretch);
    border: 1px solid #cdcdcd;
    margin: 0.2rem auto 0;
    border-radius: 8px;
    padding: 0.25rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .exchangeRuleTitle {
    @include flex_box(row, none, center);
  }
  .exchangeRuleTitle span {
    font-size: 16px;
    line-height: 22px;
    color: #303030;
  }
  .exchangeRuleList {
    @include flex_box(column, none, stretch);
    flex: 1;
    overflow: scroll;
    span {
      color: #808080;
      font-size: 12px;
      line-height: 16px;
    }
  }
  .bindTip {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    @include flex_box(row, center, center);
  }
  .bindTipText {
    width: 80%;
    padding: 15px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    @include flex_box(column, none, center);
    span {
      color: #fff;
      padding: 2px 0;
      font-size: 14px;
    }
  }
  .exchangeList {
    flex: 1;
    background-color: #fff;
    border-radius:0.2rem;
    @include flex_box(column, none, stretch);
    padding-bottom: 10px;
  }
  .rechargeMessage {
    width: 86%;
    margin: 18px auto 0;
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
  .listTitle {
    padding: 5px 12px;
    @include flex_box(row, space-between, center);
  }
  .listTitle span {
    flex: 1;
    font-size: 14px;
    color: #333;
  }
  .listTitle_left,
  .listItem_left {
    text-align: left;
  }
  .listTitle_middle,
  .listItem_middle {
    text-align: center;
  }
  .listTitle_right,
  .listItem_right {
    text-align: right;
  }
  .listBox {
    flex: 1;
    padding: 8px 0;
    box-sizing: border-box;
    height: 150px;
    // margin-bottom: 20px;
    border: 1px solid #dddddd;
    border-radius: 8px;
    @include flex_box(column, none, stretch);
    background-color: #fff;
  }
  .list {
    @include flex_box(column, none, stretch);
    overflow: scroll;
    flex: 1;
  }
  .listItem {
    @include flex_box(row, space-between, stretch);
    height: 28px;
    padding: 0 12px;
    border-bottom: 1px solid #f5f5f5;
  }
  .listItem span {
    line-height: 28px;
    flex: 1;
    font-size: 12px;
    color: #808080;
  }
  // 个人资料
  .gameRule {
    flex: 1;
    height: 412px;
    @include flex_box(column, none, stretch);
    border-radius: 0.2rem;
    background-color: #fff;
    padding-bottom: 10px;
  }

  .exchangeClose {
    width: 0.4rem;
  }
  .exchangeBack {
    width:0.3rem;
  }

  .titleText {
    color: #fff;
    font-size: 19px;
  }
  .formBox {
    @include flex_box(column, none, center);
  }
  .input {
    margin-top: 13px;
    width: 5.2rem;
    height: 37px;
    line-height: 37px;
    box-sizing: content-box;
    border: 2px solid #f5f5f5;
    border-radius: 6px;
    position: relative;
    @include flex_box(row, center, center);
  }
  .qqIConBox {
    position: absolute;
    width: 37px;
    height: 37px;
    left: 0;
    top: 0;
    @include flex_box(row, center, center);
  }
  .qqIcon {
    width: 0.42rem;
  }
  .phoneIcon {
    width: 0.36rem;
  }
  .inputText {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .hint {
    width: 81%;
    margin-top: 10px;
    @include flex_box(column, none, stretch);
    span {
      font-size: 14px;
      line-height: 24px;
      color: #808080;
    }
  }
  .submitBtn {
    margin-top: 10px;
    width: 4.48rem;
    height: 0.8rem;
    @include flex_box(row, center, center);
    background-color: #f35c14;
    border-radius: 0.1rem;
    span {
      font-size: 18px;
      color: #fff;
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }

  //提交提示窗口
  .confirmBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    @include flex_box(row, center, center);
  }
  .confirmWin {
    width: 5.4rem;
    border-radius: 0.1rem;
    @include flex_box(column, center, stretch);
  }
  .confirmTitle {
    height:0.8rem;
    border-radius: 0.1rem 0.1rem 0 0;
    background-color: #f35c14;
    @include flex_box(row, center, center);
    position: relative;
    span {
      color: #fff;
      font-size: 16px;
    }
  }
  .confirmCloseBtn {
    width: 0.8rem;
    height: 0.8rem;
    @include flex_box(row, center, center);
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 0.4rem;
    }
  }
  .confirmContent {
    background-color: #fff;
    height: 1.5rem;
    @include flex_box(row, center, center);
    span {
      color: #333;
      font-size: 16px;
    }
  }
  .confirmBtnBox {
    @include flex_box(row, space-around, center);
    background-color: #fff;
    padding-bottom: 10px;
    border-radius: 0 0 0.1rem 0.1rem;
  }
  .confirmBtn {
    width: 2.2rem;
    height: 36px;
    @include flex_box(row, center, center);
    background-color: #f35c14;
    border-radius:0.1rem;
    span {
      color: #fff;
      font-size: 14px;
    }
  }
}
.toast_style{
  background-color: red;
}
</style>