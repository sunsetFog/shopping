import { Loadmore } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';



export default {
  data() {
    return {
      information: {my_name: '1',phone_number: '2',
                    store_name: '3',store_logo: '4',
                    bank_account: '5',owner_namme: '6',opening_bank: '7',opening_branch: '8',alipay_en: '9',alipay_username_en: '10',alipay: '11',alipay_username: '12',weChat_account: '13'},
      //setting sun
			imageUrl: '',
      uploadUrl:'',
    }
  },

  //setting sun
	activated() {
    this.init();
		this.urlUp();
	},

  mounted() {
      this.getJson();
  },
  methods: {
    //初始化信息
    init(){
      this.information.store_logo = "";
      this.imageUrl = "";
    },
    //初始对接数据
    getJson(){
        
    },
    modifyInformation(){
      console.log('rain');
    },
    //setting sun
		//上传url
		urlUp(){
			this.uploadUrl = this.fun.getRealUrl("plugin.store-cashier.frontend.store.store.upload",{});
		},
		handleStoreSuccess(res, file) {
			console.log(res)
            this.imageUrl = URL.createObjectURL(file.raw);
            if (res.result == 1) {
                this.information.store_logo = res.data.img;
            } else {
                Toast(res.msg);
            }
		},
		beforeUpload(file) {
            //const isJPG = file.type === 'image/jpeg';
            const isPNG = (file.type === 'image/png' || file.type === 'image/jpeg');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPNG) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isPNG && isLt2M;
		},
  },
  components: {cTitle}
}