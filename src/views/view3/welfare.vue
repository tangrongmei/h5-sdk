<template>
  <div class="welfare">
    <div class="welfareTitle">
      <div
        class="welfareTitleItem"
        :class="taskType == 1?'welfareTitleItem_sel':''"
        @click="taskType = 1"
      >
        <span>福利任务</span>
      </div>
      <div
        class="welfareTitleItem"
        :class="taskType == 2?'welfareTitleItem_sel':''"
        @click="taskType = 2"
      >
        <span>额外任务</span>
      </div>
    </div>

    <div class="welfareContent">
      <div class="taskOne" v-if="taskType == 1">
        <div class="welfareTaskList" v-if="taskOneShow == 'list'">
          <div class="welfareTaskItem" v-for="(item,index) in welfareList" :key="index" @click="toTaskOneDetails">
            <div class="welfareTaskItem_l">
              <span class="welfareTaskItem_l_l">任务:{{index+1}}</span>
              <div class="welfareTaskItem_l_r">
                <span>{{item.title}}</span>
                <span>{{item.details}}</span>
              </div>
            </div>
            <div
              class="welfareTaskItem_r taskType01"
              v-if="item.type==1"
              @click.stop="getWelfare(item.type,index,'1')"
            >
              <span>可领取</span>
            </div>
            <div
              class="welfareTaskItem_r taskType02"
              v-if="item.type==2"
              @click.stop="getWelfare(item.type,index,'1')"
            >
              <span>已完成</span>
            </div>
            <div
              class="welfareTaskItem_r taskType03"
              v-if="item.type==3"
              @click.stop="getWelfare(item.type,index,'1')"
            >
              <span>待完成</span>
            </div>
          </div>
        </div>
        <div class="giftList" v-if="taskOneShow == 'details'">
          <div class="giftListItem" v-for="(item,index) in welfareGiftList" :key="index">
            <div class="giftListItem_l">
              <span class="giftListItem_l_l">任务:{{index+1}}</span>
              <div class="giftListItem_l_r">
                <span>{{item.title}}</span>
                <span>{{item.details}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="taskTwo" v-if="taskType ==2">
        <div class="welfareTaskList" v-if="taskTwoShow == 'list'">
          <div class="activate">
            <span>立即激活</span>
          </div>
          <div class="welfareTaskItem" v-for="(item,index) in otherWelfareList" :key="index">
            <div class="welfareTaskItem_l">
              <span class="welfareTaskItem_l_l">任务:{{index+1}}</span>
              <div class="welfareTaskItem_l_r">
                <span>{{item.title}}</span>
                <span>{{item.details}}</span>
              </div>
            </div>
            <div
              class="welfareTaskItem_r taskType01"
              v-if="item.type==1"
              @click="getWelfare(item.type,index,'2')"
            >
              <span>可领取</span>
            </div>
            <div
              class="welfareTaskItem_r taskType02"
              v-if="item.type==2"
              @click="getWelfare(item.type,index,'2')"
            >
              <span>已完成</span>
            </div>
            <div
              class="welfareTaskItem_r taskType03"
              v-if="item.type==3"
              @click="getWelfare(item.type,index,'2')"
            >
              <span>待完成</span>
            </div>
          </div>
        </div>
        <div class="giftList" v-if="taskTwoShow == 'details'">
          <div class="giftListItem" v-for="(item,index) in otherWelfareGiftList" :key="index">
            <div class="giftListItem_l">
              <span class="giftListItem_l_l">任务:{{index+1}}</span>
              <div class="giftListItem_l_r">
                <span>{{item.title}}</span>
                <span>{{item.details}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="outWin" @click="back">
      <img :src="outIcon" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "welfare",
  data() {
    return {
      header: require("../../assets/img/header.png"),
      outIcon: require("../../assets/img/out.png"),
      right: require("../../assets/img/right.png"),
      taskType: 1, //显示的任务类型
      taskOneShow:'list',
      taskTwoShow:'list',
      welfareList: [
        {
          title: "注册即领",
          details: "6元代金券*1",
          type: 1,
        },
        {
          title: "第二天登陆",
          details: "6元代金券*1",
          type: 2,
        },
        {
          title: "第三天登陆",
          details: "6元代金券*1",
          type: 3,
        },
        {
          title: "第四天登陆",
          details: "6元代金券*1",
          type: 1,
        },
        {
          title: "第五天登陆",
          details: "6元代金券*1",
          type: 3,
        },
      ],
      welfareGiftList:[{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },],
      otherWelfareList: [
        {
          title: "注册即领",
          details: "6元代金券*1",
          type: 1,
        },
        {
          title: "第二天登陆",
          details: "6元代金券*1",
          type: 2,
        },
        {
          title: "第三天登陆",
          details: "6元代金券*1",
          type: 3,
        },
        {
          title: "第四天登陆",
          details: "6元代金券*1",
          type: 1,
        },
        {
          title: "第五天登陆",
          details: "6元代金券*1",
          type: 3,
        },
      ],
      otherWelfareGiftList:[{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },{
        title:"福利礼包1",
        details:"元宝*10000、金币*500万、真气*300万、月神舞*1、装备秘钥*50"
      },],
    };
  },
  created() {
    //   this.getSize()
  },
  mounted() {},
  methods: {
    back() {
      this.$store.dispatch("IsWelfareFun", false);
      this.$store.dispatch("IsUserInfoMaskFun", true);
    },
    toTaskOneDetails(){
      this.taskOneShow = "details"
    },
    getWelfare(type, index, dataType) {
      if (type == "1") {
        if (dataType == "1") {
          this.welfareList[index].type = 2;
        } else if (dataType == "2") {
          this.otherWelfareList[index].type = 2;
        }
        this.$toast.text("领取成功");
      } else if (type == "2") {
        this.$toast.text("已领取过");
      } else if (type == "3") {
        this.$toast.text("未完成");
      }
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
@media all and (orientation: portrait){
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
    // width: 6.5rem;
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
  }
  .welfareTitleItem_sel {
    border-color: #f35c14;
    span {
      color: #f35c14;
    }
  }
  .welfareContent {
    flex: 1;
    overflow: hidden;
    @include flex_box(column, none, stretch);
  }
  .welfareTaskList {
    overflow-y: scroll;
    @include flex_box(column, none, stretch);
  }
  .welfareTaskItem {
    padding: 0.3rem 0;
    border-bottom: 1px solid #efefef;
    @include flex_box(row, space-between, center);
  }
  .welfareTaskItem_l {
    flex: 1;
    @include flex_box(row, none, flex-start);
  }
  .welfareTaskItem_l_l {
    font-weight: bold;
    font-size: 0.28rem;
    line-height: 0.37rem;
    color: #282b2d;
  }
  .welfareTaskItem_l_r {
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
@media all and (orientation: landscape) and (min-width:600px) and (min-height:800px),
all and (min-device-aspect-ratio:3/4) and (max-device-aspect-ratio:4/3),
all and (device-aspect-ratio:4/3){
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
@media 
all and (orientation: portrait),
all and (orientation: landscape) and (min-width:600px) and (min-height:800px),
all and (min-device-aspect-ratio:3/4) and (max-device-aspect-ratio:4/3),
all and (device-aspect-ratio:4/3) {
  
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
  }
  .welfareTitleItem_sel {
    border-color: #f35c14;
    span {
      color: #f35c14;
    }
  }
  .welfareContent {
    flex: 1;
    overflow: hidden;
    @include flex_box(column, none, stretch);
  }
  .welfareTaskList {
    overflow-y: scroll;
    @include flex_box(column, none, stretch);
  }
  .welfareTaskItem {
    padding: 0.64rem 0;
    border-bottom: 1px solid #efefef;
    @include flex_box(row, space-between, center);
  }
  .welfareTaskItem_l {
    flex: 1;
    @include flex_box(row, none, flex-start);
  }
  .welfareTaskItem_l_l {
    font-weight: bold;
    font-size: 0.34rem;
    line-height: 0.46rem;
    color: #282b2d;
  }
  .welfareTaskItem_l_r {
    padding-left: 0.14rem;
    @include flex_box(column, none, none);
    span:nth-of-type(1) {
      color: #282b2d;
      font-size: 0.34rem;
      line-height: 0.46rem;
    }
    span:nth-of-type(2) {
      margin-top: 0.06rem;
      color: #909090;
      font-size: 0.27rem;
      line-height: 0.36rem;
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