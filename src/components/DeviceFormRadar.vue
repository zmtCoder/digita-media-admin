<template>
  <div class="device-form-radar">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="130px" class="ruleForm">
      <el-form-item label="交汇路口联动预警" prop="lora" style="text-align: right;">
        <el-switch
          :disabled="disabled"
          inactive-text="开启"
          active-text="关闭"
          :inactive-value="1"
          :active-value="0"
          v-model="ruleForm.lora"
          @change="changeLora"
          inactive-color="#13ce66"
          active-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
      <template v-if="ruleForm.lora === 1">
        <el-form-item label="本机安装方向" prop="loraMode" style="text-align: right;">
          <el-switch
            :disabled="disabled"
            inactive-text="方向1"
            active-text="方向2"
            :active-value="0"
            :inactive-value="1"
            v-model="ruleForm.loraMode"
            @change="changeLora"
            active-color="#13ce66"
            inactive-color="#409eff"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="远程雷达设备编号" prop="loraCode" style="text-align: right;">
          <el-input
            :disabled="disabled"
            placeholder="点击编辑远程雷达设备编号"
            v-model="ruleForm.loraCode"
            readonly
          >
            <i class="el-icon-edit edit" slot="suffix" @click="showDialog"> </i>
          </el-input>
        </el-form-item>
      </template>
      <el-form-item label="警灯雷达联动" prop="linkLamp">
        <el-select
          :disabled="disabled"
          v-model="ruleForm.linkLamp"
          placeholder="请选择警灯雷达联动"
          @change="changeLinkLamp"
          style="width: 100%"
        >
          <el-option
            v-for="item in linkLampOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="投影雷达联动" prop="linkLight">
        <el-select
          :disabled="disabled"
          v-model="ruleForm.linkLight"
          placeholder="请选择投影雷达联动"
          @change="changeLinkLight"
          style="width: 100%"
        >
          <el-option
            v-for="item in linkLampOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="ruleForm.linkLight !== 0" label="投影雷达联动模式" prop="linkLightMode">
        <el-select
          :disabled="disabled"
          v-model="ruleForm.linkLightMode"
          placeholder="请选择投影雷达联动模式"
          @change="changeLinkLight"
          style="width: 100%"
        >
          <el-option
            v-for="item in LinkModeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            {{ item.content }}
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-dialog :visible="visible" title="远程雷达设备编号" width="400">
      <el-input
        :disabled="disabled"
        v-model="ruleForm.loraCode"
        placeholder="请输入远程雷达设备编号"
        maxlength="20"
      />
      <template slot="footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { loraDevice, linkLampDevice, linkLightDevice } from '@/api/device'
import { linkOptions, LinkModeOptions } from '@/data/common'
import { pick } from 'lodash'
import prompt from '@/mixins/prompt'
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
    }
  },

  data() {
    return {
      visible: false,
      linkLampOptions: linkOptions,
      LinkModeOptions: LinkModeOptions,
      ruleForm: {
        lora: 0,
        loraMode: 0,
        loraCode: '',
        linkLamp: 0,
        linkLight: 0,
        linkLightMode: 0
      },
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

    showDialog() {
      this.visible = true
    },

    onCancel() {
      this.visible = false
    },

    async onConfirm() {
      this.$emit('update:loading', true)
      await this.changeLora()
      this.visible = false
    },

    async changeLora() {
      this.$emit('update:loading', true)
      await this.setLora()
      this.$emit('updateInfo')
    },

    async changeLinkLamp() {
      this.$emit('update:loading', true)
      await this.setLinkLamp()
      this.$emit('updateInfo')
    },

    async changeLinkLight() {
      this.$emit('update:loading', true)
      await this.setLinkLight()
      this.$emit('updateInfo')
    },

    async setLora() {
      try {
        const params = pick(this.ruleForm, 'lora', 'loraMode', 'loraCode')
        const res = await loraDevice(this.id, {
          devid: this.info.id,
          deviceCode: this.info.code,
          ...params
        })
        this.prompt(res.state)
      } catch (e) {
        console.log('🚀 ~ file: DeviceFormRadar.vue:205 ~ setLora ~ e:', e)
      }
    },

    async setLinkLamp() {
      try {
        const params = pick(this.ruleForm, 'linkLamp')
        const res = await linkLampDevice(this.id, {
          devid: this.info.id,
          deviceCode: this.info.code,
          ...params
        })
        this.prompt(res.state)
      } catch (e) {
        console.log('🚀 ~ file: DeviceFormRadar.vue:186 ~ setLinkLamp ~ e:', e)
      }
    },

    async setLinkLight() {
      try {
        const params = pick(this.ruleForm, 'linkLight', 'linkLightMode')
        const res = await linkLightDevice(this.id, {
          devid: this.info.id,
          deviceCode: this.info.code,
          ...params
        })
        this.prompt(res.state)
      } catch (e) {
        console.log('🚀 ~ file: DeviceFormRadar.vue:186 ~ setLinkLamp ~ e:', e)
      }
    }
  },
  watch: {
    info: {
      handler: function(n) {
        if (n) {
          this.assignFormData(n)
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
.device-form-radar {
  /deep/ .el-form-item {
    margin-bottom: 10px;
  }
  /deep/ .el-form-item__label {
    text-align: left;
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
.edit {
  cursor: pointer;
}
</style>
