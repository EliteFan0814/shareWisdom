<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="'修改'+title+'服务站位置'"
      :close-on-click-modal="false"
      @close="close"
      width="55%"
      @opened="dialogOpend"
    >
      <div id="mapCon"></div>
      <div class="inputCon">
        <input id="tbxSearch" type="text" placeholder="请输入搜索内容" />
        <div id="searchOut">&nbsp;</div>
      </div>
      <div class="headerk">
        <div space></div>
        <el-button
          type="primary"
          @click="sure()"
          style="margin-top: 10px;
          margin-left: 930px;"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const showMap = that => {
  // 蓝标
  AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
    // 初始化地图
          var map = new AMap.Map("mapCon", {
            resizeEnable: true, // 是否监控地图容器尺寸变化
            zoom: 13, // 初始化地图层级
            center: that.theCenter,
            scrollWheel: false
          });
    // 浏览器定位
    AMap.plugin(
      ["AMap.Autocomplete", "AMap.PlaceSearch", "AMap.Geolocation",'AMap.ToolBar',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.MapType',],
      () => {
             // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            // map.addControl(new AMap.ToolBar());

            // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            // map.addControl(new AMap.Scale());

            // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
            // map.addControl(new AMap.OverView({isOpen:true}));
          
            // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
            // map.addControl(new AMap.MapType());

        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        function onComplete(data) {
          // data是具体的定位信息
          console.log("空值 that.theCenter", that.theCenter);

          if (that.theCenter.length != 0) {
            console.log("进入有值判断");
          } else {
            console.log("进入无值判断");
            that.theCenter = [data.position.lng, data.position.lat];
          }
          

          // 拖拽生效
          var positionPicker = new PositionPicker({
            mode: "dragMap", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map: map // 依赖地图对象
          });
          positionPicker.on("success", positionResult => {
            //获得lat lng address三个值储存在data中
            console.log("positionResult", positionResult);
            console.log(
              positionResult.regeocode.addressComponent.adcode,
              "adcode"
            );
            that.lat = positionResult.position.lat;
            that.lng = positionResult.position.lng;
            that.address = positionResult.nearestJunction;
            that.poilist = positionResult.regeocode.pois;
            
            // if (that.row.region_info.adcode) {
            //   that.adcode = that.row.region_info.adcode;
            //   that.getregionID();
            // } else {
              that.adcode = positionResult.regeocode.addressComponent.adcode;
              that.getregionID();
            // }
            console.log('row',that.row.region_info.adcode);
            console.log('最新',that.adcode);
            
            // that.adcode = positionResult.regeocode.addressComponent.adcode;
          });
          positionPicker.start();

          // 输入框
          var autoOptions = {
            // 使用联想输入的input的id
            input: "tbxSearch",
            output: "searchOut"
          };
          // eslint-disable-next-line no-unused-vars,no-undef
          var autocomplete = new AMap.Autocomplete(autoOptions);
          // eslint-disable-next-line no-unused-vars,no-undef
          var placeSearch = new AMap.PlaceSearch({
            city: "北京",
            map: map
          });
          // eslint-disable-next-line no-unused-vars,no-undef
          // 监听输入框下拉
          AMap.event.addListener(autocomplete, "select", function(e) {
            // TODO 针对选中的poi实现自己的功能
            placeSearch.search(e.poi.name);
            // alert(e.poi.name)
          });

          //
        }
      }
    );
    // eslint-disable-next-line no-unused-vars,no-undef
  });
};
export default {
  props: ["row", "title"],
  data() {
    return {
      dialogVisible: false,
      theCenter: [],
      lat: "",
      lng: "",
      adcode: "",
      region_id: ""
    };
  },
  created() {
    setTimeout(() => {
      this.dialogVisible = true;
    }, 100);
  },
  mounted() {
    //经纬度赋值
    console.log("进入mounted判断");

    if (this.row.add_lon && this.row.add_lat) {
      this.theCenter[0] = this.row.add_lon;
      this.theCenter[1] = this.row.add_lat;
    } else {
    }
    // if (this.row.region_info.adcode) {
    //   this.adcode = this.row.region_info.adcode;
    //   this.getregionID();
    // } else {
    // }
  },
  methods: {
    dialogOpend() {
      showMap(this);
    },
    close(val) {
      this.$emit("close", val);
    },
    getregionID() {
      this.$http
        .post("/manage/region/index", {
          adcode: this.adcode
        })
        .then(res => {
          console.log(res,'adcode');
          this.region_id = res.data.region_info.id;
        });
    },
    sure() {
      this.$http
        .post("/manage/store/coordinate", {
          store_id: this.row.store_id,
          add_lat: this.lat,
          add_lon: this.lng,
          address: this.address,
          region_id: this.region_id,
        })
        .then(res => {
          this.$emit("close", "1");
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss" scoped>
#mapCon {
  width: 1000px;
  height: 600px;
}
.inputCon {
  position: absolute;
  top: 90px;
  left: 30px;
  #tbxSearch {
    height: 30px;
    width: 200px;
    padding: 0 0 0 4px;
    border-radius: 10px;
    background: #fff;
    border: 1px solid #999;
  }
  #searchOut {
    background: #fff;
  }
}
</style>
