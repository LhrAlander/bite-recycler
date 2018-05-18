<template>
	<div class="g-inworking">
		<!-- <yd-popup v-model="checkShow"> -->
      <check-info @cancelCheck='cancelCheck' :currentOrder='currentOrder' @confirm='confirm' v-if="checkShow"></check-info>  
			<confirm-pop v-if="confirmShow"></confirm-pop>
    <!-- </yd-popup> -->
		<div class="m-comment" ref='commentBar'>
			<div class="u-comment">
				<img src="/static/img/avatar.png" alt="avatar">
				<span>我已通过您的确认请求！记得给我评价哦！</span>
				<div class="comment-btn">立即评价</div>
			</div>
		</div>
		<div class="g-bd">
			<div class="m-hd">
				<div class="u-hd">
					<span>接单：0</span>
					<span>废品总斤数：0</span>
				</div>
			</div>
			<div class="m-info" ref="swapWrapper">
				<div class="u-info" v-if="orderShow" :class="{'first': first}" ref='top'>
					<order :order='orders[0]' @clickFnBtn = clickFnBtn(orders[0])></order>
				</div>
				<div class="u-info" v-if="orderShow" :class="{'second': second}" ref='bottom'>
					<order :order='orders[1]' @clickFnBtn = clickFnBtn(orders[1])></order>
				</div>
			</div>
		</div>
		<div class="g-ft">
			<div class="u-get-order" ref="order-btn">
				<span>左滑结束听单</span>
				<span class='time'>01：35：47</span>
			</div>
			<div class="u-footer">
				<my-footer></my-footer>
			</div>
		</div>
	</div>
</template>
<script>
import MyFooter from "@/components/MyFooter";
import Order from "./components/order";
import orderStatus from "@/config/common";
import checkInfo from "./components/checkInfo";
import confirmPop from "./components/confirmPop";
import { Popup } from "vue-ydui/dist/lib.rem/popup";
import io from "socket.io-client";
import axios from "axios";
export default {
  components: {
    MyFooter,
    Order,
    checkInfo,
    ydPopup: Popup,
    confirmPop
  },
  mounted() {
    let past = window.localStorage.getItem("pasteStatus");
    if (past) {
      console.log('找到了')
      past = JSON.parse(past);
      for (let i = 0; i < past.length; i++) {
        let o = past[i];
        this.orders.push(o);
      }
    } else {
      console.log('meizhoadao')
      this.startQueryOrders();
    }
    this.initSocket()
    const html = document.getElementsByTagName("html")[0];
    const htmlUnitFontSize = window
      .getComputedStyle(html, null)
      .getPropertyValue("font-size");
    this.htmlUnitFontSize = parseFloat(htmlUnitFontSize);
    const _top = this.$refs["top"];
    const _bottom = this.$refs["bottom"];
    this.changeDiff =
      Math.abs(
        _top.getBoundingClientRect().top - _bottom.getBoundingClientRect().top
      ) + _top.getBoundingClientRect().height;
    this.first = false;
    let that = this;
    setTimeout(function() {
      that.second = false;
    }, 800);
    const orderBtn = this.$refs["order-btn"];
    const opts = orderBtn.getBoundingClientRect();
    const diff = opts.width / 4;
    let border = {};
    orderBtn.addEventListener("touchstart", e => {
      border = {
        top: opts.top,
        bottom: opts.bottom,
        left: e.changedTouches[0].clientX - diff,
        right: e.changedTouches[0].clientX
      };
    });
    orderBtn.addEventListener("touchmove", e => {
      let currentBorder = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
      if (
        currentBorder.x <= border.left &&
        currentBorder.y >= border.top &&
        currentBorder.y <= border.bottom
      ) {
        window.localStorage.removeItem('pasteStatus')
        this.$router.push("/workOrder");
      }
    });
  },
  data() {
    return {
      getOrder: false,
      currentOrder: {},
      socket: null,
      queryBind: "",
      commentShow: true,
      checkShow: false,
      confirmShow: false,
      changeDiff: "",
      orderShow: true,
      htmlUnitFontSize: 16,
      needLength: 3,
      orders: [],
      first: true,
      second: true
    };
  },
  methods: {
    clickFnBtn(order) {
      switch (order.status) {
        case orderStatus.order.WAIT_STATUS:
          this.swapOrder(order);
          break;
        case orderStatus.order.IN_WORKING:
          order.status = orderStatus.order.WAIT_CONFIRM;
          order.active = true;
          this.currentOrder = order;
          this.checkInfo();
          order.currentStatus = "待确认";
          order.fnTitle = "再次发起请求";
          break;
        case orderStatus.order.WAIT_CONFIRM:
          order.active = true;
          this.currentOrder = order;
          this.checkInfo();
      }
    },
    swapOrder(order) {
      let otherOrder = this.orders[(this.orders.indexOf(order) + 1) % 2];
      console.log("another", otherOrder);
      if (otherOrder.status == orderStatus.order.IN_WORKING) {
        return;
      } else {
        order.active = true;
        order.status = orderStatus.order.IN_WORKING;
        order.currentStatus = "处理中";
        order.fnTitle = "核对信息";
        let out = {};
        const p = this.$refs.swapWrapper;
        p.firstElementChild.style.transition = "all 800ms";
        p.lastElementChild.style.transition = "all 800ms";
        if (1 == this.orders.indexOf(order)) {
          this.changeDiff = Math.abs(
            p.firstElementChild.getBoundingClientRect().top -
              p.lastElementChild.getBoundingClientRect().top
          );
          out.outEl = p.firstElementChild;
          out.other = p.lastElementChild;
          out.dt = `-${p.firstElementChild.getBoundingClientRect().height +
            1000}px`;
          out.otherRecDt = `-${2 *
            (this.changeDiff - this.htmlUnitFontSize)}px`;
          out.outElRecDt = `${this.changeDiff}px`;
          p.firstElementChild.style.marginTop = `${this.changeDiff}px`;
          console.log(this.changeDiff);
          p.lastElementChild.style.marginTop = `-${2 *
            (this.changeDiff - this.htmlUnitFontSize)}px`;
        } else {
          p.firstElementChild.style.marginTop = `0`;
          p.lastElementChild.style.marginTop = `${2 * this.htmlUnitFontSize}px`;
          out.outEl = p.lastElementChild;
          out.other = p.firstElementChild;
          out.otherRecDt = `0`;
          out.outElRecDt = `${2 * this.htmlUnitFontSize}px`;
          out.dt = "0";
        }

        if (otherOrder.status == orderStatus.order.WAIT_CONFIRM) {
          setTimeout(() => {
            this.commentShow = true;
            const commentBar = this.$refs["commentBar"];
            console.log(commentBar);
            commentBar.style.left = "0";
            out.outEl.style.marginTop = "1000px";
            out.other.style.marginTop = out.dt;
            setTimeout(() => {
              commentBar.style.left = "100%";
              this.changeOrder(otherOrder);
              // this.commentShow = false
              otherOrder.status = orderStatus.order.WAIT_STATUS;
              otherOrder.currentStatus = "待处理";
              otherOrder.fnTitle = "开始处理";
              otherOrder.active = false;
              out.other.style.marginTop = out.otherRecDt;
              out.outEl.style.marginTop = out.outElRecDt;
              this.orders.forEach(i => {
                i.index = (i.index + 1) % 2;
                window.localStorage.setItem(
                  "pasteStatus",
                  JSON.stringify(this.orders)
                );
              });
            }, 1000);
          }, 1000);
        }
      }
    },
    changeOrder(order) {
      for (let k in order) {
        let v = order[k];
        order[k] = this.orders[2][k];
        this.orders[2][k] = v;
      }
    },
    checkInfo() {
      this.checkShow = true;
    },
    confirm(d) {
      let o = {
        id: this.currentOrder.id,
        detail: JSON.stringify(d)
      };
      axios
        .post("/api/recycler/orders/complete", {
          order: o,
          OID: window.localStorage.getItem("OID")
        })
        .then(res => {
          console.log("完成订单", res);
          // 未收到订单
          return axios.post("/api/recycler/orders/unchecked", {
            needLength: 1,
            OID: window.localStorage.getItem("OID")
          });
        })
        .then(res => {
          console.log(res);
          if (!this.getOrder) {
            let o = res.data.shift();
            console.log(o);
            let startTime = new Date(o.startTime);
            let nowTime = new Date();
            let awaitTime = parseInt(parseInt(nowTime - startTime) / 1000 / 60);
            let details = [];
            o.detail = JSON.parse(o.detail);
            for (let k in o.detail) {
              details.push(k);
            }
            let _o = {
              status: orderStatus.order.WAIT_STATUS,
              waitTime: awaitTime,
              address: o.address,
              distance: "80m",
              active: false,
              currentStatus: "待处理",
              fnTitle: "开始处理",
              index: this.orders.length,
              detail: details,
              id: o.id
            };
            this.changeOrder(_o);
          } else {
            console.log("不变");
            this.getOrder = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.confirmShow = true;
      let that = this;
      setTimeout(function() {
        that.confirmShow = false;
        that.checkShow = false;
      }, 2000);
    },
    cancelCheck() {
      this.checkShow = false;
    },
    initSocket() {
      this.socket = io.connect("http://localhost:9999");
      let OID = window.localStorage.getItem("OID");
      this.socket.emit("addUser", {
        OID
      });
      this.socket.on("newOrders", msg => {
        try {
          console.log("has new Orders");
          console.log(msg);
          this.getOrder = true;
          let o = msg.orders;
          o.detail = JSON.parse(o.detail);
          let startTime = new Date(o.startTime);
          let nowTime = new Date();
          let awaitTime = parseInt(parseInt(nowTime - startTime) / 1000 / 60);
          let details = [];
          for (let k in o.detail) {
            details.push(k);
          }
          let _o = {
            id: o.id,
            status: orderStatus.order.WAIT_STATUS,
            waitTime: awaitTime,
            address: o.address,
            distance: "80m",
            active: false,
            currentStatus: "待处理",
            fnTitle: "开始处理",
            index: 3,
            detail: details
          };
          this.orders[2] = _o;
        } catch (err) {
          console.log("er", err);
        }
      });
    },
    // 轮询查看访问订单
    async startQueryOrders() {
      let OID = window.localStorage.getItem("OID");
      axios
        .post("/api/recycler/orders/unchecked", {
          needLength: this.needLength,
          OID
        })
        .then(res => {
          this.orders = [];
          let msg = {};
          msg.orders = res.data;
          msg.orders.forEach(o => {
            o.detail = JSON.parse(o.detail);
          });
          console.log("mmm", msg);
          let currentOrders = [];
          while (
            this.orders.length < 3 &&
            "orders" in msg &&
            msg.orders.length > 0
          ) {
            let o = msg.orders.shift();
            let startTime = new Date(o.startTime);
            let nowTime = new Date();
            let awaitTime = parseInt(parseInt(nowTime - startTime) / 1000 / 60);
            let details = [];
            for (let k in o.detail) {
              details.push(k);
            }
            let _o = {
              status: orderStatus.order.WAIT_STATUS,
              waitTime: awaitTime,
              address: o.address,
              distance: "80m",
              active: false,
              currentStatus: "待处理",
              fnTitle: "开始处理",
              index: this.orders.length,
              detail: details,
              id: o.id,
              startTime: o.startTime
            };
            this.orders.push(_o);
            currentOrders.push(_o);
          }
          currentOrders.pop();
          window.localStorage.setItem(
            "pasteStatus",
            JSON.stringify(this.orders)
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  destroyed() {
    console.log("取消查询");
    this.socket.close();
  }
};
</script>
<style scoped>
.g-inworking {
  height: calc(100% + 98px);
  width: 100%;
  overflow: hidden;
}
.g-bd {
  width: 100%;
  height: 83.47%;
  background: #f2f2f2;
}
.g-ft {
  z-index: 11;
  width: 100%;
  height: 98px;
  position: fixed;
  bottom: 0;
}
.m-hd {
  width: 100%;
  height: 2.5rem;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
.m-info {
  width: 95%;
  height: 92%;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 2.5rem;
  overflow: hidden;
  padding-top: 0.625rem;
  z-index: 10;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-between; */
}
.m-comment {
  width: 100%;
  height: 2.5rem;
  position: fixed;
  top: 0;
  left: 100%;
  z-index: 1500;
  background: #fff;
  transition: all 400ms;
}
.u-comment,
.u-hd {
  height: 100%;
  width: 95%;
  margin: 0 auto;
}

.u-comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.u-comment img {
  width: 1.375rem;
  height: 1.375rem;
}
.u-comment span {
  font-size: 0.6875rem;
}

.u-comment .comment-btn {
  font-size: 0.6875rem;
  color: #32aafa;
  padding: 0.1rem 0.5rem;
  border: 0.1rem solid #32aafa;
  border-radius: 0.3rem;
}

.u-hd {
  font-size: 0.8125rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.u-info {
  width: 100%;
  /* height: 47.16%; */
  height: 210px;
  position: relative;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0px 0px 5px rgba(50, 170, 250, 0.149019607843137);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 800ms;
}

.u-info:nth-child(2) {
  transition: all 1200ms;
  margin-top: 2rem;
}
.u-info.first {
  margin-top: -100%;
}
.u-info.second {
  margin-top: -200%;
}

.u-info span.value {
  color: #32aafa;
  font-size: 1.75em;
}

.u-info span.title {
  color: #999;
  font-size: 0.75em;
  margin-top: 0.7em;
}

.u-info img {
  width: 2.25rem;
  height: 2.25rem;
}

.u-get-order,
.u-footer {
  width: 100%;
  height: 50%;
}
.u-get-order {
  /* height: 43px; */
  /* height: 100%; */
}
.u-get-order {
  background: linear-gradient(to right, #ffb9b9, #f88);
  font-size: 1.125rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.u-get-order .time {
  font-size: 0.625rem;
  color: #fff;
}
</style>
