<template>
  <div ref='main' class="company-detail-wrapper">
    <header>
    </header>
    <main>
      <section class="person-info">
        <img src="https://upload.jianshu.io/users/upload_avatars/5377782/f1235844-4f9e-4049-ab95-d0a1005fcc6d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240" alt="">
        <span class="distance">距您 183 m</span>
        <h3 class='company-name'>杭州阳光废品回收站</h3>
        <div class="fn-info">
          <div class="fn-item command">
            <span class="value">4.9</span>
            <span class="title">评价</span>
          </div>
          <div class="fn-item contact">
            <span class="value">4.9</span>
            <span class="title">与他联系</span>
          </div>
        </div>
      </section>

      <section class="price-info">
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
      </section>

    <section class="company-info">
      <div class="address">
        <span class='title'>地<span style='color: transparent'>填充填</span>址</span>
        <span class='value'>阳光区阳光路666号</span>
        <span>
          <img src="/static/icons/location.png" alt="location" class='location-icon'>
        </span>
      </div>
      <div class="detail">
        <span class='title'>回收站介绍</span>
        <span class='value'>价格仅供参考，其他废品不收，废品尽量早点送过来。</span>
      </div>
    </section>

    <div class="btn-wrapper flex-center normal-login-wrapper">
        <button class='login-btn'>发送请求</button>
      </div>

    </main>
  </div>
</template>
<script>
import MyFooter from "@/components/MyFooter";
export default {
  mounted() {
    // 重绘页面高度完成滚动条
    this.$refs.main.style.height = `${this.$refs.main.clientHeight + 58}px`
    console.log(this.$refs.main.clientHeight, this.$refs.footer.clientHeight)
    
  },
  components: {
    MyFooter
  }
};
</script>
<style scoped>
.company-detail-wrapper {
  font-family: "苹方";
  height: 100%;
	overflow: hidden;
	background: #fff;
}
header {
  width: 101%;
  height: 177px;
  background: linear-gradient(to right, #6ee0ff, #32aafa);
}

main {
  width: 354px;
  height: 417px;
  margin: 0 auto;
  margin-top: -72px;
  position: relative;
}

.person-info {
  width: 100%;
  height: 137px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #ccc;
  text-align: center;
  background-color: #fff;
}

.person-info img {
  display: inline-block;
  width: 66px;
  border: 2px solid #fff;
  border-radius: 50%;
  height: 66px;
  box-shadow: 1px 1px 5px 0 #ccc;
  margin-top: -33px;
}

.distance {
  font-size: 11px;
  color: #666;
  position: absolute;
  top: 8px;
  right: 13px;
}

.company-name {
  margin-top: 7px;
  font-size: 17px;
}

.fn-info {
  margin-top: 8px;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
}

.fn-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
}

.fn-item .value {
  color: #32aafa;
  font-size: 22px;
}

.fn-item .title {
  color: #999;
  font-size: 13px;
}

.price-info {
  width: 100%;
  padding: 4px;
  height: 70px;
  margin-top: 15px;
  margin-bottom: 18px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.price-info::-webkit-scrollbar {
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

.company-info {
  box-sizing: border-box;
  width: 100%;
  height: 135px;
  padding: 10px;
  box-shadow: rgba(204, 204, 204, 0.35) 0px 0px 8px;
}

.address {
  box-sizing: border-box;
  height: 34px;
  padding: 0 7px 0 4px;
  border-bottom: 1px solid #f2f2f2;
}
.company-info .title {
  font-size: 15px;
  color: #2b2b2c;
  display: block;
  float: left;
}

.company-info .value {
  font-size: 15px;
  color: #666;
  margin-left: 8px;
  display: block;
  float: left;
}

.company-info .detail {
  box-sizing: border-box;
  padding: 0 7px 0 4px;
  margin-top: 10px;
  height: 100px;
}

.company-info .detail .value {
  max-width: 226px;
}

.location-icon {
  float: right;
  width: 22px;
  height: 22px;
  margin: 0;
  padding: 0;
}

.normal-login-wrapper {
  margin-top: 10px;
}

.login-btn {
  padding: 0;
  width: 339px;
  height: 42px;
  border: none;
  border-radius: 21px;
  background: linear-gradient(to right, #6ee0ff, #32aafa);
  font-family: "苹方";
  color: #fff;
  font-size: 16px;
  box-shadow: rgba(204, 204, 204, 0.35) 0px 0px 5px;
  

  margin-bottom: 100px;
}

.login-btn:focus {
  outline: none;
}

.footer {
  position: fixed;
  bottom: 0;
}
</style>
