<template>
	<div class="g-workorder">
		<div class="g-bd">
			<div class="m-info">
				<div class="u-info wave-1">
					<span class="value">59</span>
					<span class="title">回收总单数</span>
				</div>
				<div class="u-info wave-2">
					<span class="value">1651</span>
					<span class="title">总回收额</span>
				</div>
				<div class="u-info wave-3">
					<span class="value">360</span>
					<span class="title">总在线时长</span>
				</div>
				<div class="u-info wave-4">
					<span class="value">888</span>
					<span class="title">总回收斤数</span>
				</div>
				<div class="u-info wave-2">
					<img src="/static/img/price.png" alt="price">
					<span class="title">废品价格</span>
				</div>
				<div class="u-info wave-4" @click="goCoin">
					<img src="/static/img/transaction.png" alt="transaction">
					<span class="title">积分交易</span>
				</div>
			</div>
		</div>
		<div class="g-ft">
			<div class="u-get-order" ref="order-btn">
				右滑开始听单
			</div>
			<div class="u-footer">
				<my-footer></my-footer>
			</div>
		</div>
	</div>
</template>
<script>
import MyFooter from "@/components/MyFooter";
import util from "@/utils";
export default {
  components: {
    MyFooter
  },
  mounted() {
    util.getUserInfo(util.getQueryVariable("code"));
    const orderBtn = this.$refs["order-btn"];
    const opts = orderBtn.getBoundingClientRect();
    const diff = opts.width / 4;
    let border = {};
    orderBtn.addEventListener("touchstart", e => {
      border = {
        top: opts.top,
        bottom: opts.bottom,
        left: e.changedTouches[0].clientX,
        right: e.changedTouches[0].clientX + diff
      };
    });
    orderBtn.addEventListener("touchmove", e => {
      let currentBorder = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
      if (
        currentBorder.x >= border.right &&
        currentBorder.y >= border.top &&
        currentBorder.y <= border.bottom
      ) {
        this.$router.push("/inWorking");
      }
    });
  },
  methods: {
    goCoin() {
      this.$router.push("/coin");
    }
  }
};
</script>
<style scoped>
.g-workorder {
  height: 100%;
  width: 100%;
}
.g-bd {
  width: 100%;
  height: 83.47%;
  padding-top: 1px;
  background: #f2f2f2;
}
.g-ft {
  width: 100%;
  /* height: 16.53%; */
  position: fixed;
  bottom: 0;
}
.m-info {
  width: 95%;
  height: 79.2%;
  margin: 1.75em auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.u-info {
  width: 47%;
  height: 27.27%;
  position: relative;
  background: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 10px rgba(161, 161, 161, 0.349019607843137);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.u-info::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: 100%;
  background-position: bottom;
}

.wave-1::before {
  background-image: url("/static/img/wave-1.png");
}
.wave-2::before {
  background-image: url("/static/img/wave-2.png");
}
.wave-3::before {
  background-image: url("/static/img/wave-3.png");
}
.wave-4::before {
  background-image: url("/static/img/wave-4.png");
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

/* .u-get-order,
.u-footer {
	width: 100%;
	height: 50%;
} */
.u-get-order {
  height: 43px;
}
.u-get-order {
  background: linear-gradient(to right, #6ee0ff, #32aafa);
  font-size: 1.125rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
