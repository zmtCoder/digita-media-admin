<template>
  <div class="device-form-config">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="70px" class="ruleForm">
      <el-form-item label="投影方向" prop="stateOrient">
        <el-select
          :disabled="disabled"
          v-model="ruleForm.stateOrient"
          placeholder="请选择设备投影方向"
          @change="setOrient"
          style="width: 100%"
        >
          <el-option
            v-for="item in orientOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投影闪烁" prop="lightBlink" v-if="!isFA">
        <el-select
          :disabled="disabled"
          v-model="ruleForm.lightBlink"
          placeholder="请选择设备投影闪烁"
          @change="modelLight"
          style="width: 100%"
        >
          <el-option
            v-for="item in lightBlinkOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投影控制" prop="lightControl" style="text-align: right;">
        <el-switch
          :disabled="disabled"
          inactive-text="时间控制"
          active-text="手动"
          :active-value="1"
          :inactive-value="0"
          v-model="ruleForm.lightControl"
          @change="modelLight"
          active-color="#13ce66"
          inactive-color="#409eff"
        >
        </el-switch>
      </el-form-item>
      <el-form-item
        v-if="!disabledLightSwitch"
        label="投影开关"
        prop="lightBrightness"
        style="text-align: right;"
      >
        <el-switch
          :disabled="disabled"
          inactive-text="开启"
          active-text="关闭"
          :inactive-value="true"
          :active-value="false"
          v-model="lightSwitch"
          @change="switchLight"
          inactive-color="#13ce66"
          active-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
      <template v-if="!disabledTime">
        <el-form-item label="休眠时间" prop="timeClose">
          <el-time-picker
            v-model="ruleForm.timeClose"
            @change="setTimeClose"
            placeholder="请选择休眠时间"
            format="HH:mm"
            value-format="HH:mm"
            :style="style"
            :disabled="disabled || disabledTime"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="唤醒时间" prop="timeOpen">
          <el-time-picker
            v-model="ruleForm.timeOpen"
            @change="setTimeOpen"
            placeholder="请选择唤醒时间"
            format="HH:mm"
            value-format="HH:mm"
            :style="style"
            :disabled="disabled || disabledTime"
          ></el-time-picker>
        </el-form-item>
      </template>
      <!-- <el-form-item label="媒体音量" prop="stateVolume">
        <el-slider
          :disabled='disabled'
          v-model="ruleForm.stateVolume"
          :max='15'
          :step="1"
          @change="setTimeOpen"
          show-stops>
        </el-slider>
      </el-form-item> -->
      <template v-if="isR">
        <el-form-item label="警灯开关" prop="lamp" style="text-align: right;">
          <el-switch
            :disabled="disabled"
            inactive-text="开启"
            active-text="关闭"
            :inactive-value="1"
            :active-value="0"
            v-model="ruleForm.lamp"
            @change="switchLamp"
            inactive-color="#13ce66"
            active-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="雷达开关" prop="radar" style="text-align: right;">
          <el-switch
            :disabled="disabled"
            inactive-text="开启"
            active-text="关闭"
            :inactive-value="1"
            :active-value="0"
            v-model="ruleForm.radar"
            @change="switchRadar"
            inactive-color="#13ce66"
            active-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import { lightDevice, directionDevice, lampDevice, radarDevice } from '@/api/device'
import { orientProjection, lightBlinkOptions } from '@/data/common'
import prompt from '@/mixins/prompt'
import { omit } from 'lodash'
export default {
  name: 'device-form-config',

  mixins: [prompt],

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    id() {
      return this.info.id ? this.info.id : undefined
    },
    isFA() {
      return ['FA'].includes(this.info.type)
    },
    isR() {
      return ['TA-R', 'TB-R', 'TC-R'].includes(this.info.type)
    },
    disabledTime() {
      return this.ruleForm.lightControl === 1
    },
    disabledLightSwitch() {
      return this.ruleForm.lightControl === 0
    },
    getType() {
      return this.info.type ? this.info.type.split('-').shift() : ''
    },
    orientOptions() {
      if (this.getType === 'TB') return this.getTBorient
      return orientProjection
    },
    getTBorient() {
      return orientProjection.filter(item => item.value === 1 || item.value === 3)
    }
  },

  data() {
    return {
      lightSwitch: false,
      ruleForm: {
        stateOrient: 1,
        timeClose: '00:00',
        timeOpen: '00:00',
        lightControl: 0,
        lightBrightness: 1,
        lightBlink: 1,
        lamp: 0,
        radar: 0
      },
      lightBlinkOptions,
      style: {
        width: '100%'
      }
    }
  },
  methods: {
    assignFormData(obj) {
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = obj[key] !== undefined ? obj[key] : this.ruleForm[key]
      })
    },

    async setTimeControl() {
      this.$emit('update:loading', true)
      await this.setLight()
      this.$emit('updateInfo')
    },

    async setTimeClose() {
      this.$emit('update:loading', true)
      await this.setLight()
      this.$emit('updateInfo')
    },

    async setTimeOpen() {
      this.$emit('update:loading', true)
      await this.setLight()
      this.$emit('updateInfo')
    },

    async switchLight() {
      this.$emit('update:loading', true)
      if (this.lightSwitch) {
        this.ruleForm.lightBrightness = 100
      } else {
        this.ruleForm.lightBrightness = 0
      }
      await this.setLight()
      this.$emit('updateInfo')
    },

    async modelLight() {
      this.$emit('update:loading', true)
      await this.setLight()
      this.$emit('updateInfo')
    },

    async setOrient() {
      this.$emit('update:loading', true)
      await this.setOrientReq()
      this.$emit('updateInfo')
    },

    async switchLamp() {
      this.$emit('update:loading', true)
      await this.setLamp()
      this.$emit('updateInfo')
    },

    async switchRadar() {
      this.$emit('update:loading', true)
      await this.setRadar()
      this.$emit('updateInfo')
    },

    setOrientReq() {
      return directionDevice(this.id, {
        devid: this.info.id,
        deviceCode: this.info.code,
        stateOrient: this.ruleForm.stateOrient
      })
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
    },

    setLight() {
      const params = omit(this.ruleForm, 'radar', 'lamp')
      return lightDevice(this.id, {
        devid: this.info.id,
        deviceCode: this.info.code,
        ...params
      })
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
    },
    setLamp() {
      return lampDevice(this.id, {
        devid: this.info.id,
        deviceCode: this.info.code,
        lamp: this.ruleForm.lamp
      })
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
    },
    setRadar() {
      return radarDevice(this.id, {
        devid: this.info.id,
        deviceCode: this.info.code,
        radar: this.ruleForm.radar
      })
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
    }
  },
  watch: {
    info: {
      handler: function(n) {
        if (n) {
          this.assignFormData(n)
          this.ruleForm.lightBrightness > 0 ? (this.lightSwitch = true) : (this.lightSwitch = false)
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.ruleForm {
  padding-top: 10px;
}
.device-form-config {
  /deep/ .el-form-item {
    margin-bottom: 10px;
  }
  /deep/ .el-switch__label {
    width: 56px;
  }
  /deep/ .el-switch__label--right {
    text-align: left;
  }
}
.btn {
  width: 100%;
}
</style>
