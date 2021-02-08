<template>
  <!-- 我的钱包 -->
  <div class="walletBox winBox">
    <div class="wallet">
      <div class="headerTite">
        <!-- <img :src="returnRightImg" class="returnRightImg" @click="back" /> -->
        <span>我的钱包</span>
        <img :src="outIcon" class="closeImg" @click="closeWin" />
      </div>
      <div class="emptyBox"></div>
      <div class="userBox">
        <div class="userLeft">
          <span class="userName">{{
            getCaption(walletData.roleName, ".")
          }}</span>
          <span class="userMessage"
            >{{ walletData.roleLevel }}级 {{ walletData.profession }}
            {{ walletData.serverName }}区</span
          >
        </div>
        <div class="userRight">
          <div class="userRightBtn" @click="shareGame">
            <span class="userRightBtn_t">分享游戏</span>
          </div>
          <div class="userRightBtn bottomBtnBox active" @click="toGameRule">
            <span class="userRightBtn_t">游戏规则</span>
          </div>
        </div>
      </div>
      <div class="emptyBox"></div>
      <div class="balanceBox">
        <div class="balanceLeft">
          <span class="balanceText">余额：</span>
          <span class="balance">{{ $store.state.wzCommon.wzAmount }}元</span>
        </div>
        <div class="balanceRight">
          <div class="balanceRightBtn" @click="toExchange">
            <span class="balanceRightBtn_t">兑换</span>
          </div>
          <div class="balanceRightBtn active rightBtnBox" @click="toRecharge">
            <span class="balanceRightBtn_t">游戏充值</span>
          </div>
        </div>
      </div>
      <div class="listBox">
        <div class="listHeader">
          <div
            class="listHeaderItem"
            :class="isGradeType == 1 ? 'active' : ''"
            @click="selGradeType(1)"
          >
            <span class="listHeaderItem_t">等级红包</span>
            <span class="bor"></span>
          </div>
          <!-- <div class="listHeaderItem" :class="isGradeType==2?'active':''" @click="selGradeType(2)">
            <span class="listHeaderItem_t">充值红包</span>
            <span class="bor"></span>
          </div>-->
        </div>
        <div class="listConter">
          <div class="list" v-if="isGradeType == 1">
            <div
              class="listItem"
              v-for="(item, index) of gradeData"
              :key="index"
            >
              <div class="listItemLeft">
                <img :src="redPacketImg" class="listItemIcon" />
              </div>

              <div class="listItemMiddle">
                <div class="listItemMiddleTop">
                  <span class="listItemMiddle_t"
                    >{{ moneyToFixed(item.reward) }}元</span
                  >
                  <span class="listItemMiddle_t"
                    >剩余：{{
                      item.surplus == null || item.surplus == undefined
                        ? "无限量"
                        : item.surplus
                    }}</span
                  >
                </div>

                <span class="listItemMiddle_b">{{ item.rule }}</span>
              </div>
              <div
                class="listItemRight"
                @click="getGradeRedPacket(item.id, index)"
              >
                <div class="listItemRight_btn type_0" v-show="item.status == 0">
                  <span class="listItemRight_t">未达成</span>
                </div>
                <div
                  class="listItemRight_btn type_01"
                  v-show="item.status == 1"
                >
                  <span class="listItemRight_t">可领取</span>
                </div>
                <div
                  class="listItemRight_btn type_02"
                  v-show="item.status == 2"
                >
                  <span class="listItemRight_t">已领取</span>
                </div>
                <div
                  class="listItemRight_btn type_03"
                  v-show="item.status == 3"
                >
                  <span class="listItemRight_t">已过期</span>
                </div>
                <div
                  class="listItemRight_btn type_03"
                  v-show="item.status == 4"
                >
                  <span class="listItemRight_t">已抢完</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="list" v-if="isGradeType==2">
            <div class="listItem" v-for="(item,index) of rechargeData" :key="index">
              <div class="listItemLeft">
                <img :src="redPacketImg" class="listItemIcon" />
              </div>
              <div class="listItemMiddle">
                <span class="listItemMiddle_t">+{{item.reward}}元 剩余数量({{item.surplus}})</span>
                <span class="listItemMiddle_b">{{item.rule}}</span>
              </div>
              <div class="listItemRight" @click="getRechargeRedPacket(item.id,index)">
                <div class="listItemRight_btn type_0" v-show="item.status==0">
                  <span class="listItemRight_t">未达成</span>
                </div>
                <div class="listItemRight_btn type_01" v-show="item.status==1">
                  <span class="listItemRight_t">可领取</span>
                </div>
                <div class="listItemRight_btn type_02" v-show="item.status==2">
                  <span class="listItemRight_t">已领取</span>
                </div>
                <div class="listItemRight_btn type_03" v-show="item.status==3">
                  <span class="listItemRight_t">已过期</span>
                </div>
                <div class="listItemRight_btn type_03" v-show="item.status==4">
                  <span class="listItemRight_t">已抢完</span>
                </div>
              </div>
            </div>
          </div>-->
        </div>
      </div>
      <div class="opacity" v-if="opacityShow">
        <div class="getWin" v-if="getWin">
          <div class="getWinTitle">
            <span>红包领取成功，已存放到余额</span>
          </div>
          <div class="getWinBtn" @click="getRedPacketConfirm">
            <span>确定</span>
          </div>
        </div>
        <div class="qrCodeWin" v-if="qrCode">
          <div class="qrCode">
            <img class="qrCodeIcon" :src="shareGameData.qrcode" />
            <span class="qrCodeExplain_t">扫一扫</span>
          </div>
          <div class="qrCodeExplain" @click="copy" @mouseenter="copy()">
            <span class="qrCodeExplain_b">{{ shareGameData.url }}</span>
            <div
              ref="btn"
              class="qrCodeCopy"
              :data-clipboard-text="shareGameData.url"
            >
              复制链接
            </div>
          </div>
          <div class="closeWin">
            <img :src="outIcon" @click="closeQrCode" />
          </div>
        </div>
        <div class="gameRule" v-if="isGameRule">
          <div class="ruleList">
            <span>{{ shareGameData.rule }}</span>
          </div>
          <div class="gameRuleBtn" @click="gameRuleConfirm">
            <span>确定</span>
          </div>
        </div>
      </div>
      <div class="loadGameTip" v-if="this.loadGameTip">
        <span>请先进入游戏再体验</span>
      </div>
    </div>
    <div
      class="childOpacity"
      v-if="$store.state.winType.isExchange || $store.state.winType.isRecharge"
    >
      <!-- 兑换窗口 -->
      <exchange v-if="$store.state.winType.isExchange" />
      <!-- 充值窗口 -->
      <recharge v-if="$store.state.winType.isRecharge" />
    </div>
  </div>
</template>
<script>
import { hex_md5 } from "@/common/js/md5";
import fun from "@/common/js/common";
import Clipboard from "clipboard";

import exchange from "./exchange";
import recharge from "./recharge";

export default {
  props: [""],
  components: {
    exchange,
    recharge,
  },
  data() {
    return {
      userInfo: "",
      payInfo: "",
      adid: "",
      returnRightImg: require("../../assets/img/right.png"), //返回
      outIcon: require("../../assets/img/out.png"),

      redPacketImg: require("../../assets/img/redPacket.png"), // 关闭
      isGrade: true, //等级红包
      windowShow: true, //当前主窗口
      opacityShow: false, //遮罩层是否显示
      getWin: false, //领取红包后弹窗
      qrCode: false, //二维码弹窗
      isGameRule: false, //游戏规则窗口
      isWalletUser: false, //游戏规则窗口
      walletData: {}, //钱包相关信息
      shareGameData: {}, //二维码相关数据
      isGradeType: 1, //红包展示类型
      id: "",
      gradeData: [], //等级红包列表
      rechargeData: [], //充值红包列表
      serviceInfo: {},
      loadGameTip: false, //提示进入游戏
    };
  },
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
    if (this.serviceInfo.roleId) {
      this.getWalletList();
    }else if(!this.serviceInfo.roleId) {
      this.loadGameTip = true;
    }
    //获取红包相关信息
    this.getWalletData();
    //获取分享二维码和游戏规则
    this.getQrCode();
    //获取红包列表
  },
  methods: {
    // back
    back() {
      this.$store.dispatch("IsWalletFun", false);
      this.$store.dispatch("IsUserInfoMaskFun", true);
    },
    // 关闭当前窗口
    closeWin() {
      this.$store.dispatch("IsWalletFun", false);
      this.$store.dispatch("IsUserInfoMaskFun", true);
    },
    //点击兑换
    toExchange() {
      // this.windowShow = false;
      this.$store.dispatch("IsExchangeFun", true);
    },

    //点击充值
    toRecharge() {
      this.$store.dispatch("IsRechargeFun", true);
    },

    //游戏规则变化返回
    gameRuleWin(msg) {
      this.isGameRule = msg[0];
      this.windowShow = msg[1];
      if (!msg[1]) {
        this.$emit("wallet", false, false);
      }
    },
    walletUserWin(msg) {
      this.isWalletUser = msg[0];
      this.isExchange = msg[1];
    },
    //分享游戏
    shareGame() {
      this.opacityShow = true;
      this.qrCode = true;
    },
    //关闭分享游戏
    closeQrCode() {
      this.qrCode = false;
      this.opacityShow = false;
    },
    //点击游戏规则
    toGameRule() {
      this.opacityShow = true;
      this.isGameRule = true;
    },
    //游戏规则--确定
    gameRuleConfirm() {
      this.isGameRule = false;
      this.opacityShow = false;
    },
    //点击领取等级红包
    getGradeRedPacket(id, index) {
      var data = {
        uid: this.userInfo.uid,
        adid: this.adid,
        roleId: this.serviceInfo.roleId ? this.serviceInfo.roleId : "",
        serverId: this.serviceInfo.serverID ? this.serviceInfo.serverID : "",
        redPacketId: id,
      };
      this.$http
        .post(fun.apiDomain + "wallet/takeRedPacket", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.gradeData[index].status = 2;
            var balance = parseFloat(this.$store.state.wzCommon.wzAmount);
            balance += parseFloat(this.gradeData[index].reward);
            balance = balance.toFixed(2);
            this.$store.dispatch("WzAmountFun", balance);
            this.opacityShow = true;
            this.getWin = true;
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    moneyToFixed(nub) {
      return nub.toFixed(2);
    },
    //点击领取充值红包
    getRechargeRedPacket(id, index) {
      var data = {
        uid: this.userInfo.uid,
        adid: this.adid,
        roleId: this.serviceInfo.roleId ? this.serviceInfo.roleId : "",
        serverId: this.serviceInfo.serverID ? this.serviceInfo.serverID : "",
        chargeAmountId: id,
      };
      this.$http
        .post(fun.apiDomain + "wallet/takeChargeAmount", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.rechargeData[index].status = 2;
            this.balance += this.rechargeData[index].reward;
            this.opacityShow = true;
            this.getWin = true;
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    //点击领取--确定
    getRedPacketConfirm() {
      this.getWin = false;
      this.opacityShow = false;
    },
    //获取红包相关信息
    getWalletData() {
      var data = {
        uid: this.userInfo.uid,
        adid: this.adid,
        roleId: this.serviceInfo.roleId ? this.serviceInfo.roleId : "",
        serverId: this.serviceInfo.serverID ? this.serviceInfo.serverID : "",
      };
      this.$http
        .post(fun.apiDomain + "wallet/getGameUserInfo", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.walletData = res.body.data;
            this.$store.dispatch("WzAmountFun", res.body.data.money);
          }
        });
    },
    //获取分享二维码和游戏规则
    getQrCode() {
      var data = {
        adid: this.adid,
        serverId: this.serviceInfo.serverId ? this.serviceInfo.serverId : "",
      };
      this.$http
        .post(fun.apiDomain + "wallet/getGameInfo", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.shareGameData = res.body.data;
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    //获取红包列表
    getWalletList() {
      var data = {
        uid: this.userInfo.uid,
        adid: this.adid,
        roleId: this.serviceInfo.roleId ? this.serviceInfo.roleId : "",
        serverId: this.serviceInfo.serverID ? this.serviceInfo.serverID : "",
      };
      this.$http
        .post(fun.apiDomain + "wallet/getRedPacketList", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.gradeData = res.body.data;
            // for (let item of this.gradeData) {
            //   item.reward = item.reward.toFixed(2);
            // }
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    getCaption(obj, text) {
      if (obj) {
        var index = obj.indexOf(text);
        obj = obj.substring(index + 1, obj.length);
        return obj;
      }
    },
    copy() {
      let _this = this;
      let btn = this.$refs.btn;
      var clipboard = new Clipboard(btn);
      clipboard.on("success", function (e) {
        _this.$toast.text("已复制");
      });
    },
    //切换红包类型
    selGradeType(type) {
      this.isGradeType = type;
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
  //钱包相关页面总窗口
  .walletBox {
    width: 7.5rem;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
  //钱包主窗口
  .wallet {
    width: 100%;
    max-width: 400px;
    flex: 1;
    background: #fff;
    font-size: 0.14rem;
    position: relative;
    font-family: Microsoft YaHei;
    border-radius: 0.2rem 0.2rem 0 0;
    @include flex_box(column, none, stretch);
    overflow: scroll;
  }
}

@media all and (orientation: landscape) {
  //钱包相关页面总窗口
  .walletBox {
    width: 7.5rem;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, none, stretch);
  }
  //钱包主窗口
  .wallet {
    width: 100%;
    max-width: 400px;
    background: #fff;
    font-size: 0.14rem;
    position: relative;
    font-family: Microsoft YaHei;
    @include flex_box(column, none, stretch);
    overflow: scroll;
  }
  .headerTite {
    background-color: #fff;
    @include flex_box(row, center, center);
    min-height: 0.8rem;
  }
  .headerTite span {
    color: #333;
    font-size: 0.34rem;
  }
  /* 返回图标 */
  .returnRightImg {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 20px;
    top: 15px;
  }
  .closeImg {
    width: 0.8rem;
    min-height: 0.8rem;
    @include flex_box(row, center, center);
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .emptyBox {
    min-height: 9px;
    background-color: #ededed;
  }
  .userBox {
    background-color: #fff;
    @include flex_box(row, space-between, center);
    min-height: 67px !important;

    padding: 20px 12px;
    box-sizing: content-box;
  }
  .userLeft {
    @include flex_box(column, center, none);
    min-height: 67px;
  }
  .userRight {
    @include flex_box(column, space-between, none);
    min-height: 67px;
  }
  .userName {
    font-size: 19px;
    font-weight: bold;
    color: rgba(40, 43, 45, 1);
  }
  .userMessage {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(144, 144, 144, 1);
  }
  .userRightBtn {
    @include flex_box(row, center, center);
    width: 123px;
    height: 29px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    border: 1px solid rgba(243, 92, 20, 1);
    box-sizing: border-box;
  }
  .userRightBtn.active {
    background: rgba(243, 92, 20, 1);
  }
  .userRightBtn_t {
    color: rgba(243, 92, 20, 1);
  }
  .active .userRightBtn_t {
    color: rgba(255, 255, 255, 1);
  }
  .bottomBtnBox {
    margin-top: 9px;
  }
  .balanceBox {
    // margin-top: 9px;
    background-color: #fff;
    padding: 20px 12px 20px 20px;
    @include flex_box(row, space-between, stretch);
    font-weight: 400;
  }
  .balanceLeft,
  .balanceRight {
    @include flex_box(row, space-between, center);
  }
  .balanceText {
    font-size: 14px;
    color: rgba(40, 43, 45, 1);
  }
  .balance {
    font-size: 14px;
    color: rgba(243, 92, 20, 1);
  }
  .balanceRightBtn {
    width: 74px;
    height: 29px;
    border-radius: 4px;
    @include flex_box(row, center, center);
    font-size: 12px;
    font-weight: 400;
    border: 1px solid rgba(243, 92, 20, 1);
    box-sizing: border-box;
  }
  .balanceRightBtn.active {
    background: rgba(243, 92, 20, 1);
  }
  .balanceRightBtn_t {
    color: rgba(243, 92, 20, 1);
  }
  .active .balanceRightBtn_t {
    color: rgba(255, 255, 255, 1);
  }
  .rightBtnBox {
    margin-left: 12px;
  }
  .listBox {
    flex: 1;
    margin-top: 9px;
    background-color: #fff;
    padding: 20px 10px 6px 12px;
    @include flex_box(column, stretch, none);
  }
  .listHeader {
    @include flex_box(row, stretch, stretch);
    min-height: 30px !important;
    border-bottom: 2px solid rgba(237, 237, 237, 1);
    box-sizing: content-box;
    font-weight: bold;
  }
  .listHeaderItem {
    @include flex_box(column, center, stretch);
    position: relative;
    margin-right: 55px;
  }
  .listHeaderItem_t {
    font-size: 15px;
    color: rgba(40, 43, 45, 1);
  }
  .active .listHeaderItem_t {
    color: rgba(243, 92, 20, 1);
  }
  .active .bor {
    width: 100%;
    position: absolute;
    bottom: -2px;
    left: 0;
    // width: 100%;
    height: 2px;
    background-color: rgba(243, 92, 20, 1);
  }
  .listConter {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .list {
    @include flex_box(column, none, stretch);
    min-height: 416px;
  }
  .listItem {
    // box-sizing: content-box ;
    min-height: 90px !important;
    padding: 15px 0;
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #a8d2d1;
  }
  .listItemLeft {
    width: 54px;
    height: 54px;
    background: rgba(226, 226, 226, 1);
    border-radius: 4px;
    @include flex_box(row, center, center);
    margin-right: 10px;
  }
  .listItemIcon {
    width: 52px;
    // height: 43px;
    vertical-align: top;
  }
  .listItemMiddle {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .listItemMiddleTop {
    @include flex_box(row, none, stretch);
  }
  .listItemMiddle_t {
    font-size: 15px;
    color: rgba(0, 0, 0, 1);
    // line-height: 30px;
    // font-weight: 600;
    &:last-of-type {
      margin-left: 12px;
    }
  }
  .listItemMiddle_b {
    margin-top: 8px;
    font-size: 13px;
    color: rgba(144, 144, 144, 1);
  }
  .listItemRight {
    @include flex_box(row, center, center);
    height: 54px;
  }
  .listItemRight_btn {
    margin-left: 10px;
    @include flex_box(row, center, center);
    width: 72px;
    height: 29px;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .type_0 {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(144, 144, 144, 1);
  }
  .type_01 {
    background: rgba(243, 92, 20, 1);
  }
  .type_02 {
    background: rgba(237, 237, 237, 1);
  }
  .type_03 {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(215, 215, 215, 1);
  }
  .listItemRight_t {
    font-size: 12px;
    font-weight: 400;
  }
  .type_0 .listItemRight_t {
    color: rgba(144, 144, 144, 1);
  }
  .type_01 .listItemRight_t {
    color: rgba(255, 255, 255, 1);
  }
  .type_02 .listItemRight_t {
    color: rgba(181, 181, 181, 1);
  }

  .type_03 .listItemRight_t {
    color: rgba(181, 181, 181, 1);
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .opacity {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    @include flex_box(row, center, center);
    z-index: 11;
  }
  .loadGameTip {
    position: absolute;
    bottom: 0.4rem;
    @include flex_box(row, center, center);
    width: 100%;
    span {
      font-size: 14px;
      font-weight: 600;
    }
  }
  .getWin {
    width: 280px;
    height: 187px;
    background-color: rgb(255, 255, 255);
    border-radius: 18px;
    top: 50%;
    opacity: 1;
    padding: 36px 0 20px;
    @include flex_box(column, space-between, center);
    box-sizing: border-box;
  }
  .getWinTitle {
    flex: 1;
    padding: 0 20px;
    @include flex_box(row, center, center);
  }
  .getWinTitle span {
    font-size: 13px;
    color: rgba(48, 48, 48, 1);
  }
  .getWinBtn,
  .gameRuleBtn {
    width: 92px;
    height: 37px;
    background: rgba(243, 92, 20, 1);
    border-radius: 6px;
    @include flex_box(row, center, center);
  }
  .getWinBtn span,
  .gameRuleBtn span {
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
  }
  .qrCodeWin {
    width: 280px;
    height: 280px;
    background: rgba(255, 255, 255, 1);
    border-radius: 18px;
    @include flex_box(column, none, center);
    position: relative;
  }
  .qrCode {
    margin-top: 30px;
    @include flex_box(column, none, center);
  }
  .qrCodeIcon {
    width: 100%;
  }
  // .qrCodeExplain_t {
  //   margin-top: 4px;
  // }
  .qrCodeExplain {
    padding: 0 10px;
    flex: 1;
    margin-top: 6px;
    @include flex_box(column, none, center);
  }
  .qrCodeExplain_b {
    text-align: center;
    font-size: 13px;
    line-height: 16px;
  }
  .qrCodeCopy {
    flex: 1;
    font-size: 14px;
    @include flex_box(row, center, none);
    line-height: 26px;
    color: rgba(243, 92, 20, 1);
  }
  .closeWin {
    position: absolute;
    right: 0;
    top: 0;
    width: 48px;
    height: 48px;
    @include flex_box(row, center, center);
    img {
      width: 20px;
      height: 20px;
    }
  }
  //游戏规则
  .gameRule {
    width: 90%;
    height: 90%;
    max-width: 300px;
    // height: 360px;
    @include flex_box(column, none, stretch);
    border-radius: 0.2rem;
    background-color: #fff;
    overflow: hidden;
  }
  .exchangeClose {
    width: 20px;
    height: 20px;
  }
  .exchangeBack {
    width: 12px;
    height: 20px;
  }
  .title {
    @include flex_box(row, center, center);
  }
  .titleText {
    color: #fff;
    font-size: 19px;
  }
  .ruleList {
    overflow: scroll;
    width: 90%;
    margin: 20px auto 0;
    @include flex_box(column, none, stretch);
  }
  .ruleList span {
    white-space: pre-wrap;
  }
  .ruleList span {
    font-size: 14px;
    line-height: 18px;
    color: #303030;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .gameRuleBtn {
    margin: 10px auto;
    min-height: 30px;
  }
  .childOpacity {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    @include flex_box(row, center, center);
  }
}
@media all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  //钱包相关页面总窗口
  .walletBox {
    width: 7.5rem;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    margin: auto;
    border-radius: 0.2rem;
    @include flex_box(column, center, stretch);
  }
  //钱包主窗口
  .wallet {
    width: 100%;
    max-width: 400px;
    background: #fff;
    font-size: 0.14rem;
    position: relative;
    font-family: Microsoft YaHei;
    @include flex_box(column, none, stretch);
    overflow: scroll;
  }
}
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .headerTite {
    background-color: #fff;
    @include flex_box(row, center, center);
    min-height: 0.8rem;
  }
  .headerTite span {
    color: #333;
    font-size: 0.34rem;
  }
  /* 返回图标 */
  .returnRightImg {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 20px;
    top: 15px;
  }
  .closeImg {
    width: 0.8rem;
    min-height: 0.8rem;
    @include flex_box(row, center, center);
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .emptyBox {
    min-height: 9px;
    background-color: #ededed;
  }
  .userBox {
    background-color: #fff;
    @include flex_box(row, space-between, center);
    min-height: 67px !important;

    padding: 20px 12px;
    box-sizing: content-box;
  }
  .userLeft {
    @include flex_box(column, center, none);
    min-height: 67px;
  }
  .userRight {
    @include flex_box(column, space-between, none);
    min-height: 67px;
  }
  .userName {
    font-size: 19px;
    font-weight: bold;
    color: rgba(40, 43, 45, 1);
  }
  .userMessage {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(144, 144, 144, 1);
  }
  .userRightBtn {
    @include flex_box(row, center, center);
    width: 123px;
    height: 29px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    border: 1px solid rgba(243, 92, 20, 1);
    box-sizing: border-box;
  }
  .userRightBtn.active {
    background: rgba(243, 92, 20, 1);
  }
  .userRightBtn_t {
    color: rgba(243, 92, 20, 1);
  }
  .active .userRightBtn_t {
    color: rgba(255, 255, 255, 1);
  }
  .bottomBtnBox {
    margin-top: 9px;
  }
  .balanceBox {
    // margin-top: 9px;
    background-color: #fff;
    padding: 20px 12px 20px 20px;
    @include flex_box(row, space-between, stretch);
    font-weight: 400;
  }
  .balanceLeft,
  .balanceRight {
    @include flex_box(row, space-between, center);
  }
  .balanceText {
    font-size: 14px;
    color: rgba(40, 43, 45, 1);
  }
  .balance {
    font-size: 14px;
    color: rgba(243, 92, 20, 1);
  }
  .balanceRightBtn {
    width: 74px;
    height: 29px;
    border-radius: 4px;
    @include flex_box(row, center, center);
    font-size: 12px;
    font-weight: 400;
    border: 1px solid rgba(243, 92, 20, 1);
    box-sizing: border-box;
  }
  .balanceRightBtn.active {
    background: rgba(243, 92, 20, 1);
  }
  .balanceRightBtn_t {
    color: rgba(243, 92, 20, 1);
  }
  .active .balanceRightBtn_t {
    color: rgba(255, 255, 255, 1);
  }
  .rightBtnBox {
    margin-left: 12px;
  }
  .listBox {
    flex: 1;
    margin-top: 9px;
    background-color: #fff;
    padding: 20px 10px 6px 12px;
    @include flex_box(column, stretch, none);
  }
  .listHeader {
    @include flex_box(row, stretch, stretch);
    min-height: 30px !important;
    border-bottom: 2px solid rgba(237, 237, 237, 1);
    box-sizing: content-box;
    font-weight: bold;
  }
  .listHeaderItem {
    @include flex_box(column, center, stretch);
    position: relative;
    margin-right: 55px;
  }
  .listHeaderItem_t {
    font-size: 15px;
    color: rgba(40, 43, 45, 1);
  }
  .active .listHeaderItem_t {
    color: rgba(243, 92, 20, 1);
  }
  .active .bor {
    width: 100%;
    position: absolute;
    bottom: -2px;
    left: 0;
    // width: 100%;
    height: 2px;
    background-color: rgba(243, 92, 20, 1);
  }
  .listConter {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .list {
    @include flex_box(column, none, stretch);
    min-height: 416px;
  }
  .listItem {
    // box-sizing: content-box ;
    min-height: 90px !important;
    padding: 15px 0;
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #a8d2d1;
  }
  .listItemLeft {
    width: 54px;
    height: 54px;
    background: rgba(226, 226, 226, 1);
    border-radius: 4px;
    @include flex_box(row, center, center);
    margin-right: 10px;
  }
  .listItemIcon {
    width: 52px;
    // height: 43px;
    vertical-align: top;
  }
  .listItemMiddle {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .listItemMiddleTop {
    @include flex_box(row, none, stretch);
  }
  .listItemMiddle_t {
    font-size: 15px;
    color: rgba(0, 0, 0, 1);
    // line-height: 30px;
    // font-weight: 600;
    &:last-of-type {
      margin-left: 12px;
    }
  }
  .listItemMiddle_b {
    margin-top: 8px;
    font-size: 13px;
    color: rgba(144, 144, 144, 1);
  }
  .listItemRight {
    @include flex_box(row, center, center);
    height: 54px;
  }
  .listItemRight_btn {
    margin-left: 10px;
    @include flex_box(row, center, center);
    width: 72px;
    height: 29px;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .type_0 {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(144, 144, 144, 1);
  }
  .type_01 {
    background: rgba(243, 92, 20, 1);
  }
  .type_02 {
    background: rgba(237, 237, 237, 1);
  }
  .type_03 {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(215, 215, 215, 1);
  }
  .listItemRight_t {
    font-size: 12px;
    font-weight: 400;
  }
  .type_0 .listItemRight_t {
    color: rgba(144, 144, 144, 1);
  }
  .type_01 .listItemRight_t {
    color: rgba(255, 255, 255, 1);
  }
  .type_02 .listItemRight_t {
    color: rgba(181, 181, 181, 1);
  }

  .type_03 .listItemRight_t {
    color: rgba(181, 181, 181, 1);
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .opacity {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    @include flex_box(row, center, center);
    z-index: 11;
  }
  .loadGameTip {
    margin: 0 auto;
    position: absolute;
    bottom: 0.8rem;
    @include flex_box(row, center, center);
    width: 100%;
    span {
      font-size: 14px;
      font-weight: 600;
    }
  }
  .getWin {
    width: 280px;
    height: 187px;
    background-color: rgb(255, 255, 255);
    border-radius: 18px;
    top: 50%;
    opacity: 1;
    padding: 36px 0 20px;
    @include flex_box(column, space-between, center);
    box-sizing: border-box;
  }
  .getWinTitle {
    flex: 1;
    padding: 0 20px;
    @include flex_box(row, center, center);
  }
  .getWinTitle span {
    font-size: 13px;
    color: rgba(48, 48, 48, 1);
  }
  .getWinBtn,
  .gameRuleBtn {
    width: 92px;
    height: 37px;
    background: rgba(243, 92, 20, 1);
    border-radius: 6px;
    @include flex_box(row, center, center);
  }
  .getWinBtn span,
  .gameRuleBtn span {
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
  }
  .qrCodeWin {
    width: 280px;
    height: 280px;
    background: rgba(255, 255, 255, 1);
    border-radius: 18px;
    @include flex_box(column, none, center);
    position: relative;
  }
  .qrCode {
    margin-top: 30px;
    @include flex_box(column, none, center);
  }
  .qrCodeIcon {
    width: 100%;
  }
  // .qrCodeExplain_t {
  //   margin-top: 4px;
  // }
  .qrCodeExplain {
    padding: 0 10px;
    flex: 1;
    margin-top: 6px;
    @include flex_box(column, none, center);
  }
  .qrCodeExplain_b {
    text-align: center;
    font-size: 13px;
    line-height: 16px;
  }
  .qrCodeCopy {
    flex: 1;
    font-size: 14px;
    @include flex_box(row, center, none);
    line-height: 26px;
    color: rgba(243, 92, 20, 1);
  }
  .closeWin {
    position: absolute;
    right: 0;
    top: 0;
    width: 48px;
    height: 48px;
    @include flex_box(row, center, center);
    img {
      width: 20px;
      height: 20px;
    }
  }
  //游戏规则
  .gameRule {
    width: 90%;
    max-width: 360px;
    height: 90%;
    max-height: 7rem;
    @include flex_box(column, none, stretch);
    border-radius: 0.2rem;
    background-color: #fff;
    overflow: hidden;
  }
  .exchangeClose {
    width: 20px;
    height: 20px;
  }
  .exchangeBack {
    width: 12px;
    height: 20px;
  }
  .title {
    @include flex_box(row, center, center);
  }
  .titleText {
    color: #fff;
    font-size: 19px;
  }
  .ruleList {
    overflow: scroll;

    width: 90%;
    margin: 20px auto 0;
    @include flex_box(column, none, stretch);
  }
  .ruleList span {
    white-space: pre-wrap;
  }
  .ruleList span {
    font-size: 14px;
    line-height: 18px;
    color: #303030;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .gameRuleBtn {
    margin: 10px auto;
    min-height: 0.6rem;
  }
  .childOpacity {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    @include flex_box(row, center, center);
  }
}
/* 账号 */
</style>