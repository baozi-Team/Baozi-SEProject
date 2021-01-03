const innerAudioContext = wx.createInnerAudioContext()
timer = require('../../plugin/wxTimer.js')
var app = getApp().globalData,
  timer = app.timer;
var wxTimer = new timer({
  beginTime: "08:00:00"
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    days: [
      [0, 1, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 0, 1]
    ],
    hours: [
      [0, 1, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 0, 1]
    ],
    minutes: [
      [0, 1, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 0, 1]
    ],
    seconds: [
      [0, 1, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 0, 1]
    ],
    Millisecond: [
      [0, 1, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 0, 1]
    ],
    mp3: 'https://mp3-1259289532.cos.ap-shanghai.myqcloud.com/%E7%BA%AF%E9%9F%B3%E4%B9%90%20-%20Canon%20(%E5%85%AB%E9%9F%B3%E7%9B%92%E7%89%88).mp3?q-sign-algorithm=sha1&q-ak=AKID4X1TxoOnA1iF3D3tNLbj30n404oQTaqU&q-sign-time=1558530477;1558532277&q-key-time=1558530477;1558532277&q-header-list=&q-url-param-list=&q-signature=24f807d1658599d13ab5cbca99c505623da615fd&x-cos-security-token=e1c09b2f53c9c3be4e1c9e38f196c56a230ece0310001',

    // 背景音乐
    bgm: false,
    wxTimerList: {},
    boolean: false,
    // 开始时间
    startTime: Date,
    // 结束时间
    endTime: Date,
    // 昵称
    nickName: String
  },
  //倒计时
  countdown: function (e) {
    var bol = this.data.boolean;
    this.setData({
      boolean: !bol
    })
    let that = this;
    var date = new Date();
    //设置开始时间
    this.data.startTime = date;
    var days = date.getDate(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    this.getNickNameFromStroge();
    this.timeDown();
  },
  timeDown: function (e) {
    var that = this;
    wxTimer.calibration();
    wxTimer.start(that);
    setTimeout(function () {
    }, 1000);
  },
  endsleep: function (e) {
    var bol = this.data.boolean;
    this.setData({
      boolean: !bol
    })
    wxTimer.stop();
    //设置结束时间
    this.data.endTime = new Date();
    const score = Number((this.data.endTime.getTime() - this.data.startTime.getTime())/(8*60*60*1000)).toFixed(5);
    this.getNickNameFromStroge();
    this.sendSleepInfo(this.data.nickName,score);
  },
  // 背景音乐
  BGM: function (e) {
    let that = this;
    if (that.data.bgm) {
      that.setData({
        bgm: false,
      })
      innerAudioContext.pause(); /**  暂停音乐 */

    } else {
      that.setData({
        bgm: true,
        bgmImgAni: "bgmImgAni"
      })
      // 播放音乐
      innerAudioContext.autoplay = true
      innerAudioContext.loop = true
      innerAudioContext.src = that.data.mp3;
      innerAudioContext.play()

    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var digitSegments = [
      [1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 1],
      [0, 1, 1, 0, 0, 1, 1],
      [1, 0, 1, 1, 0, 1, 1],
      [1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1],
    ];
    setInterval(function () {
      // 时钟效果开始
      var date = new Date();
      var days = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
      // 时钟效果结束
      let _days = [];
      let _hours = [];
      let _minutes = [];
      let _seconds = [];
      let _Millisecond = [];
      _days[0] = digitSegments[(Math.floor(days / 10))];
      _days[1] = digitSegments[(days % 10)];
      _hours[0] = digitSegments[(Math.floor(hours / 10))];
      _hours[1] = digitSegments[(hours % 10)];
      _minutes[0] = digitSegments[(Math.floor(minutes / 10))];
      _minutes[1] = digitSegments[(minutes % 10)];
      _seconds[0] = digitSegments[(Math.floor(seconds / 10))];
      _seconds[1] = digitSegments[(seconds % 10)];
      // console.log(days, _days);
      // console.log(seconds, _seconds);
      that.setData({
        days: _days,
        hours: _hours,
        minutes: _minutes,
        seconds: _seconds,
      });
    }, 10)
  },
  onGotUserInfo: function(e){
    var userInfo = e.detail.userInfo;
    var nickName = userInfo.nickName
    console.log(nickName)
    wx.setStorage({
      key: 'nickname',
      data: userInfo.nickName,
    })
  },
  getNickNameFromStroge: function(){
    var that = this;
    wx.getStorage({
      key: 'nickname',
      success: function(res) {
        console.log(res)
        that.setData({
          nickName:res.data
        })
      },
    })
  },
  sendSleepInfo: function(nickname,score){
    console.log(nickname+"   "+score)
    wx.request({
      url: 'http://localhost:8080/rank',
      data: {
        userName:nickname,
        score:score
      },
      method: 'POST',
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})
