import cTitle from 'components/title';
  export default {
data() {
      return {
        toi: this.fun.getKeyByI(),
        item:''

      };
    },
    methods:{

    },
    activated () {
      this.toi = this.fun.getKeyByI();
      this.item = this.$route.params.item;
      
    },
    components: { cTitle }
  }