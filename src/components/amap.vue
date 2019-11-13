<template>
  <div>
    <div class="amap-wrapper">
      <el-amap vid="amapDemo"
        :zoom="zoom"
        class="amap-demo"
        :events="events">
        <el-amap-marker v-for="(item,index) in arr"
          :key="index"
          :position="item"
          :events="markerEcents"
          :vid="index"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    arr: {
      default: []
    }
  },
  data() {
    return {
      bool: false,
      coordinate: [],
      zoom: 15,
      events: {
        click: e => {
          // alert(typeof(this.arr))
          // console.log('维度'+e.lnglat.lat)
          // console.log('精度'+e.lnglat.lng)
          this.coordinate = []
          this.coordinate.push(e.lnglat.lng)
          this.coordinate.push(e.lnglat.lat)
          this.bool = true
          this.arr.push({ ...this.coordinate })
          this.$emit('send', this.arr)
        }
      },
      markerEcents: {
        click: e => {
          this.arr.splice(e.target.Uh.vid, 1)
          this.$emit('send', this.arr)
        }
      }
    }
  },
  methods: {
    del() {
      alert(1)
    }
  }
}
</script>

<style scoped lang="scss">
.amap-wrapper {
  width: 100%;
  height: 800px;
}
</style>
