import cTitle from 'components/title';


export default {
  data() {
    return {
     
    }
  },

  activated() {
   
  },
  mounted() {
  },

  methods: {
   
    gotoInfo(){
      this.$router.push(this.fun.getUrl('SupInfoManage'));
    },
    manage(){
    	this.$router.push(this.fun.getUrl('CommodityManagement'));
    }



   
    
   


    
    
  
    
    
    
    
   
  },
  components: { cTitle }
}
