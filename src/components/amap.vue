<template>
    <div class="amap-wrapper">
      <el-amap class="amap-demo"
        vid="amapDemo"
        :zoom="zoom"
        :center="center"
        :plugin="plugin"
        :events="events">
        <el-amap-marker vid="amap-wrapper"
          :position="center">
        </el-amap-marker>
      </el-amap>
      <span v-if="is_click">当前位置：{{address}}</span>
    </div>
</template>

<script>
export default {
  props: {
    map_lng: {
      default: ''
    },
    map_lat: {
      default: ''
    }
  },
  created() {
    if (this.map_lng && this.map_lat) {
      this.lng = this.map_lng
      this.lat = this.map_lat
      this.center = [this.lng, this.lat]
    }
  },
  computed: {
    location_info() {
      return {
        is_click:this.is_click,
        add_lon: this.lng,
        add_lat: this.lat,
        address: this.address,
        province_id: this.province_id,
        city_id: this.city_id,
        county_id: this.county_id,
      }
    }
  },
  data() {
    let self = this
    return {
      is_click: false,
      loaded: false,
      inner_lng_lat: [],
      center: [116.396732, 39.907478],
      address: '',
      lng: 0,
      lat: 0,
      adcode: '',
      province_id: '',
      city_id: '',
      county_id: '',
      zoom: 12,
      events: {
        click: e => {
          this.lng = e.lnglat.lng
          this.lat = e.lnglat.lat
          this.center = [this.lng, this.lat]
          this.is_click = true

          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([this.lng, this.lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.adcode = result.regeocode.addressComponent.adcode
                self.address = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })

          // 根据 adcode 切换成 province_id city_id  county_id
          this.$http
            .post('/company/region/byCode', {
              adcode: this.adcode
            })
            .then(res => {
              let list = res.data
              this.province_id = list.province_info.id
              this.city_id = list.city_info.id
              this.county_id = list.county_info.id
              this.$emit('getPosition', this.location_info)
              // console.log('location_info', this.location_info)
            })
            .catch(err => {})
        }
      },
      plugin: [
        {
          // 初始定位
          pName: 'Geolocation',
          events: {
            init(o) {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  self.loaded = true
                  self.$nextTick()
                }
              })
            }
          }
        }
      ]
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
  width: 90%;
  height: 300px;
}
</style>
