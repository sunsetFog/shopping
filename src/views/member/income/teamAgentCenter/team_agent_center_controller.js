import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;
export default {
    data() {
        return {
            mailLanguage:"",
            mailTeamDividendTitle:"",
            mailDividend:"",

            level_name: "",
            dividend_ratio: "",
            next_dividend_ratio: "",

            ratioDatas: [],

            activeName: 'first',
            first_content: [],
            second_content: [],
            third_content: [],
            bonus_active: true,
            leveling_active: true,
            prize_active: true,
            record_index: '',
            record_key: '',
            tab_name: '提成',
            bonus_lable: '',
            leveling_label: '',
            prize_label: '',
            bonus_save: [],
            leveling_save: [],
            prize_save: [],
        }
    },


    activated() {
        this.isGratitude();
        this.initMailLanguage();
        this.initData();//初始化参数
        this.getData(0);//初始化数据
        this.initInfo();//初始化info数据

        this.setDataByTabIndex();
        
    },

    methods: {

        initMailLanguage(){
            this.mailLanguage =this.fun.initMailLanguage();
            this.fun.setWXTitle(this.fun.setMailLanguage("经销商管理中心",this.mailLanguage.team_dividend.team_agent_centre));
            this.mailTeamDividendTitle=this.fun.setMailLanguage("经销商管理中心",this.mailLanguage.team_dividend.team_agent_centre);
            this.mailDividend=this.fun.setMailLanguage("提成",this.mailLanguage.team_dividend.dividend);
            
        
          },
//setting sun

          //是否出现感恩奖
          isGratitude(){
            var uiClass = document.getElementsByClassName('el-tabs__item');
              var that = this;
                $http.post('plugin.team-dividend.api.team-dividend.get-dividend-type', {}).then(function (response) {
                    that.bonus_lable = that.fun.setMailLanguage("提成",that.mailLanguage.team_dividend.dividend);
                    that.leveling_label = "平级奖";
                    that.prize_label = '感恩奖';
                    that.record_index = response.data.is_flat_prize;
                    that.record_key = response.data.is_award_gratitude;
                  if(response.data.is_flat_prize == 1&&response.data.is_award_gratitude == 1){
                    that.leveling_active = true;
                    that.prize_active = true;
                    uiClass[0].style.width = '33.33%';
                    uiClass[1].style.width = '33.33%';
                    uiClass[2].style.width = '33.33%';
                  }else if(response.data.is_flat_prize == 0&&response.data.is_award_gratitude == 1){
                    that.leveling_active = false;
                    that.prize_active = true;
                    uiClass[0].style.width = '50%';
                    uiClass[1].style.width = '50%';
                  }else if(response.data.is_flat_prize == 1&&response.data.is_award_gratitude == 0){
                    that.leveling_active = true;
                    that.prize_active = false;
                    uiClass[0].style.width = '50%';
                    uiClass[1].style.width = '50%';
                  }else if(response.data.is_flat_prize == 0&&response.data.is_award_gratitude == 0){
                    that.leveling_active = false;
                    that.prize_active = false;
                    uiClass[0].style.width = '100%';
                  }
                }, function (response) {
                    Toast(response.msg);
                });
          },
          
        //初始化参数
        initData() {

            this.level_name = "";
            this.dividend_ratio = "";
            this.next_dividend_ratio; "";


            this.ratioDatas = [];

            currentTabIndex = "0";
            is_first_content = false;
            is_second_content = false;
            is_third_content = false;

            this.activeName = 'first';

            this.first_content = [];
            this.second_content = [];
            this.third_content = [];
        },

        //初始化info数据
        initInfo() {
            let that = this;
            $http.get('plugin.team-dividend.api.index', {}).then(function (response) {
                if (response.result == 1) {
                    that.level_name = response.data.level_name;
                    that.dividend_ratio = response.data.dividend_ratio;
                    that.next_dividend_ratio = response.data.next_dividend_ratio;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },


        //初始化数据
        getData(value) {
            let that = this;
            let json = { "dividend_type": value};
            $http.get('plugin.team-dividend.api.team-dividend.get-dividend-statistic', json, '').then(function (response) {
                that.ratioDatas = [];
                if (response.result == 1) {

                    //组装数据
                    let itemDay = new Object();
                    itemDay.money = response.data.today;
                    itemDay.data = "今日";
                    itemDay.name = "data";
                    that.ratioDatas.push(itemDay);

                    let itemYesterday = new Object();
                    itemYesterday.money = response.data.yesterday;
                    itemYesterday.data = "昨日";
                    itemYesterday.name = "data";
                    that.ratioDatas.push(itemYesterday);

                    let itemWeek = new Object();
                    itemWeek.money = response.data.this_week;
                    itemWeek.data = "本周";
                    itemWeek.name = "data";
                    that.ratioDatas.push(itemWeek);

                    let itemMonth = new Object();
                    itemMonth.money = response.data.this_month;
                    // itemMonth.data = "本月累计"+that.mailDividend;
                    itemMonth.data = "本月累计"+that.tab_name;
                    itemMonth.name = "mounth";
                    that.ratioDatas.push(itemMonth);
                    if(value == 0){
                        that.bonus_save = [];
                        that.bonus_save.push(itemDay);
                        that.bonus_save.push(itemYesterday);
                        that.bonus_save.push(itemWeek);
                        that.bonus_save.push(itemMonth);
                    }else if(value == 1){
                        that.leveling_save = [];
                        that.leveling_save.push(itemDay);
                        that.leveling_save.push(itemYesterday);
                        that.leveling_save.push(itemWeek);
                        that.leveling_save.push(itemMonth);
                    }else if(value == 2){
                        that.prize_save = [];
                        that.prize_save.push(itemDay);
                        that.prize_save.push(itemYesterday);
                        that.prize_save.push(itemWeek);
                        that.prize_save.push(itemMonth);
                    }
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },

//setting sun

        //获取佣金列表
        getDividendList(dividend_type) {
            let that = this;
            let json = { "dividend_type": dividend_type };
            $http.get('plugin.team-dividend.api.team-dividend.get-dividend-list', json, '获取中').then(function (response) {
                if (response.result == 1) {
                    switch (dividend_type) {
                        case "0":
                            that.first_content = response.data;
                            break;
                        case "1":
                            that.second_content = response.data;
                            break;
                        case "2":
                            that.third_content = response.data;
                            break;
                        default:
                            break;
                    }
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },
//setting sun
        //直推奖
        getDividendListByType2() {
            let that = this;
            let json = { };
            $http.get('plugin.team-dividend.api.team-dividend.get-reward', json, '获取中').then(function (response) {
                if (response.result == 1) {
                    that.third_content = response.data;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },

//setting sun 
        //设置选择后的数据
        setDataByTabIndex() {
            //setting sun
            if(this.record_index == 0&&this.record_key == 1){
                if(currentTabIndex == 1){
                    currentTabIndex = 2;
                }
            }

            if (currentTabIndex == "0" && !is_first_content) {
                is_first_content = true;
                this.getDividendList("0");
                this.tab_name = this.fun.setMailLanguage("提成",this.mailLanguage.team_dividend.dividend);
                this.getData('0');
            } else if (currentTabIndex == "1" && !is_second_content) {
                is_second_content = true;
                this.getDividendList("1");
                this.tab_name = '平级奖';
                this.getData('1');
            } else if (currentTabIndex == "2" && !is_third_content) {
                is_third_content = true;
                this.getDividendList("2");
                this.tab_name = '感恩奖';
                this.getData('2');
                // this.getDividendListByType2();
            }
            //防止重复加载
            if (currentTabIndex == "0"&&is_first_content == true) {
                this.ratioDatas = this.bonus_save;
            } else if (currentTabIndex == "1"&&is_second_content == true) {
                this.ratioDatas = this.leveling_save;
            } else if (currentTabIndex == "2"&&is_third_content == true) {
                this.ratioDatas = this.prize_save;
            }


        },
//setting sun
        //tab 点击
        handleClick(tab, event) {
            //点击同tab 不刷新界面
            if (currentTabIndex == tab.index) {
                return;
            } else {
                currentTabIndex = tab.index;
            }
            this.setDataByTabIndex();
        },
    },
    components: { cTitle }

}