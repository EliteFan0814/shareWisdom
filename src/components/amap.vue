<template>
  <div class="amap-wrapper">
    <el-amap class="amap-demo" vid="amapDemo" :zoom="zoom" :center="center" :plugin="plugin" :events="events">
      <!-- <el-amap-search-box class="search-box"
        :search-option="searchOption"
        :on-search-result="onSearchResult"></el-amap-search-box> -->
      <!-- 标记 -->
      <input type="text" placeholder="请输入地址" id="pickerInput" class="search-box">
      <el-amap-marker vid="amap-wrapper" :position="center"></el-amap-marker>
    </el-amap>
    <span>当前位置：{{address}}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 获取了当前行的全部，但是只是用省 市 区 的id
    th_position: {
      default: {}
    },
    user_id: {
      default: ''
    },
    is_service: {
      default: false
    },
    what_class: {
      default: false
    }
  },
  created() {
    // 如果有客户信息，则获取客户信息并通过省市id定位地址
    if (this.user_id) {
      this.province_id = this.th_position.province_id
      this.city_id = this.th_position.city_id
      this.county_id = this.th_position.county_id
      this.is_click = true
    }
  },
  computed: {
    // 实时更改地址相关信息
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
      address: '请在地图上选择位置',
      lng: 116.396732,
      lat: 39.907478,
      adcode: '',
      province_id: '',
      city_id: '',
      county_id: '',
      zoom: 12,
      events: {
        // 用户点击后触发选择地址事件
        click: e => {
          this.lng = e.lnglat.lng // 经度
          this.lat = e.lnglat.lat // 纬度
          this.center = [this.lng, this.lat]
          this.is_click = true
          // 这里通过高德 SDK 通过经纬度获取 adcode 并转换为各省市区id
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          // 通过点击获取的经纬度获取 adcode address 并解析出各省市区id
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
                    self.$emit('getPosition', self.location_info)
                  })
                  .catch(err => {})
                self.$nextTick()
              }
            }
          })
        },
        // 地图内搜索框
        init(map) {
          // AMapUI.setDomLibrary($)
          AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
            var poiPicker = new PoiPicker({
              input: 'pickerInput' //搜索框id
            })
            //监听poi选中信息
            poiPicker.on('poiPicked', function(poiResult) {
              self.lng = poiResult.item.location.lng // 经度
              self.lat = poiResult.item.location.lat // 纬度
              self.center = [self.lng, self.lat]
              self.address = poiResult.item.district + poiResult.item.name
              self.adcode = poiResult.item.adcode
              self.is_click = true
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
                  console.log('self.location_info', self.location_info)
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
            }
          }
        }
      ]
    }
  },
  methods: {
    // 根据用户id获取经纬度和地址
    getUserLocation(user_id) {
      let url = ''
      if (this.what_class === 'recruit') {
        url = '/company/recruit/info'
      } else if (this.what_class === 'order') {
        url = '/company/order/info'
      } else {
        url = '/company/service/info'
      }
      return new Promise((resolve, reject) => {
        this.$http
          .get(url, {
            params: {
              recruit_id: user_id,
              order_id: user_id,
              service_id: user_id
            }
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
    border-radius: 5px;
    border: 1px solid #ddd;
    outline: none;
    padding: 5px;
  }
}
</style>
