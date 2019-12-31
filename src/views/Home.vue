<template>
  <div class="home">
    <!-- <h1>您有<span class="num">{{num}}</span>工单待处理</h1> -->
    <div class="cardBody">
      <div v-for="(item, index) in cardList"
        :key="index">
        <div>{{ item.title }}</div>
        <div @click="push(item.path,item.name)"
          class="route">{{ item.number }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      num: 0,
      // innerUrl: [
      //   '/member/MemberList',
      //   '/orderManage/RetailOrder',
      //   '/orderManage/WholesaleOrder',
      //   '/consignment/Consignment',
      //   '/mallManage/GoodsManage'
      // ],
      // cardList: [],
      dataMsg: []
    }
  },
  created() {
    this.getData()
  },
  computed: {
    cardList() {
      return [
        { path: '/sharewisdominfo/ExternalInfo',...this.dataMsg.order_release_num },// 点击跳转外协列表
        { path: '/sharewisdominfo/EmployInfo', ...this.dataMsg.recruit_release_num },// 点击跳转工人信息列表
        { path: '/sharewisdominfo/ServiceInfo',...this.dataMsg.service_release_num },// 点击跳转服务列表
      ]
    }
    // cardList() {
    //   return [
    //     { ...this.dataMsg.list, path: '/business/BusinessList', number: 0 },
    //     { ...this.dataMsg.img, path: '/member/MemberList', number: 1 },
    //     {
    //       ...this.dataMsg.message,
    //       path: '/order/Message',
    //       number: 2,
    //       data: { checkinfo: 1 }
    //     }
    //   ]
    // }
  },

  mounted() {
    //this.getData();
  },
  methods: {
    getData() {
      this.$http.get('/company/company/cencos').then(res => {
        this.dataMsg = res.data
        console.log()
      })
    },
    // getData() {
    //  this.$http.get("/manage/admin/cencos").then(res => {
    //     this.dataMsg = res.data.info;
    //     console.log(this.dataMsg);

    //   }).catch(err=>{
    //     this.$router.push("/login");
    //   });
    // },

    push(path,name) {
      this.$router.push({
        path: path,
        query: {
          queryName:name
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.num {
  color: red;
  display: inline-block;
  margin: 0 10px;
}
.cardBody {
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;

  > div {
    display: inline-block;
    width: 19%;
    margin: 20px 3%;
    height: 200px;
    border-radius: 12px;
    margin-bottom: 15px;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
    background: white;

    > div {
      &:first-child {
        font-size: 16px;
        padding: 10px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      &:last-child {
        text-align: center;
        padding: 40px 0;
        font-size: 40px;
        &:hover {
          cursor: pointer;
        }
      }
    }

    > img {
      width: 100px;
      height: 100px;
      top: 50%;
      right: 8%;
      transform: translateY(-50%);
    }
  }

  > div[space] {
    height: 0;
    margin: 0;
  }
}
.home {
  background: white;
  padding: 25px;
  border-radius: 8px;
}
</style>

