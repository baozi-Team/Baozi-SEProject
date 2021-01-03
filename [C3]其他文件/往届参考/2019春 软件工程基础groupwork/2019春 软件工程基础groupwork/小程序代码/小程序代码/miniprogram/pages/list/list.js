
const app = getApp()


Page({
  data: {
    info: [
      { id: 1, name: '111', percent: '85%', heart: 5, like: false, },
      { id: 2, name: 'MOly', percent: '50%', heart: 3, like: false, },
      { id: 3, name: '大屏', percent: '45%', heart: 0, like: false, },
      { id: 4, name: '可信', percent: '15%', heart: 2, like: false, },
      { id: 5, name: '主席', percent: '15%', heart: 1, like: false, },

    ]
  },
  
  onLoad: function () {
      //this.getRankList();
      console.log(app.globalData.userInfo.nickName)
      
  },
  clickItem: function (e) {
    const id = e.currentTarget.dataset.id
    const _info = this.data.info.map(item => {
      if (item.id === id) {
        item.like = !item.like;
        if (item.like) { item.heart++ }
        else { item.heart-- }
      }
      return item
    })
    console.log(_info)
    this.setData({ info: _info })
  },



  /*getRankList:function (){
    const that = this;
    wx.request({
      url: 'http://localhost:8080/rank',
      method:'GET',
      header:{
        'Accept':'application/json'
      },
      success: function(res){
        let list = res.data.data;
        let i = 1;
        for(let obj of list){
          obj.id = i;
          i++;
          obj.name = obj.userName;
          obj.percent = Number(obj.score * 100).toFixed()+'%';
          obj.heart = 0;
          obj.like = false;
        }
        that.setData({
          info: list
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
  }*/
})
