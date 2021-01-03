Page({
  openAlert: function () {
    wx.showModal({
      content: '发送成功，谢谢您的反馈',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  res: function (e) {
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        username: e.detail.value.username
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          username: e.detail.value.username
        })
        wx.showToast({
          title: '反馈成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '反馈失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
});
