/*
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-06-03 20:48:24
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 22:18:55
 */
// 添加设备步骤 已废弃-------------------------------------------------------------------------------------------
export const deviceAddSteps = Object.freeze([
  { title: '添加设备', icon: 'icon-del' },
  { title: '设置参数', icon: 'icon-peizhi' },
  { title: '设置系统', icon: 'icon-shezhi' },
  { title: '设置播放列表', icon: 'icon-duomeit' }
])

// 电话号码 正则-------------------------------------------------------------------------------------------
export const telReg = /^1[3-9]\d{9}$/

// 验证码 正则-------------------------------------------------------------------------------------------
export const codeReg = /^\d{4}$/

// 公司代码 正则-------------------------------------------------------------------------------------------
export const companyCodeReg = /[A-Z0-9]{8}-[A-Z0-9]$|[A-Z0-9]{8}-[A-Z0-9]-[0-9]{2}$/

// 身份证 正则-------------------------------------------------------------------------------------------
export const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// 任务状态 -------------------------------------------------------------------------------------------
export const jobState = Object.freeze([
  // 1成功，0等待执行，-1失败，-2执行中，-3执行超时
  { type: 'success', name: '成功', state: 1 },
  { type: 'primary', name: '等待', state: 0 },
  { type: 'error', name: '失败', state: -1 },
  { type: 'primary', name: '执行中', state: -2 },
  { type: 'error', name: '执行超时', state: -3 },
  { type: 'error', name: '前置任务执行失败', state: -4 }
])

// 行业 -------------------------------------------------------------------------------------------
export const tradeType = Object.freeze([
  { name: '美食餐饮', val: 1 },
  { name: '服装服饰', val: 2 },
  { name: '酒店住宿', val: 3 },
  { name: '美容美发', val: 4 },
  { name: '烟酒便利', val: 5 },
  { name: '鲜果蔬菜', val: 6 },
  { name: '房产中介', val: 7 },
  { name: '汽车服务', val: 8 },
  { name: '教育培训', val: 9 },
  { name: '家居用品', val: 10 },
  { name: '家用电器', val: 11 },
  { name: '银行保险', val: 12 },
  { name: '其他行业', val: 13 },
  { name: '智能交通', val: 14 }
])

// 上传媒体类型 -------------------------------------------------------------------------------------------
export const mediaType = Object.freeze([
  // { type: 'video/mp4', mediaType: 0 },
  { type: 'image/jpeg', mediaType: 1 },
  { type: 'image/bmp', mediaType: 2 },
  { type: 'image/png', mediaType: 3 }
  // { type: 'image/png', mediaType: 4 },
])

// 建议类型 -------------------------------------------------------------------------------------------
export const SuggestType = Object.freeze([
  { value: 1, title: '产品建议', des: '请输入您对XX智能产品在XX场景下的改进建议或体验类问题' },
  {
    value: 2,
    title: '功能缺陷',
    des: '请输入您在使用智能产品过程中遇到的阻断或影响正常使用的缺陷类问题'
  },
  {
    value: 3,
    title: '软件BUG',
    des: '请输入您在使用软件平台或APP过程中遇到的无法正常显示或无法正常控制智能产品等问题'
  },
  { value: 4, title: '其他', des: '请输入使用智能产品过程中的咨询类问题，如账号、云空间等相关问题' }
])

// 播放列表类型
const scenesOne = { weatherScenes: [{ type: 'sunny', index: 0 }] }
const scenesTwo = {
  weatherScenes: [
    { type: 'sunny', index: 0 },
    { type: 'fog', index: 1 },
    { type: 'rain', index: 2 },
    { type: 'rain-snow', index: 3 },
    { type: 'freeze', index: 4 }
  ],
  roadScenes: [
    { type: 'construction', index: 5 },
    { type: 'trafficAccident', index: 6 }
  ],
  customizeScenes: [
    { type: 'customize1', index: 7 },
    { type: 'customize2', index: 8 }
  ]
}
const scenesThree = scenesTwo

// const scenesFour = {
//   weatherScenes: [
//     { type: 'sunny', index: 0 },
//     { type: 'fog', index: 1 },
//     { type: 'rain', index: 2 },
//     { type: 'rain-snow', index: 3 },
//     { type: 'freeze', index: 4 }
//   ]
// }
const scenesFive = {
  lightScenes: [
    { type: 'red', index: 0 },
    { type: 'green', index: 1 }
  ]
}
const scenesSix = {
  listScenes: [
    { type: 'list1', index: 0 },
    { type: 'list2', index: 1 }
  ]
}

// 设备类型-------------------------------------------------------------------------------------------
export const deviceType = Object.freeze([
  // ELF-A
  { value: 'XA', label: 'XA', scenes: scenesOne, hasSwitch: false },
  // TA
  { value: 'TA', label: 'TA', scenes: scenesThree, hasSwitch: true },
  { value: 'TA-C', label: 'TA-C', scenes: scenesFive, hasSwitch: false },
  { value: 'TA-R', label: 'TA-R', scenes: scenesSix, hasSwitch: true },
  // TB
  { value: 'TB', label: 'TB', scenes: scenesThree, hasSwitch: true },
  { value: 'TB-C', label: 'TB-C', scenes: scenesFive, hasSwitch: false },
  { value: 'TB-R', label: 'TB-R', scenes: scenesSix, hasSwitch: true },
  // TC
  { value: 'TC', label: 'TC', scenes: scenesThree, hasSwitch: true },
  { value: 'TC-C', label: 'TC-C', scenes: scenesFive, hasSwitch: false },
  { value: 'TC-R', label: 'TC-R', scenes: scenesSix, hasSwitch: true }
])

// 设备播放方向 -------------------------------------------------------------------------------------------
export const orientOptions = Object.freeze([
  { value: 0, label: '正向' },
  // { value: 1, label: '竖屏向上' },
  { value: 8, label: '反向' }
  // { value: 9, label: '竖屏向下' }
])

// 设备安装方向 -------------------------------------------------------------------------------------------
export const orient = Object.freeze([
  { value: 0, label: '正向安装' },
  { value: 8, label: '反向安装' }
])
// 设备供电方式 -------------------------------------------------------------------------------------------
export const powerOptions = Object.freeze([
  { value: 0, label: '电网市电' },
  { value: 1, label: '太阳能蓄电池' }
])

// 设备投影方向 -------------------------------------------------------------------------------------------
export const orientProjection = Object.freeze([
  { value: 1, label: '正向' },
  { value: 2, label: '左转' },
  { value: 3, label: '反向' },
  { value: 4, label: '右转' }
])
// 设备投影闪烁 -------------------------------------------------------------------------------------------
export const lightBlinkOptions = Object.freeze([
  { value: 0, label: '常亮' },
  { value: 1, label: '闪烁' }
])

// 投影雷达联动 警灯雷达联动 -------------------------------------------------------------------------------------------
export const linkOptions = Object.freeze([
  { value: 0, label: '联动关闭' },
  { value: 1, label: '与本机雷达联动' },
  { value: 2, label: '与远程雷达联动' }
])

// 投影雷达联动模式 -------------------------------------------------------------------------------------------
export const LinkModeOptions = Object.freeze([
  { value: 1, label: '模式 1', content: '模式 1：有车播放列表 1 / 无车播放列表 2' },
  { value: 2, label: '模式 2', content: '模式 2：有车播放列表 1 / 无车关闭投影' }
])

// 切换场景 -------------------------------------------------------------------------------------------
const w = [
  { label: '默认场景', value: 0 },
  { label: '浓雾', value: 1 },
  { label: '降雨', value: 2 },
  { label: '积雪', value: 3 },
  { label: '结冰', value: 4 },
  { label: '道路施工', value: 5 },
  { label: '交通事故', value: 6 },
  { label: '自定义场景1', value: 7 },
  { label: '自定义场景2', value: 8 }
]
const s = [
  { label: '默认场景', value: 0 },
  { label: '浓雾', value: 1 },
  { label: '降雨', value: 2 },
  { label: '积雪', value: 3 },
  { label: '结冰', value: 4 }
]
const c = [
  { label: '红灯', value: 0 },
  { label: '绿灯', value: 1 }
]
const r = [
  { label: '列表1', value: 0 },
  { label: '列表2', value: 1 }
]
export const scenesOptions = Object.freeze({
  'ELF-A': [{ value: 0, label: '默认场景' }],
  'TA-W': w,
  'TA-RG': w,
  'TA-RG-S': s,
  'TA-RG-C': c,
  'TB-W': w,
  'TB-RG': w,
  'TB-RG-S': s,
  'TB-RG-C': c,
  XA: [{ value: 0, label: '默认场景' }],
  TA: w,
  'TA-C': c,
  'TA-R': r,
  TB: w,
  'TB-C': c,
  'TB-R': r,
  TC: w,
  'TC-C': c,
  'TC-R': r
})

// 天气场景-------------------------------------------------------------------------------------------
const weatherScenes = Object.freeze([
  // ********************
  { type: 'sunny', title: '默认场景', des: '适用于一般场景' },
  // ********************
  { type: 'cloudy', title: '多云天气', des: '适用于一般情况下的播放列表' },
  { type: 'shade', title: '阴天天气', des: '适用于一般情况下的播放列表' },
  // ********************
  { type: 'rain', title: '降雨', des: '适用于降雨天气道路湿滑时' },
  // ********************
  { type: 'thundershower', title: '雷阵雨天气', des: '适用于一般情况下的播放列表' },
  { type: 'thundershower-hail', title: '雷阵雨冰雹天气', des: '适用于一般情况下的播放列表' },
  { type: 'rain-hail', title: '雨加冰雹天气', des: '适用于一般情况下的播放列表' },
  { type: 'freezing-rain', title: '冻雨天气', des: '适用于一般情况下的播放列表' },
  { type: 'snow', title: '雪天天气', des: '适用于一般情况下的播放列表' },
  // ********************
  { type: 'rain-snow', title: '积雪', des: '适用于降雪天气道路积雪时' },
  // ********************
  // ********************
  { type: 'fog', title: '浓雾', des: '适用于浓雾及其他行车视线较差时' },
  // ********************
  { type: 'heat', title: '高温天气', des: '适用于一般情况下的播放列表' },
  { type: 'cold', title: '低温天气', des: '适用于一般情况下的播放列表' },
  { type: 'gale', title: '大风天气', des: '适用于一般情况下的播放列表' },
  { type: 'hail', title: '冰雹天气', des: '适用于一般情况下的播放列表' },
  { type: 'sandstorm', title: '沙尘暴天气', des: '适用于一般情况下的播放列表' },
  { type: 'haze', title: '雾霾天气', des: '适用于一般情况下的播放列表' },
  { type: 'smoke', title: '浓烟天气', des: '适用于一般情况下的播放列表' },
  { type: 'unknown', title: '未知', des: '适用于一般情况下的播放列表' },
  // ********************
  { type: 'freeze', title: '结冰', des: '适用于路面发生结冰时' }
  // ********************
])

// 道路场景-------------------------------------------------------------------------------------------
const roadScenes = Object.freeze([
  { type: 'construction', title: '道路施工', des: '适用于前方道路施工时' },
  { type: 'trafficAccident', title: '交通事故', des: '适用于前方发生交通事故时' }
])

// 自定义场景-------------------------------------------------------------------------------------------
const customizeScenes = Object.freeze([
  { type: 'customize1', title: '自定义场景1', des: '用户可根据需要自行配置' },
  { type: 'customize2', title: '自定义场景2', des: '用户可根据需要自行配置' }
])

// 交通灯场景-------------------------------------------------------------------------------------------
const lightScenes = Object.freeze([
  { type: 'red', title: '红灯', des: '适用于红色信号灯开启时' },
  { type: 'green', title: '绿灯', des: '适用于绿色信号灯开启时' }
])
// 列表1列表2
const listScenes = Object.freeze([
  { type: 'list1', title: '列表1', des: '用户可根据需要自行配置' },
  { type: 'list2', title: '列表2', des: '用户可根据需要自行配置' }
])

// 场景集合-------------------------------------------------------------------------------------------
export const playlistType = Object.freeze({
  weatherScenes,
  roadScenes,
  customizeScenes,
  lightScenes,
  listScenes
})

// 媒体服务器类型-------------------------------------------------------------------------------------------
export const serverType = Object.freeze([
  { value: 1, name: '七牛' },
  { value: 2, name: '阿里云' },
  { value: 3, name: '腾讯云' },
  { value: 4, name: 'Minio' }
])
