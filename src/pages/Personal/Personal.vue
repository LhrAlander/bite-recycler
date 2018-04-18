<template>
	<div class="personal">
		<div class="bg-contanier" ref='topCtn'>
			<div class="personal-bg"></div>
		</div>
  	<div class="person-content" ref='bd'>
			<div class="personal-avatar"></div>
			<div class="personal-login"> 立即登录</div>
			<div class="personal-function">
				<div class="history">
					<div class="wp">
						<img src="/static/icons/order.png" alt="order" class='order'>
						<span class="title">回收记录</span>
					</div>
				</div>
				<div class="star">
					<div class="wp">
					<span class="value">5.0</span>
					<span class="title">评价星级</span>
					</div>
				</div>
			</div>
			<div class="personal-option">
				<router-link to='/wallet'>
				<div class="list">
					<div class="left">
						<img src="/static/icons/余额.png" alt="余额" class='icon'>
						<span>我的钱包</span>
					</div>
					<div class="right">
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				</router-link>
				
				<div class="list">
					<div class="left">
						<img src="/static/icons/余额.png" alt="余额" class='icon'>
						<span>回收类别</span>
					</div>
					<div class="right">
						<span>废纸 塑料 金属</span>
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				<div class="list">
					<div class="left">
						<img src="/static/icons/地址.png" alt="余额" class='icon'>
						
						<span>服务区域</span>
					</div>
					<div class="right">
						<span>阳光街道</span>
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				<div class="list">
					<div class="left">
						<img src="/static/icons/余额.png" alt="余额" class='icon'>
						<span>消息提示音</span>
					</div>
					<div class="right">
						<el-switch
							v-model="switch1"
							active-color="#13ce66"
							inactive-color="#ff4949">
						</el-switch>
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				<div class="list">
					<div class="left">
						<img src="/static/icons/问题反馈.png" alt="余额" class='icon'>
						<span>帮助和反馈</span>
					</div>
					<div class="right">
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				<div class="list">
					<div class="left">
						<img src="/static/icons/设置.png" alt="余额" class='icon'>
						<span>设置</span>
					</div>
					<div class="right">
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
			</div>
			<div ref='fillPg' class='fill-pg'></div>
    </div>
		<div class="g-ft" ref='gFt'>
			<my-footer></my-footer>
		</div>

</div>
</template>
<style scoped>
.fill-pg {
	background: #f2f2f2;
}
.g-ft {
	position: fixed;
	bottom: 0;
	left: 0;
	background: #fff;
}
.personal {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.bg-contanier {
  z-index: -1;
  top: 0;
  height: 30vh;
  overflow: hidden;
}
.personal-bg {
  position: relative;
  top: -130vh;
  right: 52vh;
  width: 160vh;
  height: 160vh;
  border-radius: 80%;
  background: linear-gradient(to right, #6ee0ff 25%, #32aafa 50%);
}
.person-content {
  margin-top: 48px;
  width: 100%;
  position: absolute;
  top: 0;
}
.personal-avatar {
  margin: 0 auto;

  border: #fff solid 2px;
  width: 62px;
  height: 62px;
  border-radius: 31px;
  background-color: #cccccc;
}
.personal-login {
  margin: 0 auto;
  margin-top: 21px;
  width: 119px;
  height: 30px;
  border-radius: 15px;
  border: #fff solid 1px;
  color: white;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
}

.personal-function {
  margin-top: 30px;
  border-bottom: #f2f2f2 solid 5px;
  display: flex;
}
.func-item {
  text-align: center;
  height: 110px;
  width: 25%;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
}
.history,
.star {
	width: 50%;
	height: 6rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.personal-function .title {
	color: #333;
	font-size: .75rem;
	margin-top: .6rem;
}
.wp .value {
	color: #FFAA42;
	font-size: 1rem;
}
.wp {
	width: 100%;
	height: 3rem;
	border-right: 1px solid #ddd;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-direction: column;
}

img.order {
  width: 1.5rem;
  height: 1.5rem;
}
.list {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: .5rem 1rem;
	border-bottom: 3px solid #f2f2f2;
}

.list .left {
	display: flex;
	align-items: center;
	color: #333;
	font-size: .875rem;
}

.list .right {
	display: flex;
	align-items: center;
	color: rgb(153, 153, 153);
	font-size: .75rem;
}

.list .left img {
	margin-right: .8rem;
}
.arrow {
	width: 1.8125rem;
  height: 1.8125rem;
}
.icon {
	width: 1.5rem;
	height: 1.5rem;
}

</style>
<script>
import MyFooter from '@/components/MyFooter'
export default {
	mounted() {
		const bd = this.$refs.bd
		const topCtn = this.$refs.topCtn
		const fillBox = this.$refs.fillPg
		const ft = this.$refs.gFt
		let marginTop = bd.getBoundingClientRect().bottom - topCtn.getBoundingClientRect().height + 'px'
		let height = Math.abs(bd.getBoundingClientRect().bottom - ft.getBoundingClientRect().top) + 'px'
		fillBox.style.height = height
		// fillBox.style.marginTop = marginTop
	},
	components: {
		MyFooter
	},
  data() {
    return {
			switch1: true,
      func: [
        { title: "待上门", url: "/static/img/door.png" },
        { title: "待确认", url: "/static/icon/order-processing.png" },
        { title: "已完成", url: "/static/icon/order-over.png" },
        { title: "全部订单", url: "/static/icon/order.png" }
      ],

      options: [
        { title: "我的钱包", url: "/static/icon/钱包.png" },
        { title: "我的地址簿", url: "/static/icon/地址.png" },
        { title: "成为大商户", url: "/static/icon/地址.png" },
        { title: "联系客服", url: "/static/icon/客服.png" },
        { title: "帮助和反馈", url: "/static/icon/问题反馈.png" },
        { title: "设置", url: "/static/icon/设置.png" }
      ]
    };
  },
  methods: {}
};
</script>


