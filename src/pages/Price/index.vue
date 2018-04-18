<template>
	<div class="g-price">
		<div class="g-hd">
			<div class="m-nv">
				<div class="triangle" ref='ctTriangle'></div>
				<span class="ct box" @click='changeCt(0)'>废纸箱</span>
				<span class="ct newspaper" @click='changeCt(1)'>废报纸</span>
				<span class="ct book" @click='changeCt(2)'>废书纸</span>
			</div>
			<div class="m-bd">
				<div class="u-dmy">
					<div class="select-dmy" ref='dmySelect'></div>
					<span class="dmy day" :class="{'active': dmy == 0}" @click='changeDMY(0)'>日</span>
					<span class="dmy month" :class="{'active': dmy == 1}" @click='changeDMY(1)'>月</span>
					<span class="dmy year" :class="{'active': dmy == 2}" @click='changeDMY(2)'>年</span>
				</div>
			</div>
			<div class="m-value">
        <div class="view-port">
          <div class="value-cnt" :class="[{'margin-1': margin==1},{'margin-2': margin==2},{'margin-3': margin==3}]">
            <div class="value">0.6 <span>元/斤</span> </div>
            <div class="value">0.75<span>元/斤</span></div>
            <div class="value">0.45<span>元/斤</span></div>
          </div>
        </div>
      </div>
			<div class="m-month" ref='mMonth'>
				<div class="triangle" ref='mTriangle'></div>
				<span class="month" @click='changeMonth(1)'>1月</span>
				<span class="month" @click='changeMonth(2)'>2月</span>
				<span class="month" @click='changeMonth(3)'>3月</span>
				<span class="month" @click='changeMonth(4)'>4月</span>
			</div>
		</div>
		<div class="g-bd">
			<div class="u-tips">
				<span class="top">1月价格趋势</span>
				<span class="bottom">手指移至曲线图上，可查看每日趋势</span>
			</div>
			<div class="u-line" id='line-chart'></div>
			<div class="u-detail">
				<div class="top">
					<div class="wrapper">
						<div class="left">
							<img src="/static/icons/order-selected.png" alt="order" class="order">
							交易量(笔)
						</div>
						<span class="value">200</span>
					</div>
				</div>
				<div class="bottom">
					<div class="wrapper">
						<div class="left">
							<img src="/static/icons/sell-selected.png" alt="sell" class="sell">
							交易金额
						</div>
						<span class="value">489.33</span>
					</div>
				</div>
			</div>
		</div>
		<div class="fill-pg" ref='fillPg'></div>
		<div class="g-ft" ref='ft'>
			<div class="left">
				<img src="/static/icons/recycleBox.png" alt="recycleBox" class='recycle-box'>
				<span>回收箱</span>
			</div>
			<div class="right">
				<div class="btn-wrapper">
					<div class="left-btn">加入回收箱</div>
					<div class="right-btn">立即下单</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  mounted() {
    this.initChart(this.data)
    this.changeCt(0);
    this.changeDMY(this.dmy);
    this.changeMonth(3);
		const ft = this.$refs.ft
		const fillPg = this.$refs.fillPg
		const html = document.getElementsByTagName("html")[0];
    let htmlUnitFontSize = window
      .getComputedStyle(html, null)
      .getPropertyValue("font-size");
    htmlUnitFontSize = parseFloat(htmlUnitFontSize);
		let height = ft.getBoundingClientRect().height + htmlUnitFontSize + "px"
		fillPg.style.height = height
  },
  data() {
    return {
      dmy: 1,
      chart: null,
      data: [220, 182, 191, 134, 150, 120, 110, 125, 145],
      margin: 2
    };
  },
  methods: {
    initChart(data) {
      this.chart = echarts.init(document.getElementById('line-chart'))
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#797979',
              type: 'dashed'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          data: ['1-12', '1-13', '1-14', '1-15', '1-16', '1-17', '1-18', '1-19', '1-20']
        }],
        yAxis: [{
          type: 'value',
          name: '(元)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#797979',
              type: 'dashed'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {
            lineStyle: {
              color: '#797979',
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: '废纸',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(172,103,255, 0.3)'
              }, {
                offset: 1,
                color: 'rgba(172,103,255, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(172,103,255)',
              borderColor: 'rgba(172,103,255,0.27)',
              borderWidth: 12
            }
          },
          data: data
        }]
      })
    },
    changeCt(i) {
      this.dmy = 1;
      this.changeDMY(1);
      let cts = document.getElementsByClassName("ct");
      let ct = cts[i].getBoundingClientRect();
      let ctTri = this.$refs.ctTriangle;
      let mNv = document
        .getElementsByClassName("m-nv")[0]
        .getBoundingClientRect();
      let left =
        ct.left +
        ct.width / 2 -
        ctTri.getBoundingClientRect().width / 2 -
        mNv.x +
        "px";
      ctTri.style.left = left;
    },
    changeDMY(i) {
      this.margin = i + 1;
      this.dmy = i;
      let dmys = document.getElementsByClassName("dmy");
      let udmy = document
        .getElementsByClassName("u-dmy")[0]
        .getBoundingClientRect();
      let dmy = dmys[i].getBoundingClientRect();
      let dmySelect = this.$refs.dmySelect;
      let left =
        dmy.width / 2 +
        dmy.left -
        udmy.x -
        dmySelect.getBoundingClientRect().width / 2 +
        "px";
      dmySelect.style.left = left;
    },
    changeMonth(i) {
      let mns = document.getElementsByClassName("month");
      console.log(mns);
      let mn = mns[i].getBoundingClientRect();
      let mMonth = document
        .getElementsByClassName("m-month")[0]
        .getBoundingClientRect();
      let mTri = this.$refs.mTriangle;
      let mNv = document
        .getElementsByClassName("m-nv")[0]
        .getBoundingClientRect();
      let left =
        mn.left +
        mn.width / 2 -
        mTri.getBoundingClientRect().width / 2 -
        mMonth.x +
        "px";
      mTri.style.left = left;
      this.$set(this.data, 0, '111')
      this.data.forEach(i => {
        let t = this.data.shift()
        t = Math.floor(Math.random()*111+10);
        this.data.push(t)
      })
      this.initChart(this.data)
    }
  }
};
</script>
<style scoped>
.fill-pg {
	background: #f2f2f2;
}
.g-price {
  height: 100%;
  width: 100%;
}
.g-hd {
  padding-top: 1rem;
  background: linear-gradient(to right, #6ee0ff, #32aafa);
  /* padding-bottom: 1rem; */
}
.g-bd {
  width: 100%;
  background: #fff;
	margin-bottom: 1rem;
}
.m-nv {
  width: 95%;
  height: 2rem;
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  color: #fff;
  font-size: 1rem;
}

.g-hd .m-bd {
  width: 75%;
  height: 2rem;
  margin: 1rem auto;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 1px -1px #2ca0f8 inset, 0 -1px 1px -1px #2ca0f8 inset,
    -2px 0 1px -1px #2ca0f8 inset;
}
.u-dmy {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 0.875rem;
}

.u-dmy span {
  z-index: 10;
}

.u-dmy .active {
  color: #32aafa;
}
.triangle {
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-bottom: 0.5rem solid #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 200ms;
}

.select-dmy {
  height: 1.5rem;
  width: 3rem;
  background: #fff;
  position: absolute;
  bottom: 0.25rem;
  left: 0;
  transition: all 200ms;
  z-index: 9;
  border-radius: 0.75rem;
  box-shadow: 0 0 7px rgba(153, 153, 153, 0.4);
}

.m-value {
  width: 100%;
  margin: 2rem 0;
  text-align: center;
  display: flex;
  justify-content: center;
  font-size: 3rem;
  color: #fff;
  font-weight: bold;
}
.m-value .view-port {
  height: 5rem;
  width: 12rem;
  overflow: hidden;
}

.m-value .value-cnt {
  width: 300%;
  display: flex;
  transition: all 200ms;
}
.margin-1 {
  margin-left: 0;
}
.margin-2 {
  margin-left: -100%;
}
.margin-3 {
  margin-left: -200%;
}
.m-value .value {
  width: 100%;
}
.m-value .value span {
  font-size: 1rem;
}

.m-month {
  width: 80%;
  height: 2rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 0.8125rem;
  position: relative;
}

img.order,
img.sell {
  width: 1.875rem;
  height: 1.875rem;
}

.g-bd .u-tips {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.u-tips .top {
  margin: 1rem 0;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}

.u-tips .bottom {
  font-size: 0.875rem;
  color: #797979;
}

.g-bd .u-line {
  width: 80%;
  height: 12rem;
  margin: 0 auto;
}
.g-bd .u-detail {
  width: 100%;
  background: #fff;
}

.g-bd .u-detail .top,
.g-bd .u-detail .bottom {
  width: 100%;
	padding: .6rem 0;
}

.g-bd .u-detail .top {
  border-bottom: 1px solid #f2f2f2;
}

.g-bd .u-detail .wrapper {
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.g-bd .u-detail {
  color: #666;
  font-size: 0.75rem;
}

.g-bd .u-detail .wrapper .left {
  display: flex;
  align-items: center;
}

img.recycle-box {
	width: 2.25rem;
	height: 2.25rem;
	margin: -.6rem;
}

.g-ft {
	height: 3rem;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	position: fixed;
	bottom: 0;
}

.g-ft .left {
	width: 35%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: .75rem;
	color: #333;
	border-right: 1px solid #f2f2f2;
}

.g-ft .right {
	width: 65%;
}
.g-ft .right .btn-wrapper {
	width: 90%;
	height: 2rem;
	margin: 0 auto;
	/* height: 90%; */
	border-radius: 1rem;
	display: flex;
	justify-content: space-between;
	background: linear-gradient(to right, #6ee0ff, #32aafa);
}

.g-ft .right .btn-wrapper .left-btn,
.g-ft .right .btn-wrapper .right-btn {
	width: 50%;
	height: 100%;
	text-align: center;
	line-height: 2rem;
	color: #fff;
	font-size: .875rem;
}

.left-btn {
	border-right: 1px solid #fff;
}

</style>
