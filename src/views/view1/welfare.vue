<template>
  <div class="welfare">
    <div class="welfareTitle" v-if="taskType == 1 || taskType == 2">
      <div
        class="welfareTitleItem"
        :class="taskType == 1 ? 'welfareTitleItem_sel' : ''"
        @click="(taskType = 1), (lastStop = 'one')"
      >
        <span>福利任务</span>
      </div>
      <div
        class="welfareTitleItem"
        :class="taskType == 2 ? 'welfareTitleItem_sel' : ''"
        @click="toOtherTask"
      >
        <span>额外任务</span>
        <div class="redDot" v-if="$store.state.otherWelfareRed == '1'">
          <span>1</span>
        </div>
      </div>
    </div>
    <div class="welfareTitle" v-if="taskType == 3">
      <div class="welfareContentTitle" @click="taskType = 3">
        <span>福利礼包内容</span>
      </div>
    </div>
    <div class="taskOne" v-if="taskType == 1">
      <div class="activate activate2">
        <span>点击礼包名称查看礼包内容</span>
      </div>
      <div class="welfareTaskList" v-if="welfareList.length > 0">
        <div
          class="welfareTaskItem"
          v-for="(item, index) in welfareList"
          :key="index"
          @click="toTaskDetails"
        >
          <div class="welfareTaskItem_l">
            <span class="welfareTaskItem_l_l">任务:{{ index + 1 }}</span>
            <div class="welfareTaskItem_l_r">
              <span>{{ item.taskName }}</span>
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div
            class="welfareTaskItem_r taskType01"
            v-if="item.status == 1"
            @click.stop="
              getWelfare(item.id, item.wfGiftId, item.status, index, 1)
            "
          >
            <span>可领取</span>
          </div>
          <div
            class="welfareTaskItem_r taskType02"
            v-if="item.status == 2"
            @click.stop="
              getWelfare(item.id, item.wfGiftId, item.status, index, 1)
            "
          >
            <span>已完成</span>
          </div>
          <div
            class="welfareTaskItem_r taskType03"
            v-if="item.status == 0"
            @click.stop="
              getWelfare(item.id, item.wfGiftId, item.status, index, 1)
            "
          >
            <span>待完成</span>
          </div>
        </div>
      </div>
    </div>
    <div class="taskTwo" v-if="taskType == 2">
      <div class="activate">
        <span>{{
          otherTaskUnlocked > 0 ? "已激活" : "充值任意金额即可激活额外任务"
        }}</span>
      </div>
      <div class="welfareTaskList" v-if="otherWelfareList.length > 0">
        <div
          class="welfareTaskItem"
          v-for="(item, index) in otherWelfareList"
          :key="index"
          @click="toTaskDetails"
        >
          <div class="welfareTaskItem_l">
            <span class="welfareTaskItem_l_l">任务:{{ index + 1 }}</span>
            <div class="welfareTaskItem_l_r">
              <span>{{ item.taskName }}</span>
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div
            class="welfareTaskItem_r taskType01"
            v-if="item.status == 1"
            @click.stop="
              getWelfare(item.id, item.wfGiftId, item.status, index, 2)
            "
          >
            <span>可领取</span>
          </div>
          <div
            class="welfareTaskItem_r taskType02"
            v-if="item.status == 2"
            @click.stop="
              getWelfare(item.id, item.wfGiftId, item.status, index, 2)
            "
          >
            <span>已完成</span>
          </div>
          <div
            class="welfareTaskItem_r taskType03"
            v-if="item.status == 0"
            @click.stop="
              getWelfare(item.id, item.wfGiftId, item.status, index, 2)
            "
          >
            <span>待完成</span>
          </div>
        </div>
      </div>
    </div>
    <div class="taskContent" v-if="taskType == 3">
      <div
        class="giftListItem"
        v-for="(item, index) in welfareContentList"
        :key="index"
      >
        <div class="giftListItem_l">
          <div class="giftListItem_l_r">
            <span>{{ item.title }}</span>
            <span>{{ item.content }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="outWin" @click="back">
      <img :src="outIcon" alt />
    </div>
    <div class="tipWin" v-if="isTipShow">
      <div class="tipBox">
        <div class="tipMessage">
          <span
            >奖励已提交申请。申请通过后将会通过邮件发送到当前角色，请耐心等待！</span
          >
        </div>
        <div class="tipSub" @click="closeTipSub">
          <span>确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hex_md5 } from "@/common/js/md5.js";
import fun from "@/common/js/common";
export default {
  name: "welfare",
  data() {
    return {
      header: require("../../assets/img/header.png"),
      outIcon: require("../../assets/img/out.png"),
      right: require("../../assets/img/right.png"),
      appid: "",
      adid: "",
      agentId: "",
      userInfo: {},
      lastStop: "one", //上一次停留的页面
      taskType: 1, //显示的任务类型
      isTipShow: false,
      tipShowMessage: "",
      gameId: "", //所属游戏id
      welfareList: [], //福利任务列表
      welfareContentList: [], //额外任务列表
      otherWelfareList: [], //礼包内容
      otherTaskUnlocked: "", //额外任务解锁状态
      serviceInfo: {},
    };
  },
  created() {
    //   this.getSize()
  },
  mounted() {
    //获取用户信息
    this.userInfo =
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};
    this.serviceInfo = localStorage.getItem("serviceInfo")
      ? JSON.parse(localStorage.getItem("serviceInfo"))
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

    this.getGiftData(1);
  },
  methods: {
    back() {
      if (this.taskType == 3) {
        if (this.lastStop == "one") {
          this.taskType = 1;
        } else if (this.lastStop == "two") {
          this.taskType = 2;
        }
      } else {
        this.$store.dispatch("IsWelfareFun", false);
        this.$store.dispatch("IsUserInfoMaskFun", true);
      }
    },
    toOtherTask() {
      this.$store.commit("postOtherWelfareRed","0");
      this.taskType = 2;
      this.lastStop = "two";
      this.getGiftData(2);
    },
    toTaskDetails() {
      this.taskType = 3;
    },
    closeTipSub() {
      this.isTipShow = false;
    },
    getGiftData(type) {
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
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        wfType: type,
        dateTime: time,
        type: 1,
        sign: sign,
      };
      this.$http
        .post(
          fun.apiDomain + "sdk/new/welfareTask/getWelfareTaskAndGiftNameList",
          data
        )
        .then(function (res) {
          if (res.body.code == 200) {
            if (res.body.data.length > 0) {
              if (type == 1) {
                this.welfareList = res.body.data;
                this.gameId = res.body.data[0].gameId;
                this.getGiftDataContent(res.body.data[0].gameId);
              } else if (type == 2) {
                this.unlockOtherTask(res.body.data[0].id);
                this.otherWelfareList = res.body.data;
              }
            }
          }
        });
    },
    getGiftDataContent(gameId) {
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
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        gameId: gameId,
        dateTime: time,
        type: 1,
        sign: sign,
      };
      this.$http
        .post(
          fun.apiDomain + "sdk/new/welfareTask/getWelfareTaskGiftsByGameId",
          data
        )
        .then(function (res) {
          if (res.body.code == 200) {
            this.welfareContentList = res.body.data;
          }
        });
    },

    getWelfare(id, giftId, taskType, index, dataType) {
      if (!this.serviceInfo.roleId) {
        this.$toast.text("请先进入游戏再领取哦！");
        return false;
      }
      //任务id，礼包id，任务领取状态，列表索引，任务类型，
      if (dataType == 2 && this.otherTaskUnlocked == -1) {
        this.$toast.text("此任务非额外任务！");
      } else if (dataType == 2 && this.otherTaskUnlocked == 0) {
        this.$toast.text("您还未解锁额外任务");
        return false;
      }
      if (taskType == "2") {
        this.$toast.text("已领取过");
        return false;
      } else if (taskType == "0") {
        this.$toast.text("未完成");
        return false;
      }
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
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        gameId: this.gameId,
        dateTime: time,
        type: 1,
        sign: sign,
        id: id,
        giftId: giftId,
        gameId: this.gameId,
        wfType: 1,
        roleId: this.serviceInfo.roleId ? this.serviceInfo.roleId : "",
        roleName: this.serviceInfo.roleName ? this.serviceInfo.roleName : "",
      };

      this.$http
        .post(
          fun.apiDomain + "sdk/new/welfareTask/receiveWelfareTaskGift",
          data
        )
        .then(function (res) {
          if (res.body.code == 200) {
            if (res.body.data == 1) {
              this.isTipShow = true;
              this.$store.commit("redWelfare");
              if (dataType == 1) {
                this.welfareList[index].status = 2;
              } else if (dataType == 2) {
                this.otherWelfareList[index].status = 2;
              }
            } else if (res.body.data == 2) {
              this.$toast.text("已领取过");
            } else if (res.body.data == 3) {
              this.$toast.text("未解锁不可领取");
            }
          }
        });
    },
    unlockOtherTask(taskId) {
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
        adid: this.adid,
        agentId: this.agentId,
        appid: this.appid,
        id: taskId,
        dateTime: time,
        type: 1,
        wfType: 2,
        sign: sign,
      };
      this.$http
        .post(fun.apiDomain + "sdk/new/welfareTask/unlockWelfareTaskGift", data)
        .then(function (res) {
          if (res.body.code == 200) {
            this.otherTaskUnlocked = res.body.data;
          } else {
            this.$toast.text(res.body.msg);
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
@media all and (orientation: portrait) {
  .welfare {
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
  .welfare {
    background: #fff;
    width: 6.65rem;
    height: 5.5rem;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, none, stretch);
  }
  .welfareTitle {
    @include flex_box(row, space-between, stretch);
    border-bottom: 1px solid #efefef;
    min-height: 1rem;
  }
  .welfareTitleItem {
    border-bottom: 1px solid #efefef;
    flex: 1;
    @include flex_box(row, center, center);
    span {
      font-size: 0.28rem;
      color: #909090;
    }
    .redDot {
      position: absolute;
      top: 0.1rem;
      right: 0.88rem;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      @include flex_box(row, center, center);
      background-color: #f35c14;
      span {
        // padding: 0 0.1rem;
        font-size: 0.12rem;
        color: #fff;
      }
    }
  }
  .welfareContentTitle {
    border-bottom: 1px solid #efefef;
    flex: 1;
    @include flex_box(row, flex-start, center);
    span {
      padding-left: 0.23rem;
      font-size: 0.28rem;
      color: #282b2d;
    }
  }
  .welfareTitleItem_sel {
    border-color: #f35c14;
    span {
      color: #f35c14;
    }
  }

  .taskOne,
  .taskTwo,
  .taskContent {
    flex: 1;
    @include flex_box(column, none, stretch);
    overflow-y: scroll;
  }
  .giftList {
    overflow-y: scroll;
    @include flex_box(column, none, stretch);
  }
  .welfareTaskItem,
  .giftListItem {
    padding: 0.3rem 0;
    border-bottom: 1px solid #efefef;
    @include flex_box(row, space-between, center);
  }
  .welfareTaskItem_l,
  .giftListItem_l {
    flex: 1;
    @include flex_box(row, none, flex-start);
  }
  .welfareTaskItem_l_l,
  .giftListItem_l_l {
    font-weight: bold;
    font-size: 0.28rem;
    line-height: 0.37rem;
    color: #282b2d;
  }
  .welfareTaskItem_l_r,
  .giftListItem_l_r {
    padding-left: 0.14rem;
    @include flex_box(column, none, none);
    span:nth-of-type(1) {
      color: #282b2d;
      font-size: 0.28rem;
      line-height: 0.37rem;
    }
    span:nth-of-type(2) {
      margin-top: 0.06rem;
      color: #909090;
      font-size: 0.21rem;
      line-height: 0.28rem;
    }
  }
  .welfareTaskItem_r {
    margin-left: 0.18rem;
    @include flex_box(row, center, center);
    width: 1.2rem;
    height: 0.46rem;
    border-radius: 0.1rem;
    span {
      font-size: 0.2rem;
    }
  }

  .taskType01 {
    background-color: #f35c14;
    span {
      color: #fff;
    }
  }
  .taskType02 {
    background-color: #efefef;
    span {
      color: #909090;
    }
  }
  .taskType03 {
    border: 1px solid #f35c14;
    box-sizing: border-box;
    background-color: #fff;
    span {
      color: #f35c14;
    }
  }
  .activate {
    margin-top: 0.2rem;
    @include flex_box(row, center, center);
    width: 5.9rem;
    min-height: 0.59rem;
    background-color: #efefef;
    border: 1px solid #707070;
    box-sizing: border-box;
    border-radius: 0.1rem;
    span {
      font-size: 0.23rem;
      color: #909090;
    }
  }
  .activate2 {
    border: none;
  }
  .tipWin {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    @include flex_box(column, center, center);
  }
  .tipBox {
    width: 5.2rem;
    height: 2.96rem;
    border-radius: 0.3rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
    background-color: #fff;
    @include flex_box(column, space-between, stretch);
  }
  .tipMessage {
    flex: 1;
    @include flex_box(row, stretch, center);
    span {
      text-align: center;
      font-size: 0.24rem;
      font-weight: bold;
      line-height: 0.5rem;
      color: #282b2d;
    }
  }
  .tipSub {
    // width: 1.5rem;
    height: 0.55rem;
    background-color: #f35c14;
    border-radius: 0.08rem;
    @include flex_box(row, center, center);
    margin-bottom: 0.31rem;
    span {
      font-size: 0.23rem;
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
@media all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .welfare {
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
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .welfareTitle {
    @include flex_box(row, space-between, stretch);
    border-bottom: 1px solid #efefef;
    // width: 6.5rem;
    min-height: 1.21rem;
  }
  .welfareTitleItem {
    border-bottom: 1px solid #efefef;
    flex: 1;
    @include flex_box(row, center, center);
    span {
      font-size: 0.34rem;
      color: #909090;
    }
    .redDot {
      position: absolute;
      top: 0.18rem;
      right: 1rem;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      @include flex_box(row, center, center);
      background-color: #f35c14;
      span {
        // padding: 0 0.1rem;
        font-size: 0.12rem;
        color: #fff;
      }
    }
  }
  .welfareContentTitle {
    border-bottom: 1px solid #efefef;
    flex: 1;
    @include flex_box(row, flex-start, center);
    span {
      font-size: 0.34rem;
      color: #282b2d;
      padding-left: 0.28rem;
    }
  }
  .welfareTitleItem_sel {
    border-color: #f35c14;
    span {
      color: #f35c14;
    }
  }

  .taskOne,
  .taskTwo,
  .taskContent {
    flex: 1;
    @include flex_box(column, none, stretch);
    overflow-y: scroll;
  }
  .giftList {
    overflow-y: scroll;
    @include flex_box(column, none, stretch);
  }
  .welfareTaskItem,
  .giftListItem {
    padding: 0.64rem 0;
    border-bottom: 1px solid #efefef;
    @include flex_box(row, space-between, center);
  }
  .giftListItem {
    padding: 0.5rem 0;
  }
  .welfareTaskItem_l,
  .giftListItem_l {
    flex: 1;
    @include flex_box(row, none, flex-start);
  }
  .welfareTaskItem_l_l,
  .giftListItem_l_l {
    font-weight: bold;
    font-size: 0.3rem;
    line-height: 0.46rem;
    color: #282b2d;
  }
  .welfareTaskItem_l_r,
  .giftListItem_l_r {
    flex: 1;
    padding-left: 0.14rem;
    @include flex_box(column, none, none);
    span:nth-of-type(1) {
      color: #282b2d;
      font-size: 0.3rem;
      line-height: 0.46rem;
    }
    span:nth-of-type(2) {
      margin-top: 0.06rem;
      color: #909090;
      font-size: 0.27rem;
      line-height: 0.36rem;
    }
  }
  .giftListItem_l_r {
    span:nth-of-type(1) {
      color: #f35c14;
    }
  }
  .welfareTaskItem_r {
    margin-left: 0.2rem;
    @include flex_box(row, center, center);
    width: 1.47rem;
    height: 0.57rem;
    border-radius: 0.1rem;
    span {
      font-size: 0.25rem;
    }
  }

  .taskType01 {
    background-color: #f35c14;
    span {
      color: #fff;
    }
  }
  .taskType02 {
    background-color: #efefef;
    span {
      color: #909090;
    }
  }
  .taskType03 {
    border: 1px solid #f35c14;
    box-sizing: border-box;
    background-color: #fff;
    span {
      color: #f35c14;
    }
  }
  .activate {
    margin-top: 0.38rem;
    @include flex_box(row, center, center);
    width: 6.6rem;
    min-height: 0.72rem;
    background-color: #efefef;
    border: 1px solid #707070;
    box-sizing: border-box;
    border-radius: 0.1rem;
    span {
      font-size: 0.28rem;
      color: #909090;
    }
  }
  .activate2 {
    border: none;
  }
  .tipWin {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    @include flex_box(column, center, center);
  }
  .tipBox {
    width: 6.35rem;
    height: 3.6rem;
    border-radius: 0.36rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
    background-color: #fff;
    @include flex_box(column, space-between, stretch);
  }
  .tipMessage {
    flex: 1;
    @include flex_box(row, stretch, center);
    span {
      text-align: center;
      font-size: 0.3rem;
      line-height: 0.54rem;
      font-weight: bold;
      color: #282b2d;
    }
  }
  .tipSub {
    height: 0.66rem;
    background-color: #f35c14;
    border-radius: 0.1rem;
    @include flex_box(row, center, center);
    margin-bottom: 0.39rem;
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