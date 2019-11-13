<template>
  <div>
    <el-dialog
      @close="close"
      title="地图"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      width="60%"
      class="btnbox"
    >
        <div class="amap-wrapper">
          <el-amap class="amap-box" :center="mapCenter" :zoom="14" :v-model="markers">
            <el-amap-marker :position="position" ></el-amap-marker>
          </el-amap>
        </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["form"],
  created() {
    // console.log(this.form);
  },
  data() {
    return {
      isDialog: true,
      markers:[],
      position:[112.43, 34.67],
      mapCenter: [112.43, 34.67],
      searchOption: {
        city: '洛阳',
        citylimit: true
      },
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    open(data) {
      this.$emit("close");
    },
    addMarker() {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
      this.markers.push([lng, lat]);
    },
    onSearchResult(pois) {
      this.markers = [];
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let {lng, lat} = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [center.lng, center.lat];
      }
    }
  }
};
</script>
<style>
.btnbox {
  text-align: center;
}
.search-box {
  position: absolute;
  left: 20px;
}
.amap-box {
  margin-top: -20px;
}
.btn {
  display: inline-block;
  width: 70%;
}
.btn.pay {
  position: relative;
  margin-left: -3px;
}
.btn:nth-of-type(2) {
  margin-top: 10px;
}

.amap-wrapper {
  width: 100%;
  height: 500px;
}
</style>

