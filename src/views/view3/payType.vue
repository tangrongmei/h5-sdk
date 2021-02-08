<template>
  <!-- 选择付款方式-- -->
  <div class="payBox">
    <div class="payTypeBox" v-if="$store.state.winType.isPayType">
      <div class="payTypeTitle">
        <div class="payTypeTitle_l">
          <span>确认付款</span>
        </div>
      </div>
      <div class="bottomContent">
        <div class="bottomContentItem">
          <p>充值金额</p>
          <p class="price">￥{{ payInfo.money }}</p>
        </div>
        <div class="bottomContentItem">
          <p>购买商品</p>
          <p>{{ payInfo.product_name }}</p>
        </div>
        <p class="payWay">请选择支付方式</p>
        <div class="paySelectWay" v-if="os == 'ios'">
          <div
            class="bottomContentItemSmall"
            v-for="(item, idx) of payList1"
            :key="idx"
            @click="selectActive = item.value"
          >
            <div class="bottomContentItemSmall_l">
              <img :src="item.img" class="wxpayImg" />
              <div>
                <span>{{ item.name }}</span>
                <span class="youbi" v-if="item.value == 'youbi'"
                  >当前剩余游币：{{ gameCurrency ? gameCurrency : 0 }}个</span
                >
              </div>
              <span class="recommendPay" v-if="item.value == 'wechat'"
                >推荐</span
              >
            </div>
            <img
              :src="selectImg"
              class="arrowImg"
              v-if="selectActive === item.value"
            />
          </div>
        </div>
        <div class="paySelectWay" v-if="os == 'android'">
          <div
            class="bottomContentItemSmall"
            v-for="(item, idx) of payList"
            :key="idx"
            @click="selectActive = item.value"
          >
            <div class="bottomContentItemSmall_l">
              <img :src="item.img" class="wxpayImg" />
              <div>
                <span>{{ item.name }}</span>
                <span class="youbi" v-if="item.value == 'youbi'"
                  >当前剩余游币：{{ gameCurrency ? gameCurrency : 0 }}个</span
                >
              </div>
              <span class="recommendPay" v-if="item.value == 'alipay'"
                >推荐</span
              >
            </div>
            <img
              :src="selectImg"
              class="arrowImg"
              v-if="selectActive === item.value"
            />
          </div>
        </div>
      </div>
      <div class="payTypeSub" @click="payMoneyNow">
        <span>立即付款</span>
      </div>
      <div class="outWin" @click="back">
        <img :src="outIcon" alt />
      </div>
    </div>
    <div v-if="$store.state.winType.isPayUrlInfo" class="payUrlInfoBox">
      <!-- sandbox="allow-top-navigation allow-scripts" -->
      <div class="closeBtn2">
        <img :src="outIcon" @click="closepayUrlInfo" />
      </div>
      <iframe
        :src="$store.state.winType.pay_url"
        sandbox="allow-top-navigation allow-scripts"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
    <div class="balanceTip" v-if="gameCurrencyTip">
      <div class="balance">
        <div class="title"><span>温馨提示</span></div>
        <div class="content"><span>余额不足</span></div>
        <div class="btn" @click="toGameCenter"><span>前往充值</span></div>
        <div class="close" @click="closeBalanceTip">
          <img :src="radiusClose" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { hex_md5 } from "@/common/js/md5.js";

import fun from "@/common/js/common";

export default {
  props: ["payInfo"],
  data() {
    return {
      payType1: true, //非ios桌面图标下的支付弹窗
      payType2: false, //ios桌面图标下的支付弹窗
      outIcon: require("../../assets/img/out.png"),
      radiusClose: require("../../assets/img/radiusClose.png"),
      selectActive: "", // 支付类型
      selectImg: require("../../assets/img/select.png"), //选中支付方式
      userInfo: "", //用户信息
      wechatType: "", // 判断微信支付类型
      payType: "", // 支付方式:支付宝h5:ALIPAY-APP ; 微信H5:WXPAY-APP; 微信公众号: WEHCAT-GZH
      wechatCode: "", // 微信code
      deskIcon: false, // 是否是桌面ICON进入
      adid: "", // 广告id
      agentId: "", // 渠道id
      appid: "", // appid
      idfa: "", //壳包专用参数
      os: "", // 系统类型
      pay_url: "", //ios桌面图标下的支付链接
      wxurl: "",
      payList: [
        {
          name: "支付宝支付",
          img: require("../../assets/img/alipay.png"),
          text: "",
          value: "alipay",
        },
        {
          name: "微信支付",
          img: require("../../assets/img/wxpay.png"),
          text: "推荐使用微信",
          value: "wechat",
        },
        {
          name: "游币充值",
          img: require("../../assets/img/youbi.png"),
          text: "",
          value: "youbi",
        },
      ],
      payList1: [
        {
          name: "微信支付",
          img: require("../../assets/img/wxpay.png"),
          text: "推荐使用微信",
          value: "wechat",
        },
        {
          name: "支付宝支付",
          img: require("../../assets/img/alipay.png"),
          text: "",
          value: "alipay",
        },
        {
          name: "游币充值",
          img: require("../../assets/img/youbi.png"),
          text: "推荐使用微信",
          value: "youbi",
        },
      ],
      gameCurrency: "",
      gameCurrencyTip: false,
    };
  },
  created() {
    //获取用户信息
    this.userInfo =
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};

    this.wechatType = this.$store.state.wechatType;
    this.wechatCode = localStorage.getItem("code")
      ? localStorage.getItem("code")
      : "";
    this.deskIcon = localStorage.getItem("deskIcon")
      ? JSON.parse(localStorage.getItem("deskIcon"))
      : "";

    this.appid = localStorage.getItem("appid")
      ? localStorage.getItem("appid")
      : "";
    this.adid = localStorage.getItem("adid")
      ? localStorage.getItem("adid")
      : "";
    this.agentId = localStorage.getItem("agentId")
      ? localStorage.getItem("agentId")
      : "";
    this.os = this.$store.state.deviceData.os;
    this.idfa = localStorage.getItem("idfa")
      ? localStorage.getItem("idfa")
      : ""; //ios壳包专用参数
    if (this.os == "ios") {
      this.selectActive = "wechat";
    } else if (this.os == "android") {
      this.selectActive = "alipay";
    }
  },
  mounted() {
    // 支付类型
    if (this.wechatType) {
      // this.payType = 'WEHCAT-GZH'
      this.payType = "WEHCAT-GZH";
    } else {
      // this.payType = 'WECHAT-H5'
      this.payType = "WXPAY-APP-IOS";
    }
    this.wxurl = localStorage.getItem("wxurl");
    this.gameCurrency = this.$store.state.gameCurrency;
  },
  methods: {
    //关闭窗口
    back() {
      this.$store.dispatch("IsPayTypeFun", false);
    },
    //关闭支付弹窗2
    closepayUrlInfo() {
      this.$store.dispatch("IsPayUrlInfoFun", false);
    },
    closeBalanceTip() {
      this.gameCurrencyTip = false;
    },
    //游戏中心
    toGameCenter() {
      let time = new Date().getTime();
      var sign = hex_md5(this.userInfo.uid ? this.userInfo.uid : "" + time);
      var device_params = {
        os: localStorage.getItem("os") ? localStorage.getItem("os") : "",
      };
      let data = {
        uid: this.userInfo.uid,
        sign: sign,
        time: time,
        os: localStorage.getItem("os") ? localStorage.getItem("os") : "",
        device_params: device_params,
        gameCenterType: localStorage.getItem("type")
          ? localStorage.getItem("type")
          : "1",
        isnuoer: localStorage.getItem("isnuoer")
          ? localStorage.getItem("isnuoer")
          : "0",
      };
      this.$http
        .post(fun.center+"gameCenter/getCenterData", data)
        .then(function (res) {
          if (res.body.code == 200) {
            var userInfo = res.body.data;
            var href =
              "http://web.bingxuer.com/#/recharge?" +
              "platform=" +
              userInfo.platform +
              "&uid=" +
              this.userInfo.uid +
              "&game_id=" +
              userInfo.game_id +
              "&channel=" +
              userInfo.channel +
              "&req_time=" +
              userInfo.req_time +
              "&expire_time=" +
              userInfo.expire_time +
              "&access_token=" +
              userInfo.access_token +
              "&type=" +
              userInfo.type +
              "&isnuoer=" +
              userInfo.isnuoer +
              "&phone=" +
              userInfo.bindPhone +
              "&card=" +
              userInfo.fcm +
              "&sign=" +
              userInfo.sign;
            window.location.href = href;
          } else {
            this.$toast.text(res.body.msg);
          }
        });
    },
    // 立即付款
    payMoneyNow() {
      // if (this.selectActive === "youbi" && this.gameCurrency < this.payInfo.money) {
      //   this.gameCurrencyTip = true;
      //   return false;
      // }
      if (this.userInfo.payFcm == 0) {
        if (this.wechatType && this.selectActive === "alipay") {
          this.$toast.text("请打开浏览器进行支付宝支付");
          return false;
        }
        this.addOrder();
      } else {
        if (this.userInfo.fcm == 1) {
          if (this.userInfo.age > 16) {
            if (this.wechatType && this.selectActive === "alipay") {
              this.$toast.text("请打开浏览器进行支付宝支付");
              return false;
            }
            this.addOrder();
          } else {
            this.$toast.text("未满16周岁不得充值");
          }
        } else {
          this.isReconise = true;
        }
      }
    },
    // 下单接口
    addOrder() {
      this.time = new Date().getTime();

      this.sign = hex_md5(
        this.payInfo.money +
          this.userInfo.uid +
          this.agentId +
          this.appid +
          this.adid +
          this.payInfo.server_id +
          this.time
      );

      let device_params = {
        uuid: localStorage.getItem("uuid") ? localStorage.getItem("uuid") : "",
        brand: "",
        isEmulator: true, //是否是模拟器
        os: localStorage.getItem("os") ? localStorage.getItem("os") : "",
        systemversion: "1.0.2",
        idfa: this.idfa,
        ip: this.$store.state.deviceData.ipAdress,
      };
      let data = {
        payType: this.payType,
        agentId: this.agentId, // 应用的渠道ID
        adid: this.adid, // 应用的广告ID
        uid: this.userInfo.uid,
        appid: this.appid, // 应用的appid
        serverid: this.payInfo.server_id, // 服务器id
        device_params: device_params,
        sign: this.sign,
        time: this.time,
        os: localStorage.getItem("os") ? localStorage.getItem("os") : "",
        extension: this.payInfo.ext, // 游戏订单ID
        productid: this.payInfo.product_id ? this.payInfo.product_id : "",
        rolename: this.payInfo.role_name,
        roleid: this.payInfo.role_id,
        money: this.payInfo.money,
        servername: this.payInfo.server_name,
        rolelevel: this.payInfo.role_level,
        productname: this.payInfo.product_name,
        ip: this.$store.state.deviceData.ipAdress,
      };

      var that = this;
      this.$http.post(fun.apiPayUrl + "paycenter/pay/addOrder", data).then(
        function (res) {
          if (res.body.code === 200) {
            that.payMoney(res.body.data.orderid);
          } else {
            that.$toast.text(res.body.msg);
          }
        },
        function (res) {}
      );
    },
    // 调起微信支付
    payMoney(orderId) {
      if (this.selectActive === "wechat") {
        if (this.wechatType) {
          // this.payType = 'WEHCAT-GZH'
          this.payType = "WECHAT-GZH";
          // 微信内支付
          if (this.wechatCode) {
            let data = {
              orderId: orderId,
              payType: this.payType,
              code: this.wechatCode,
            };
            this.$http
              .post(fun.apiPayUrl + "paycenter/pay/v5/prepay", data)
              .then(
                function (res) {
                  if (res.body.code === 200) {
                    this.$store.dispatch("IsPayTypeFun", false);

                    this.weChatParameter = res.body.data;
                    this.weichatPayInside(res.body.data);
                  } else {
                    //									let redirect_uri = escape(window.location.href)
                    let redirect_uri = this.wxurl;
                    window.location.href =
                      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe3a9a92cbd0d753e&redirect_uri=" +
                      redirect_uri +
                      "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
                    this.$toast.text("授权过期，重新授权");
                  }
                },
                function (res) {}
              );
          }
        } else {
          // this.payType = 'WECHAT-H5'
          // this.payType = 'WXPAY-APP'
          this.payType = "WXPAY-APP-IOS";
          //  这里是后端返回的URL直接进行跳转即可完成微信外支付
          let data = {
            orderId: orderId,
            payType: this.payType,
          };
          this.$http.post(fun.apiPayUrl + "paycenter/pay/v5/prepay", data).then(
            function (res) {
              if (res.body.code === 200) {
                this.$store.dispatch("IsPayTypeFun", false);

                let url = res.body.data.pay_url;
                window.location.href = url;
              } else {
                this.$toast.text(res.body.msg);
              }
            },
            function (res) {}
          );
        }
      } else if (this.selectActive === "alipay") {
        this.payType = "ALIPAY-H5";
        let data = {
          orderId: orderId,
          payType: this.payType,
          return_url: window.location.href,
        };
        var _this = this;
        this.$http.post(fun.apiPayUrl + "paycenter/pay/v5/prepay", data).then(
          function (res) {
            if (res.body.code === 200) {
              _this.$store.dispatch("IsPayTypeFun", false);

              _this.$store.commit("postIsPay", true);
              if (res.body.data.pay_url) {
                window.location.href = res.body.data.pay_url;
              } else {
                const div = document.createElement("div");
                div.innerHTML = res.body.data.AliPayHtml;
                document.body.appendChild(div);
                document.forms[0].submit();
                document.body.removeChild(div);
              }
            } else {
              this.$toast.text(res.body.msg);
            }
          },
          function (res) {
            this.$toast.text("502");
          }
        );
      } else if (this.selectActive === "youbi") {
        this.payType = "GAMECOIN-APP";
        var time = new Date().getTime();
        var sign = hex_md5(
          this.adid +
            this.agentId +
            this.appid +
            this.userInfo.uid +
            time +
            "153b8e8d884796af035dd05121e024ba"
        );
        let data = {
          orderId: orderId,
          userid: this.userInfo.uid,
          adid: this.adid,
          agentId: this.agentId,
          appid: this.appid,
          payType: this.payType,
          dateTime: time,
          type: 1,
          sign: sign,
        };
        this.$http
          .post(fun.apiPayUrl + "paycenter/pay/v5/prepay", data)
          .then(function (res) {
            if (res.body.code == 200) {
              this.$store.dispatch("IsPayTypeFun", false);
            } else {
              this.gameCurrencyTip = true;
            }
          });
      }
    },
    // 微信内支付
    weichatPayInside(data) {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.onBridgeReady(data),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady(data));
          document.attachEvent(
            "onWeixinJSBridgeReady",
            this.onBridgeReady(data)
          );
        }
      } else {
        this.onBridgeReady(data);
      }
    },
    //微信内置浏览器类
    onBridgeReady(data) {
      let _this = this;
      // this.toast(data.appId)
      // var timestamp = Math.round(data.timeStamp).toString();
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          debug: true,
          appId: data.appId, //公众号名称，由商户传入
          timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, //随机串
          package: data.package,
          signType: data.signType, //微信签名方式：
          paySign: data.paySign, //微信签名
          jsApiList: ["chooseWXPay"],
        },
        function (res) {
          // this.toast(res + '调起微信支付')
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            _this.toast("支付成功");

            // vm.number = null
            // _this.$router.go(-1)
            // window.history.back()
            //window.location.href = vm.BASE_URL + 'index.html#/depositResult'
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            this.toast("用户取消支付");
          } else {
            this.toast("支付失败");
          }
        }
      );
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
::-webkit-scrollbar {
  display: none;
}
p {
  font-size: 0.16rem;
  margin: 0;
  padding: 0;
}
@media all and (orientation: portrait) {
  .payBox {
    width: 7.5rem;
    @include flex_box(column, space-between, stretch);
  }
  .payTypeBox {
    flex: 1;
    background: #fff;
    width: 7.5rem;
    height: 7.4rem;
    padding: 0 0.45rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem 0.2rem 0 0;
    @include flex_box(column, space-between, stretch);
  }
  .payUrlInfoBox {
    flex: 1;
    background: #fff;
    width: 7.5rem;
    height: 7rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem 0.2rem 0 0;
    @include flex_box(column, space-between, stretch);
  }
}

@media all and (orientation: landscape) {
  .payBox {
    width: 6.65em;
    @include flex_box(column, none, stretch);
  }
  .payTypeBox {
    flex: 1;
    background: #fff;
    width: 6.65em;
    height: 6.4rem;
    padding: 0 0.37rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, space-between, stretch);
  }
  .payUrlInfoBox {
    flex: 1;
    background: #fff;
    width: 6.65em;
    height: 5rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0.2rem 0.2rem 0;
    @include flex_box(column, space-between, stretch);
  }
  .payTypeTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    min-height: 1.02rem;
  }
  .payTypeTitle_l {
    @include flex_box(row, none, center);
    height: 0.4rem;
    border-left: 0.06rem solid #f35c14;
    padding-left: 0.16rem;
    span {
      font-size: 0.28rem;
      color: #282b2d;
    }
  }
  .bottomContent {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .bottomContentItem {
    @include flex_box(row, space-between, center);
    text-indent: 0.2rem;
    padding: 0.15rem 0.2rem;
    border-bottom: 1px solid #efefef;
  }
  .price {
    color: red;
  }
  .payWay {
    text-align: center;
    background: #efefef;
    line-height: 0.5rem;
  }
  .bottomContentItemSmall {
    @include flex_box(row, space-between, center);
    text-indent: 0.2rem;
    padding: 0.15rem 0.2rem;
    border-bottom: 1px solid #efefef;
  }
  .bottomContentItemSmall_l {
    @include flex_box(row, none, center);
    img {
      width: 0.6rem;
    }
    span {
      font-size: 0.2rem;
    }
    div {
      @include flex_box(column, center, flex-start);
      span {
        font-size: 0.2rem;
      }
      .youbi {
        margin-top: 0.04rem;
        color: red;
      }
    }
  }
  .recommendPay {
    color: red;
    font-size: 0.12rem;
  }
  .arrowImg {
    width: 0.4rem;
  }
  .payTypeSub {
    height: 0.6rem;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    background-color: #f35c14;
    margin-bottom: 0.24rem;
    span {
      font-size: 0.28rem;
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
  .closeBtn2 {
    overflow: hidden;
    width: 0.8rem;
    height: 0.8rem;
    @include flex_box(row, center, center);
    position: absolute;
    background-color: #fff;
    left: 0;
    top: 0;
    border-radius: 0.1rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      z-index: 999;
    }
  }
  .balanceTip {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.75);
    @include flex_box(column, center, center);
  }
  .balance {
    width: 6.66rem;
    height: 5.22rem;
    @include flex_box(column, space-between, center);
    position: relative;
    border-radius: 6px;
    background-color: #fff;
  }
  .title {
    width: 100%;
    height: 1.08rem;
    @include flex_box(row, center, center);
    background-color: #f35c14;
    border-radius: 6px 6px 0 0;
    span {
      color: #fff;
      font-size: 0.42rem;
      letter-spacing: 1px;
    }
  }
  .content {
    background-color: #fff;
    @include flex_box(row, center, center);
    span {
      font-size: 0.66rem;
      letter-spacing: 2px;
    }
  }
  .btn {
    background-color: #fff;
    border-radius: 6px;
    @include flex_box(row, center, center);
    width: 4.16rem;
    height: 1.02rem;
    margin-bottom: 0.4rem;
    background-color: #f35c14;
    span {
      font-size: 0.36rem;
      letter-spacing: 1px;
      color: #fff;
    }
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    @include flex_box(row, center, center);
    width: 1.08rem;
    height: 1.08rem;
    img {
      margin-bottom: 0.06rem;
      width: 0.54rem;
      height: auto;
    }
  }
}
@media all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .payBox {
    width: 7.5rem;
    margin: auto;
    @include flex_box(column, space-between, stretch);
  }
  .payTypeBox {
    flex: 1;
    background: #fff;
    width: 7.5rem;
    height: 7rem;
    padding: 0 0.45rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem;
    @include flex_box(column, space-between, stretch);
  }
  .payUrlInfoBox {
    flex: 1;
    background: #fff;
    width: 7.5rem;
    height: 7rem;
    padding: 0 0.45rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 0.2rem;
    @include flex_box(column, space-between, stretch);
  }
}
@media all and (orientation: portrait),
  all and (orientation: landscape) and (min-width: 600px) and (min-height: 800px),
  all and (min-device-aspect-ratio: 3/4) and (max-device-aspect-ratio: 4/3),
  all and (device-aspect-ratio: 4/3) {
  .payTypeTitle {
    @include flex_box(row, space-between, center);
    border-bottom: 1px solid #efefef;
    min-height: 1.02rem;
  }
  .payTypeTitle_l {
    @include flex_box(row, none, center);
    height: 0.4rem;
    border-left: 0.06rem solid #f35c14;
    padding-left: 0.16rem;
    span {
      font-size: 0.28rem;
      color: #282b2d;
    }
  }
  .bottomContent {
    flex: 1;
    @include flex_box(column, none, stretch);
  }
  .bottomContentItem {
    @include flex_box(row, space-between, center);
    text-indent: 0.2rem;
    padding: 0.2rem 0.2rem;
    border-bottom: 1px solid #efefef;
  }
  .price {
    color: red;
  }
  .payWay {
    text-align: center;
    background: #efefef;
    line-height: 0.6rem;
  }
  .bottomContentItemSmall {
    min-height: 1.02rem;
    @include flex_box(row, space-between, center);
    text-indent: 0.2rem;
    padding: 0 0.2rem;
    border-bottom: 1px solid #efefef;
  }
  .bottomContentItemSmall_l {
    @include flex_box(row, none, center);
    img {
      width: 0.6rem;
    }
    span {
      font-size: 0.2rem;
    }
    div {
      @include flex_box(column, center, flex-start);
      span {
        font-size: 0.2rem;
      }
      .youbi {
        margin-top: 0.04rem;
        color: red;
      }
    }
  }
  .recommendPay {
    color: red;
    font-size: 0.12rem;
  }
  .arrowImg {
    width: 0.4rem;
  }
  .payTypeSub {
    height: 0.72rem;
    @include flex_box(row, center, center);
    border-radius: 0.1rem;
    background-color: #f35c14;
    margin-bottom: 0.45rem;
    span {
      font-size: 0.28rem;
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
  .closeBtn2 {
    overflow: hidden;
    width: 1.2rem;
    height: 1.2rem;
    @include flex_box(row, center, center);
    position: absolute;
    background-color: #fff;
    left: 0;
    top: 0;
    border-radius: 0.1rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      z-index: 999;
    }
  }
  .balanceTip {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.75);
    @include flex_box(column, none, center);
  }
  .balance {
    margin-top: 25%;
    width: 6.66rem;
    height: 5.22rem;
    @include flex_box(column, space-between, center);
    position: relative;
    border-radius: 6px;
    background-color: #fff;
  }
  .title {
    width: 100%;
    height: 1.08rem;
    @include flex_box(row, center, center);
    background-color: #f35c14;
    border-radius: 6px 6px 0 0;
    span {
      color: #fff;
      font-size: 0.42rem;
      letter-spacing: 1px;
    }
  }
  .content {
    background-color: #fff;
    @include flex_box(row, center, center);
    span {
      font-size: 0.66rem;
      letter-spacing: 2px;
    }
  }
  .btn {
    background-color: #fff;
    border-radius: 6px;
    @include flex_box(row, center, center);
    width: 4.16rem;
    height: 1.02rem;
    margin-bottom: 0.4rem;
    background-color: #f35c14;
    span {
      font-size: 0.36rem;
      letter-spacing: 1px;
      color: #fff;
    }
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    @include flex_box(row, center, center);
    width: 1.08rem;
    height: 1.08rem;
    img {
      margin-bottom: 0.06rem;
      width: 0.54rem;
      height: auto;
    }
  }
}
</style>