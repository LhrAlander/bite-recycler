<template>
	<div class="m-order">
		<div class="m-cnt">
			<div class="u-hd" :class="[{'active': order.active}, {'default': !order.active}]">
				<span class="bold">{{order.currentStatus}}</span>
				<span>已等待{{order.waitTime}}分钟</span>
			</div>
			<div class="u-main">
				<div class="title">
					<span>{{order.address}} </span>
					<img src="/static/icons/orderLocation.png" alt="location">
				</div>
				<div class="info">
					<div class="category">
						<span class="dot yellow"></span>
						<span class="ct">废书废纸</span>
						<span class="ct">废旧衣物</span>
					</div>
					<div class="distance">
						<span class="dot pink"></span>
						<span class="dt">{{order.distance}}</span>
					</div>
				</div>
			</div>
			<div class="u-ft">
				<div class="concat-btn btn default">与他联系</div>
				<div class="fn-btn btn" :class="[{'active': order.active}, {'default': !order.active}]" @click='clickFnBtn'>{{order.fnTitle}}</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  props: {
    order: Object
  },
  data() {
    return {
      WAIT_STATUS: 0,
      IN_WORKING: 1,
      WAIT_CONFIRM: 2
    }
	},
	computed: {
		currentStatus() {
			console.log(typeof this.$props.order.status,typeof this.WAIT_STATUS, parseInt(this.$props.order.stauts) === 0)
			if (this.$props.order.stauts == this.WAIT_STATUS) {
				return '待处理'
			}
			else if (this.$props.order.stauts == this.IN_WORKING) {
				return '处理中'
			}
			else {
				return '待确认'
			}
		},
		currentFnTitle() {
			if (this.$props.order.stauts == this.WAIT_STATUS) {
				console.log('waitstatus')
				return '开始处理'
			}
			else if (this.$props.order.stauts == this.IN_WORKING) {
				return '处理中'
			}
			else {
				return '再次发起确认请求'
			}
		}
	},
	methods: {
		clickFnBtn() {
			this.$emit('clickFnBtn')
		}
	}
}
</script>
<style scoped>
.m-order {
  width: 100%;
  height: 100%;
}
.m-cnt {
  width: 95%;
  height: 100%;
  margin: 0 auto;
}
.u-hd {
  height: 19.04%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.u-hd.default {
	border-bottom: 1px solid #333;
	color: #333;
}
.u-hd.active {
  color: #32aafa;
  border-bottom: 1px solid #6ee0ff;
}
.u-main,
.u-main .info {
  width: 100%;
  padding-top: 1rem;
}

.u-ft {
  width: 100%;
  height: 19.04%;
  margin-top: 1.2em;
  display: flex;
  justify-content: space-between;
}

.u-main .title {
  color: #363636;
  display: flex;
  justify-content: space-between;
}

.u-main .category .ct {
  color: #333;
  font-size: 0.8125em;
  border-radius: 0.5em;
  border: 1px solid #797979;
  padding: 0.2em 0.5em;
  margin-left: 0.3em;
}

.u-main .distance {
  margin-top: 0.5em;
}
.u-main .distance .dt {
  color: #bcbcbc;
  font-size: 0.8125em;
}

.dot {
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  margin-right: 0.2em;
}
.dot.pink {
  background: #ff8888;
}
.dot.yellow {
  background: #ffaa42;
}
.btn {
  width: 47.48%;
  height: 100%;
  border-radius: 0.6em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn.default {
  border: 1px solid #333;
  color: #333;
  font-size: 0.8125em;
}

.btn.active {
  border: 1px solid #32aafa;
  color: #32aafa;
  font-size: 0.8125em;
}
</style>
