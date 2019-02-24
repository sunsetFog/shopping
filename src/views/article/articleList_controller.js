import { Loadmore } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';




export default {
  data() {
    return {
      //obj:{},
      article_data:[],
      title:""
    }
  },

  computed: {
   
  },

  activated() {

    this.initData();

    if(window.localStorage.getItem("tempIndex")){
      let obj=JSON.parse(window.localStorage.getItem("tempIndex")).item.data;
      obj.forEach(e => {
        if(e.temp == "showheadline"){
          this.article_data=e.data;
          this.title=e.params.toptitle;
        }
      });

     }else{
       this.tempInfo()
     }

     //console.log(this.obj);
   
     this.fun.setWXTitle("");

  },

  mounted() {

    

  },
  methods: {
    tempInfo() {
      
			$http.get('home-page.index',{},"加载中...").then((response) => {
				if (!response) return;
				if (response.result == 1) {
					//this.bindMobile(response.data.mailInfo.is_bind_mobile);
          let obj=response.data.item.data;
          obj.forEach(e => {
            if(e.temp == "showheadline"){
              this.article_data=e.data;
              this.title=e.params.toptitle;
              
            }
          });

				} else {
					console.log(response.msg);
					//MessageBox.alert(response.msg)
				}
			}), (response) => {
				MessageBox.alert(response)
			}
    },
    
    //跳转
    gotoArticle(item){
      this.$router.push(this.fun.getUrl("articleContent",{id:item.articleid}));
    },

    //初始化数据
    initData(){
      this.article_data=[];
      this.title="";

    }
  },
  components: {cTitle}
}