<template>
	<div class="m-pop">
		<div class="u-mask"></div>
		<div class="u-cnt">
			<div class="card">
				<div class="hd">
					<img src="/static/img/avatar.png" alt="avatar">
					<span class="name">Krystal</span>
				</div>
				<div class="table-main">
					<div class="column">
						<span class="title">种类</span>
						<div class="item" v-for="d in currentOrder.detail" :key="d">
							<span class="category">{{d}}</span>
						</div>
					</div>
					<div class="column">
						<span class="title">重量(斤)</span>
						<div class="item" v-for="(d, index) in currentOrder.detail" :key="index">
							<input class='my-input' v-model="weight[index]" type="text" placeholder="请输入">
						</div>
					</div>
					<div class="column">
						<span class="title">单价(角/斤)</span>
						<div class="item" v-for="(d, index) in currentOrder.detail" :key="index">
							<input type="text" v-model="price[index]" placeholder="请输入">
						</div>
					</div>
					<div class="column">
						<span class="title">总价(元)</span>
						<div class="item" v-for="(d, index) in currentOrder.detail" :key="index">
							<input  class='total-input' type="text" :placeholder="getTotal(index)" disabled='true'>
						</div>
						<!-- <div class="item">
							<input type="text" v-model="bookTotal" disabled='true'>
						</div>
						<div class="item">
							<input type="text" v-model="bottleTotal" disabled='true'>
						</div>
						<div class="item">
							<input type="text" v-model="ironTotal" disabled='true'>
						</div> -->
					</div>
				</div>
				<div class="total">
					总价：<span>{{totalValue}}</span>
				</div>
				<div class="confirm-btn" @click='confirm'>发起确认</div>
			</div>
			<div class="cancel" @click='cancelCheck'>X</div>
		</div>
	</div>
</template>
<script>
import { GridsGroup, GridsItem } from "vue-ydui/dist/lib.rem/grids";
import { Input } from "vue-ydui/dist/lib.rem/input";
export default {
  props: {
    currentOrder: Object
  },
  data() {
    return {
      weight: [],
      price: []
    }
  },
  mounted() {
    const card = document.getElementsByClassName('card')[0]
    card.style.height = card.clientHeight + 'px'
  },
  components: {
    ydGridsGroup: GridsGroup,
    ydGridsItem: GridsItem,
    ydInput: Input
  },
  methods: {
    getTotal(i) {
      let total = parseFloat(parseFloat(this.weight[i]) * parseFloat(this.price[i]))
      if (total) return total
    },
    confirm() {
			console.log('c')
      let d = {}
      for (let i = 0; i < this.currentOrder.detail.length; i++) {
        let k = this.currentOrder.detail[i]
        d[k] = `${this.weight[i]}-${this.price[i]}`
      }
      this.$emit("confirm", d);
    },
    cancelCheck() {
			console.log('cancel')
      this.$emit("cancelCheck");
    }
  },
  computed: {
    totalValue() {
      let total = 0
      for (let i = 0; i < this.weight.length; i++) {
        total += this.getTotal(i)
      }
      if (total)
        return parseFloat(total)
    }
  }
};
</script>
<style scoped>
input {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  color: #ffaa42;
  font-weight: 400;
  font-style: normal;
  font-size: 1rem;
  text-align: center;
}

.total-input::placeholder {
  color: #ffaa42;
  font-weight: 400;
  font-style: normal;
  font-size: 1rem;
  text-align: center;
}

input::placeholder {
  font-size: 0.8125rem;
  color: #999;
}

input:focus::placeholder {
  color: #fff;
}

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
  justify-content: space-around;
}
.u-cnt {
  z-index: 1502;
}

.card {
  /* height: 58.869%; */
  width: 89.866%;
  background: #fff;
  /* margin-top: -3rem; */
  color: #333;
  font-weight: 400;
  text-align: center;
  line-height: normal;
  border-radius: 0.475em;
}
.hd {
  height: 12.31%;
  width: 100%;
  background: linear-gradient(to right, #6ee0ff, #32aafa);
  border-radius: 0.475em 0.475em 0 0;
  text-align: center;
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hd img {
  height: 1.875rem;
  width: 1.875rem;
}
.hd img::after {
  content: "Krystal";
}
.hd .name {
  margin-left: 0.85rem;
}
.table-main {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  color: #333;
}
.table-main .column {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.table-main .title {
  font-size: 0.875rem;
}
.table-main .column .item {
  width: 100%;
  height: 1.5rem;
  text-align: center;
  margin-top: 1rem;
  font-size: 1rem;
}
.total {
  margin: 1.0625rem 0 0 0;
  color: #333;
  font-size: 1rem;
}
.total span {
  font-weight: bold;
  color: #ffaa42;
  font-size: 1.25rem;
  margin-left: 1rem;
}
.confirm-btn {
  width: 7rem;
  height: 2.5rem;
  border: 1px solid #32aafa;
  border-radius: 0.6rem;
  margin: 2rem auto;
  color: #32aafa;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  line-height: 2.5rem;
	cursor: pointer;
}
.cancel {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  border: 2px solid #fff;
  color: #fff;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 8rem; */
}
</style>
