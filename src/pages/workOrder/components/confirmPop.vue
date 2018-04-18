<template>
	<div class="m-pop">
		<div class="u-mask"></div>
		<div class="u-cnt">
			<div class="u-main-tip">
				<!-- <div class="right-icon"></div> -->
				<img src="/static/icons/right.png" alt="OK">
				<span>确认请求已发出</span>
			</div>
		</div>
	</div>
	
</template>
<script>
export default {}
</script>
<style scoped>
.u-mask,
.u-cnt {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.u-mask {
  z-index: 1500;
  background-color: rgb(0, 0, 0);
  transition: opacity 0.2s ease-in;
  opacity: 0.4;
}
.u-cnt {
  z-index: 1502;
}
.u-main-tip {
	width: 55.2%;
	height: 23.98%;
	background: #000;
	padding: 1.5rem;
	opacity: .6;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	border-radius: .5rem;
}
.right-icon {
	width: 1.875rem;
	height: 1.875rem;
	border: .125rem solid #fff;
	border-radius: .5rem;
	color: #fff;
}
.u-main-tip span {
	font-size: 1.125rem;
	color: #fff;
}
</style>

