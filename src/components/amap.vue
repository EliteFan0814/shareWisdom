<template>
  <div class="amap-wrapper">
    <el-amap class="amap-demo"
      vid="amapDemo"
      :zoom="zoom"
      :center="center"
      :plugin="plugin"
      :events="events">
      <!-- <el-amap-search-box class="search-box"
        :search-option="searchOption"
        :on-search-result="onSearchResult"></el-amap-search-box> -->
      <!-- 标记 -->
      <input type="text"
        id="pickerInput"
        class="search-box">
      <el-amap-marker vid="amap-wrapper"
        :position="center"></el-amap-marker>
    </el-amap>
    <span>当前位置：{{address}}</span>
  </div>
</template>

<script>
export default {
  props: {
    // map_lng: {
    //   default: ''
    // },
    // map_lat: {
    //   default: ''
    // },
    // trans_ad: {
    //   default: ''
    // },
    // more_info: {
    //   default: ''
    // },
    th_position: {
      default: {}
    },
    user_id: {
      default: ''
    },
    is_service: {
      default: false
    }
  },
  created() {
    if (this.user_id) {
      console.log('amap从负组件获取的：',this.th_position)
      this.province_id = this.th_position.province_id
      this.city_id = this.th_position.city_id
      this.county_id = this.th_position.county_id
      this.is_click = true
    }

    // if (this.user_id) {
    //   let url = '/company/order/info'
    //   if (this.is_service) {
    //     url = '/company/service/info'
    //   }
    //   this.$http
    //     .get(url, {
    //       params: { service_id: this.user_id, order_id: this.user_id }
    //     })
    //     .then(res => {
    //       if (res.code) {
    //         this.province_id = res.data.info.province_id
    //         this.city_id = res.data.info.city_id
    //         this.county_id = res.data.info.county_id
    //         this.is_click = true
    //         console.log('created的时候的：',this.location_info)
    //         this.$emit('getPosition', self.location_info)
    //       }
    //     })
    // }
  },
  computed: {
    location_info() {
      return {
        is_click: this.is_click,
        add_lat: this.lat, //经度
        add_lon: this.lng, // 维度
        address: this.address,
        province_id: this.province_id,
        city_id: this.city_id,
        county_id: this.county_id
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
      address: '请用地图选择位置',
      lng: 116.396732,
      lat: 39.907478,
      adcode: '',
      province_id: '',
      city_id: '',
      county_id: '',
      zoom: 12,
      events: {
        // 用户点击后触发选择地址
        click: e => {
          this.lng = e.lnglat.lng // 经度
          this.lat = e.lnglat.lat // 纬度
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
                // 根据 adcode 切换成 province_id city_id  county_id
                self.$http
                  .post('/company/region/byCode', {
                    adcode: self.adcode
                  })
                  .then(res => {
                    let list = res.data
                    self.province_id = list.province_info.id
                    self.city_id = list.city_info.id
                    self.county_id = list.county_info.id
                    console.log('self.location_info', self.location_info)
                    self.$emit('getPosition', self.location_info)
                  })
                  .catch(err => {})
                self.$nextTick()
              }
            }
          })
        },
        // 搜索框
        init(map) {
          // AMapUI.setDomLibrary($)
          AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
            var poiPicker = new PoiPicker({
              input: 'pickerInput' //输入框id
            })
            //监听poi选中信息
            poiPicker.on('poiPicked', function(poiResult) {
              self.lng = poiResult.item.location.lng // 经度
              self.lat = poiResult.item.location.lat // 纬度
              self.center = [self.lng, self.lat]
              console.log('poi adcode', poiResult.item.adcode)
              // self.adcode = poiResult.item.adcode
              self.address = '请再次手动选择具体位置！'
              //用户选中的poi点信息
              // 根据 adcode 切换成 province_id city_id  county_id
              self.$http
                .post('/company/region/byCode', {
                  adcode: self.adcode
                })
                .then(res => {
                  let list = res.data
                  self.province_id = list.province_info.id
                  self.city_id = list.city_info.id
                  self.county_id = list.county_info.id
                  self.$emit('getPosition', self.location_info)
                })
                .catch(err => {})
            })
          })
        }
      },
      plugin: [
        {
          // 初始定位
          pName: 'Geolocation',
          events: {
            init(o) {
              // 如果用户存在，就获取用户的经纬度
              if (self.user_id) {
                self.getUserLocation(self.user_id).then(res => {
                  console.log('成功获取用户经纬', res)
                  self.lng = res.lng
                  self.lat = res.lat
                  self.address = res.address
                  self.center = [self.lng, self.lat]
                  self.loaded = true
                  self.is_click = true
                  console.log('初始定位时发送给父组件', self.location_info)
                  self.$emit('getPosition', self.location_info)
                })
              } else {
                // 如果用户不存在，就根据IP自动定位
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
              // if (self.map_lng === '' && self.map_lat === '') {
              //   o.getCurrentPosition((status, result) => {
              //     if (result && result.position) {
              //       self.lng = result.position.lng
              //       self.lat = result.position.lat
              //       self.center = [self.lng, self.lat]
              //       self.loaded = true
              //       self.$nextTick()
              //     }
              //   })
              // }
            }
          }
        }
      ]
    }
  },
  methods: {
    getUserLocation(user_id) {
      let url = '/company/order/info'
      if (this.is_service) {
        url = '/company/service/info'
      }
      return new Promise((resolve, reject) => {
        this.$http
          .get(url, {
            params: { order_id: user_id, service_id: user_id }
          })
          .then(res => {
            if (res.code) {
              let position = {}
              position.lng = res.data.info.add_lon
              position.lat = res.data.info.add_lat
              position.address = res.data.info.address
              resolve(position)
            }
          })
          .catch(err => {
            console.log('amap组件获取客户经纬度错误！', err)
          })
      })
    },
    searchOption() {},
    del() {
      alert(1)
    }
  }
}
</script>

<style scoped lang="scss">
.amap-wrapper {
  width: 90%;
  height: 400px;
  .search-box {
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
</style>
