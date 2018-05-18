<template>
	<div class="g-record">
		<div class="m-orders">
			<div class="u-order-hd">进行中的订单</div>
			<div v-for='o in currentOrders' :key='o.id' class="u-order in-working-order">
				<div class="hd">
					<div class="desc">
						<img src="/static/icons/clock.png" alt="clock" class='icon-clock'>
						<span class='name'>实时订单</span>
						<span class="time">{{o.startTime}}</span>
					</div>
					<div class="status">
						<span>待上门</span>
						<img src="/static/icons/location.png" alt="location" class='icon-location'>
					</div>
				</div>
				<div class="info">
					<div class="category">
						<span class="dot yellow"></span>
						<span class="ct" v-for="d in o.detail" :key="d">{{d}}</span>
					</div>
					<div class="distance">
						<span class="dot pink"></span>
						<span class="dt">距离您3KM</span>
					</div>
				</div>
			</div>
		</div>
		<div class="m-orders">
			<div class="u-order-hd">已完结的订单</div>
			<div v-for='o in completedOrders' :key='o.date' class="u-order over-order">
				<div class="hd">
					<div class="desc">
						<img src="/static/icons/clock.png" alt="clock" class='icon-clock'>
						<span class='name'>{{o.date}}</span>
						<span class="time">{{o.time}}</span>
					</div>
					<div class="status">
						<span>已完成</span>
						<img src="/static/icons/location.png" alt="location" class='icon-location'>
					</div>
				</div>
				<div class="info">
					<div class="category">
						<span class="dot yellow"></span>
						<span class="ct" v-for="d in o.detail" :key="d">{{d}}</span>
					</div>
					<div class="distance">
						<span class="dot pink"></span>
						<span class="dt">地址：{{o.address}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      currentOrders: [],
			completedOrders: []
    }
  },
  mounted() {
    this.getCurrentOrders()
		this.getCompleteOrders()
  },
  methods: {
    getCurrentOrders() {
			let pastOrders = JSON.parse(window.localStorage.getItem("pasteStatus"))
			
      for (let i = 0; pastOrders && i < pastOrders.length; i++) {
        let _o = pastOrders[i]
        if (_o) {
          let date = new Date(_o.startTime);
          let startTime = `${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
          _o.startTime = startTime
          this.currentOrders.push(_o)
        }
      }
    },
		getCompleteOrders() {
			let OID = window.localStorage.getItem('OID')
			axios.post('/api/recycler/orders/get/complete', {
				OID
			})
				.then(res => {
					console.log(res)
					res.data.forEach(o => {
						let d = JSON.parse(o.detail)
						let s = []
						for (let k in d) {
							s.push(k)
						}
						let _o = {
							address: o.address,
							date: new Date(o.startTime).toLocaleDateString(),
							time: `${new Date(o.startTime).getHours()}:${new Date(o.startTime).getMinutes()}`,
							detail: s
						}
						this.completedOrders.push(_o)
					})
				})
				.catch(err => {
					console.log(err)
				})
		}
  }
};
</script>
<style scoped>
.icon-clock,
.icon-location {
  width: 1.25rem;
  height: 1.25rem;
}
.icon-location {
  margin-left: 0.4rem;
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
.info .category .ct {
  color: #333;
  font-size: 0.8125em;
  border-radius: 0.5em;
  border: 1px solid #797979;
  padding: 0.2em 0.5em;
  margin-right: 0.3rem;
}
.info .distance .dt {
  color: #bcbcbc;
  font-size: 0.75rem;
}

.u-order {
  width: 95%;
  margin: 0 auto;
  background: #fff;
  padding: 0.7rem 1.5rem;
  margin-bottom: 0.5rem;
}

.u-order-hd {
  padding: 1rem 0 1rem 2rem;
  font-size: 0.75rem;
  color: #999;
}

.u-order .hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.u-order .hd .desc,
.u-order .hd .status {
  display: flex;
  align-items: center;
}

.u-order .hd .desc .name {
  color: #5e5e5e;
  font-size: 0.875rem;
}

.over-order .hd .desc .name {
  color: #999;
}

.u-order .hd .desc .time {
  font-size: 0.75rem;
  color: #bcbcbc;
}
.u-order .hd .status {
  color: #bcbcbc;
  font-size: 0.8125rem;
}

.u-order .hd .name {
  margin-left: 0.3rem;
  margin-right: 2rem;
}

.u-order .info .category,
.u-order .info .distance {
  margin-bottom: 1rem;
}
</style>
