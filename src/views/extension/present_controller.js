import cTitle from 'components/title';
export default {

  data() {
    return {
      toi: this.fun.getKeyByI(),
      datas: []
    }
  },

  activated() {
    this.toi = this.fun.getKeyByI();
    this.datas = [];

    if(!this.fun.isTextEmpty(this.$route.params.type) && this.$route.params.type == 1){
     this.getData("6");
    }else{
     this.getData("5");//获取数据
    }
    
  },
  mounted() {
    this.toi = this.fun.getKeyByI();
  },

  methods: {
    //获取数据 已提现佣金
    getData(type) {
      let that = this;
      let json = { commission_type: type, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('plugin.commission.api.commission.get-commission-list', json, "加载中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.datas = response.data;
        } else {
          console.log(response.msg);
        }

      }, function (response) {
        console.log(response);
      });
    },
  },
  components: { cTitle }
}