<template>
	<div class="g-record">
		<div class="m-orders">
			<div class="u-order-hd">进行中的订单</div>
			<div v-for='i in 2' :key='i' class="u-order in-working-order">
				<div class="hd">
					<div class="desc">
						<img src="/static/icons/clock.png" alt="clock" class='icon-clock'>
						<span class='name'>实时订单</span>
						<span class="time">今天10:00</span>
					</div>
					<div class="status">
						<span>待上门</span>
						<img src="/static/icons/location.png" alt="location" class='icon-location'>
					</div>
				</div>
				<div class="info">
					<div class="category">
						<span class="dot yellow"></span>
						<span class="ct">废书废纸</span>
						<span class="ct">废旧衣物</span>
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
			<div v-for='i in 2' :key='i' class="u-order over-order">
				<div class="hd">
					<div class="desc">
						<img src="/static/icons/clock.png" alt="clock" class='icon-clock'>
						<span class='name'>2018-01-01</span>
						<span class="time">今天10:00</span>
					</div>
					<div class="status">
						<span>已完成</span>
						<img src="/static/icons/location.png" alt="location" class='icon-location'>
					</div>
				</div>
				<div class="info">
					<div class="category">
						<span class="dot yellow"></span>
						<span class="ct">废书废纸</span>
						<span class="ct">废旧衣物</span>
					</div>
					<div class="distance">
						<span class="dot pink"></span>
						<span class="dt">地址：杭州市滨江区学院路</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	
}
</script>
<style scoped>
.icon-clock,
.icon-location {
	width: 1.25rem;
	height: 1.25rem;
}
.icon-location {
	margin-left: .4rem;
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
	margin-right: .3rem;
}
.info .distance .dt {
	color: #BCBCBC;
	font-size: .75rem;
}

.u-order {
	width: 95%;
	margin: 0 auto;
	background: #fff;
	padding: .7rem 1.5rem;
	margin-bottom: .5rem;
}

.u-order-hd {
	padding: 1rem 0 1rem 2rem;
	font-size: .75rem;
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
	font-size: .875rem;
}

.over-order .hd .desc .name {
	color: #999;
}

.u-order .hd .desc .time {
	font-size: .75rem;
	color: #BCBCBC;
}
.u-order .hd .status {
	color: #BCBCBC;
	font-size: .8125rem;
}

.u-order .hd .name {
	margin-left: .3rem;
	margin-right: 2rem;
}

.u-order .info .category,
.u-order .info .distance {
	margin-bottom: 1rem;
}

</style>
