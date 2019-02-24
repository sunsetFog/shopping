import cTitle from 'components/title';
import {Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default{
    components: { cTitle },
    data(){
        return{
            obj:{}
        }
    },
    activated() {
        this.obj={};
        this.getData();
	},
    methods:{
        getData(){
            $http.get("income.share-page.index",{},"加载中...").then(res =>{
                if(res.result == 1){
                    this.obj=res.data;
                }else{
                    MessageBox.alert(res.msg)
                }
            }).catch(error =>{
                console.log(error);
            })
        }
    }
}