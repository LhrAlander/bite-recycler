<template>
	<div class="g-wallet">
		<div class="m-hd">
			我的钱包
			<router-link to='/record'><span class="record">回收记录</span></router-link>
		</div>
		<div class="m-wallet">
			<div class="u-hd">
				<div class="hd-wp">
					<span class="reset" ref='reset' :class="[{'active': active==1}, {'default': active==2}]" @click='changeActive(1)'>账户余额</span>
					<div class="triangle" ref='triangle'></div>
					<span class="coin" ref='coin' :class="[{'active': active==2}, {'default': active==1}]" @click='changeActive(2)'>益点</span>
				</div>
			</div>
			<div class="u-bd">
				<div class="view-port">
					<div class="view-cnt" ref='viewCnt'>
						<div class="cnt">
							<span class='title'>账户余额</span>
							<span class="value">300.00</span>
						</div>
						<div class="cnt">
							<span class='title'>益点数量</span>
							<span class="value">1399</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ft-wp">
			<div class="m-ft">
				<div class="btn">提现</div>
				<span class="tip">查看我的银行卡</span>
			</div>
		</div>
		
	</div>
</template>
<script>
export default {
  mounted() {
    const reset = this.$refs.reset;
    const coin = this.$refs.coin;
    const triangle = this.$refs.triangle;
    const vCnt = this.$refs.viewCnt;
    console.log(
      reset.getBoundingClientRect().width,
      triangle.getBoundingClientRect().width
    );
    if (this.active == 1) {
      let left =
        reset.getBoundingClientRect().width / 2 -
        triangle.getBoundingClientRect().width / 2;
      triangle.style.left = left + "px";
      vCnt.style.marginLeft = "0";
    }
  },
  data() {
    return {
      active: 1
    };
  },
  methods: {
    changeActive(i) {
      const reset = this.$refs.reset.getBoundingClientRect();
      const coin = this.$refs.coin.getBoundingClientRect();
      const triangle = this.$refs.triangle.getBoundingClientRect();
      const t = this.$refs.triangle;
      const vCnt = this.$refs.viewCnt;
      this.active = i;
      if (i == 1) {
        let left = reset.width / 2 - triangle.width / 2;
        t.style.left = left + "px";
        vCnt.style.marginLeft = "0";
      } else {
        let left = coin.x - reset.x + coin.width / 2 - triangle.width / 2;
        t.style.left = left + "px";
        vCnt.style.marginLeft =
          "-" + vCnt.getBoundingClientRect().width / 2 + "px";
      }
    }
  }
};
</script>
<style scoped>
.triangle {
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-bottom: 0.5rem solid #32aafa;
  position: absolute;
  bottom: 0;
  transition: all 200ms;
}
.g-wallet {
  min-height: 100%;
  height: 100%;
  background: #fff;
  position: relative;
}
.m-hd {
  width: 100%;
  height: 30%;
  position: relative;
  background: url("/static/img/top-wave.jpg");
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
}
.record {
  position: absolute;
  top: 0.8rem;
  right: 1.2rem;
  font-size: 0.875rem;
}
.m-wallet {
  width: 95%;
  margin: 0 auto;
  position: relative;
  top: -4rem;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(204, 204, 204, 0.35);
}
.m-wallet .u-hd {
  height: 4rem;
  background: #f5f9fb;
  border-radius: 10px 10px 0 0;
}
.m-wallet .u-hd .hd-wp {
  height: 100%;
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.m-wallet .u-hd .hd-wp span {
  height: 100%;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1rem;
}
.default {
	color: #666;
}
.active {
  color: #32aafa;
}
.u-bd {
  display: flex;
  justify-content: center;
  padding: 3rem 0 7rem 0;
}
.u-bd .view-port {
  /* height: 5.25rem; */
  width: 11.5rem;
  overflow: hidden;
}
.view-port .view-cnt {
  width: 200%;
  height: 100%;
  display: flex;
  transition: all 200ms;
}
.view-cnt .cnt {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cnt .title {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}
.cnt .value {
  font-size: 2.25rem;
  color: #333;
}
.ft-wp {
	width: 100%;
	margin-top: 2rem;
}
.m-ft {
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}
.m-ft .btn {
  height: 2.5rem;
  width: 100%;
  border-radius: 1.25rem;
  color: #fff;
  font-size: 1.125rem;
  background: linear-gradient(to right, #6ee0ff, #32aafa);
  text-align: center;
  line-height: 2.5rem;
  margin-bottom: 0.7rem;
}
.m-ft .tip {
  color: #999;
  font-size: 0.75rem;
}
</style>
