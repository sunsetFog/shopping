	//import { mapState } from 'vuex';
	import cTitle from 'components/title';
	import cRootlist from 'components/rootlist';
	import cCarcontent from 'components/carcontent';
	import { Loadmore } from 'mint-ui';
	import BScroll from 'better-scroll';
	import { mapState,mapMutations } from 'vuex';

	export default {
		data() {
			return {
				active: 9999,
				active2:true,
				allLoaded: false,
				topStatus: '',
				err:'',
				turl: '/category',
				arg: { index: 10, item: 'pinch' },
				list: [],
				contentlist: {},
			}
		},
		computed: {
			...mapState(["category",'blurst']),
			zoneId(){
				if(this.$store.state.zoneId == ""){
					this.$store.commit('setZoneId', window.localStorage.getItem("zoneId"));
				}
	
				return this.$store.state.zoneId;
			}
		},
		methods: {
			
			allList(){
				this.active2 = true;
				this.active = 9999;
				this.getContentlist2();
			},
			tabsa(n, i) {
				this.$store.commit('setAdvimg',i);
				//this.$store.state.category.adv_img
				//console.log("ii",this.$store.state.category.adv_img);
				this.active = n;
				this.active2 = false;
				this.getContentlist(i.id);
			},
			bpfun(){
				this.$router.push(this.fun.getUrl('brand'));
			},
			getList()
			{
				 $http.get('goods.category.get-category',{as_id:this.zoneId}).then((response)=>
				{
						if(response.result == 1){
							var myData = response.data;
							this.list = response.data.data;
						}		
				}, function (response) {
											// error callback
										});			
			},
			getContentlist(id){
				let jsons = {parent_id:id,as_id:this.zoneId};
				$http.get('goods.category.get-children-category',jsons).then((response) => {
					if(response.result == 1) {
						this.err=false;
						this.contentlist=response.data;
						this.contentlist.tjfl=false;
						this.contentlist.set=response.data.set;
//						 this.$nextTick(() => {
//						 	this._initScroll(this.$refs.menucontent)
//						 })
					} else {
						this.err=true;
						this.doException(response);
					}
				});					
			},
			getContentlist2(){
				$http.get('shop.index.get-default-index').then((response) => {
					if(response.result == 1) {
						this.err=false;
						response.data.category.goo = true;
						this.contentlist = response.data.category;
						this.contentlist.tjfl=true;
						this.contentlist.set=response.data.set;
						
					} else {
						this.err=true;
						this.doException(response);
					}
				});					
			},			
			_initScroll (doc) {
				//this.menuScroll = new BScroll(doc, {click: true})  
			}
		},
		mounted(){
			this.getList();
			this.getContentlist2();

		},
		components: { cTitle, cCarcontent }
	}