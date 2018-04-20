<template>
	<div class="g-inworking">
		<!-- <yd-popup v-model="checkShow"> -->
      <check-info @cancelCheck='cancelCheck' @confirm='confirm' v-if="checkShow"></check-info>  
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
export default {
  components: {
    MyFooter,
    Order,
    checkInfo,
    ydPopup: Popup,
    confirmPop
  },
  mounted() {
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
        this.$router.push("/workOrder");
      }
    });
  },
  data() {
    return {
      commentShow: true,
      checkShow: false,
      confirmShow: false,
      changeDiff: "",
      orderShow: true,
      htmlUnitFontSize: 16,
      orders: [
        {
          status: orderStatus.order.WAIT_STATUS,
          waitTime: 35,
          address: "杭州市上城区阳光小区3单元1803室",
          distance: "888m",
          active: false,
          currentStatus: "待处理",
          fnTitle: "开始处理",
          index: 0
        },
        {
          status: orderStatus.order.WAIT_STATUS,
          waitTime: 3,
          address: "杭州市上城区阳光小区5单元1901室",
          distance: "1.3km",
          active: false,
          currentStatus: "待处理",
          fnTitle: "开始处理",
          index: 1
        }
      ],
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
          this.checkInfo();
          order.currentStatus = "待确认";
          order.fnTitle = "再次发起请求";
          break;
        case orderStatus.order.WAIT_CONFIRM:
          order.active = true;
          this.checkInfo();
      }
    },
    swapOrder(order) {
      const otherOrder = this.orders[(this.orders.indexOf(order) + 1) % 2];
      if (otherOrder.status == orderStatus.order.IN_WORKING) {
        return;
      } else {
        order.active = true;
        order.status = orderStatus.order.IN_WORKING;
        order.currentStatus = "处理中";
        order.fnTitle = "核对信息";
        let out = {};
        if (order.index == 1) {
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
            p.lastElementChild.style.marginTop = `${2*this.htmlUnitFontSize}px`;
            out.outEl = p.lastElementChild;
            out.other = p.firstElementChild;
            out.otherRecDt = `0`;
            out.outElRecDt = `${2*this.htmlUnitFontSize}px`;
            out.dt = "0";
          }
          if (otherOrder.status == orderStatus.order.WAIT_CONFIRM) {
            setTimeout(() => {
              this.commentShow = true
              const commentBar = this.$refs['commentBar']
              console.log(commentBar)
							commentBar.style.left = '0'
              out.outEl.style.marginTop = "1000px";
              out.other.style.marginTop = out.dt;
              setTimeout(() => {
                commentBar.style.left = '100%'
                // this.commentShow = false
								otherOrder.status = orderStatus.order.WAIT_STATUS
								otherOrder.currentStatus = '待处理'
								otherOrder.fnTitle = '开始处理'
								otherOrder.active = false
                out.other.style.marginTop = out.otherRecDt;
                out.outEl.style.marginTop = out.outElRecDt;
              }, 1000);
            }, 1000);
          }
          this.orders.forEach(i => {
            i.index = (i.index + 1) % 2;
          });
        }
      }
    },
    checkInfo() {
      this.checkShow = true;
    },
    confirm() {
      this.confirmShow = true;
      let that = this;
      setTimeout(function() {
        that.confirmShow = false;
        that.checkShow = false;
      }, 2000);
    },
    cancelCheck() {
      this.checkShow = false;
    }
  }
};
</script>
<style scoped>
.g-inworking {
  height: 100%;
  widows: 100%;
	overflow: hidden;
}
.g-bd {
  width: 100%;
  height: 83.47%;
  background: #f2f2f2;
}
.g-ft {
  width: 100%;
  height: 98px;
  position: fixed;
  bottom: 0;
}
.m-hd {
  width: 100%;
  height: 2.5rem;
  background: #fff;
}
.m-info {
  width: 95%;
  height: 92%;
  box-sizing: border-box;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 0.625rem;
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

.u-comment .comment-btn {
	font-size: .6875rem;
	color: #32AAFA;
	padding: .1rem .5rem;
	border: .1rem solid #32AAFA;
	border-radius: .3rem;

}

.u-hd {
  font-size: 0.8125em;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.u-info {
  width: 100%;
  height: 44.16%;
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
  width: 2.25em;
  height: 2.25em;
}

.u-get-order,
.u-footer {
  width: 100%;
  height: 50%;
}
.u-get-order {
  /* height: 43px; */
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
  font-size: 0.625em;
  color: #fff;
}
</style>
