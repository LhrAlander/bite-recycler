<template>
	<div class="m-ft">
		<div class="u-detail" v-for="i in iconDetail" :key='i.title' @click='go(i)'>
			<img :src='"/static/icons/" + i.icon' alt="a">
			<span>{{i.title}}</span> 
		</div>
	</div>
</template>
<script>
export default {
	mounted() {
		console.log(this.$route)
		switch(this.$route.name) {
			case 'personal':
				this.iconDetail[2].icon = 'my-selected.png'
				break;
			case 'stations':
				this.iconDetail[1].icon = '/sell-selected.png'
				break;
			case 'workOrder':
				this.iconDetail[0].icon = '/recycle-selected.png'
				break;
			
		}
	},
	data() {
		return {
			iconDetail: [
				{
					icon: 'recycle.png',
					title: '回收',
					url: '/workOrder'
				},
				{
					icon: 'sell.png',
					title: '出售',
					url: '/stations'
				},
				{
					icon: 'my.png',
					title: '我的',
					url: '/personal'
				},
			]
		}
	},
	methods: {
		go(i) {
			this.$router.push(i.url)
		}
	}
}
</script>
<style scoped>
.m-ft {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.u-detail {
	width: 8%;
	height: 76%;
	/* border: 1px solid #ddd; */
	font-size: .555em;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.u-detail img {
	width: 1.875rem;
	height: 1.875rem
}

.u-detail span {
	margin-top: -.25em;
	color: #868686;
}

</style>
