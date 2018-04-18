<template>
	<div class="c-station">
		<div class="u-hd">
			<div class="info">
				<img src="/static/img/avatar-1.jpg" alt="avatar" class='station-avatar'>
				<div class="detail">
					<span class="name">杭州阳光废品回收站</span>
					<span class="stars">
						<img src="/static/icons/star.png" class='star' alt="star" v-for="i in 5" :key="i">
						<span class="value">5.0</span>
					</span>
				</div>
			</div>
			<span class="distance">183 m</span>
		</div>
		<div class="u-category">
			<div class="price-item" v-for="i in 4" :key='i'>
          <div style="display: block">
             <div class="wrapper">
              <div class='name'>
                废牛皮纸
              </div>
              <div class="price">
                2500.0
              </div>
            </div>
          </div>
        </div>
		</div>
		<div class="u-ft">
			<div class="btn concat">与他联系</div>
			<div class="btn request">发送请求</div>
		</div>
	</div>
</template>
<script>
export default {
	
}
</script>
<style scoped>
.c-station {
	width: 100%;
	background: #fff;
}
.u-hd {
	padding: 1rem;
	margin: 0 auto;
	background: #F8FAFB;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.u-hd .info {
	display: flex;
}

.u-hd .info .station-avatar {
	width: 2.8125rem;
	height: 2.8125rem;
	border-radius: 50%;
}
.u-hd .info .name {
	color: rgba(51, 51, 51, .8);
	font-size: .875rem;
}

.u-hd .distance {
	font-size: .6875rem;
	color: #999;
}

.u-hd .info .detail {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;
	margin-left: .8rem;
}

.u-hd .info .detail .value {
	color: #FFAA42;
	font-size: .8125rem;
	margin-left: 1rem;
}

img.star {
	width: .75rem;
	height: .75rem;
}


.u-category {
  width: 95%;
  padding: 1rem;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.u-category::-webkit-scrollbar {
  display: none;
}

.price-item {
  width: 101px;
  height: 72px;
  margin-right: 5px;
  display: inline-block;
  border-radius: 5px;
  box-shadow: rgba(204, 204, 204, 0.35) 0px 0px 8px;
  white-space: normal;
  text-align: center;
  overflow: hidden;
}

.price-item .wrapper {
  box-sizing: border-box;
  padding: 5px;
  width: 101px;
  height: 72px;
  white-space: normal;
  flex-wrap: wrap;
  display: flex;
  align-content: space-around;
  justify-content: center;
}

.wrapper .name {
  font-size: 14px;
  color: #2b2b2c;
}

.wrapper .price {
  color: #ff8888;
  font-size: 16px;
}

.wrapper .price::after {
  content: "元/吨";
  color: #999;
  font-size: 9px;
  margin-left: -4px;
}

.u-ft {
	padding: 0 1rem 1rem 1rem;
	display: flex;
	justify-content: space-between;
}
.btn {
	width: 45%;
	padding: .5rem 0;
	border-radius: 5px;
	text-align: center;
	font-size: .8125rem;
}

.btn.concat {
	color: #32AAFA;
	background: #fff;
	border: 1px solid #32aafa;
	
}

.btn.request {
	color: #fff;
	background: linear-gradient(to right, #6ee0ff, #32aafa);
}


</style>
