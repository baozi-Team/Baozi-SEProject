const app = getApp();
const db = wx.cloud.database()

Page({
  data: {
    time: "00:00",
    remindtime: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    remindtimeIndex: 0,
  },
  onLoad: function (options) {
    let _this = this;
    db.collection("time").get({
      success: function(res) {
        // console.log(res);
        _this.setData({
          time: res.data[res.data.length-1].time,
        });
      }
    })
    /*db.collection("remindtime").get({
      success: function (res) {
        console.log(res);
       
        _this.setData({
          remindtime: res.data[res.data.length - 1].remindtime,
        });
        console.log(res.data[res.data.length - 1].remindtime);
      }
    })*/
  },

  feedback: function (e) {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },

  
  bindTimeChange: function (e) {
    db.collection('time').add({
      data: {
        // username: app.globalData.userInfo.nickName,
        time: e.detail.value,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    this.setData({
      time: e.detail.value
    })
    console.log('睡觉时间：', e.detail.value)
  },


  bindremindtimeChange: function (e) {
    console.log('remindtimeIndex值为', e.detail.value);
    const db = wx.cloud.database()
    db.collection('remindtime').add({
      data: {
        //username: e.detail.value.username,
        remindtime: e.detail.value
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    
    this.setData({
      remindtimeIndex: e.detail.value
    })
  }

});

