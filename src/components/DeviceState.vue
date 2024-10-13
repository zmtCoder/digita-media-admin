<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-06-01 14:51:19
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 17:41:51
-->
<template>
  <ul class="device-state">
    <li class="device-state-item">
      <span class="device-state-item_name">在线状态</span>
      <span class="device-state-item_value" :class="this.info.stateOnline ? 'success' : 'info'">{{
        stateOnline
      }}</span>
    </li>
    <li class="device-state-item">
      <span class="device-state-item_name">工作状态</span>
      <span class="device-state-item_value" :class="this.info.stateWork ? 'success' : 'warning'">{{
        stateWork
      }}</span>
    </li>

    <li class="device-state-item">
      <span class="device-state-item_name">核心温度</span>
      <span class="device-state-item_value" :class="highTemp ? 'error' : ''">{{
        temperature
      }}</span>
    </li>

    <li class="device-state-item">
      <span class="device-state-item_name">过期时间</span>
      <span class="device-state-item_value">{{ registerTime }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'device-state',

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    stateOnline() {
      return this.info.stateOnline === 1 ? '在线' : '离线'
    },
    stateWork() {
      return this.info.stateWork === 1 ? '工作' : this.info.stateWork === 0 ? '休眠' : ''
    },
    temperature() {
      if (this.info.stateWork !== 1 && this.info.stateWork !== 0) return ''

      if (typeof this.info.temperature === 'number') {
        return this.info.temperature + '℃'
      } else {
        return '0℃'
      }
    },
    registerTime() {
      if (this.info.stateWork !== 1 && this.info.stateWork !== 0) return ''

      return this.info.registerTime
    },
    storage() {
      return (
        this.filtersStorage(this.info.storageTotal - this.info.storageUsable) +
        'G/' +
        this.filtersStorage(this.info.storageTotal) +
        'G'
      )
    },
    highTemp() {
      if (this.info.alarm) {
        return this.detailInfo.alarm.includes('2001')
      } else {
        return false
      }
    },
    fillStorage() {
      if (this.info.alarm) {
        return this.detailInfo.alarm.includes('2002')
      } else {
        return false
      }
    }
  },

  methods: {
    filtersStorage(val) {
      if (typeof val === 'number' && !isNaN(val)) {
        return (val / 1024).toFixed(2)
      } else {
        return 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.device-state {
  &-item {
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    &_name {
      font-size: 14px;
      color: #606266;
    }
    &_value {
      font-size: 14px;
    }
  }
}
</style>
