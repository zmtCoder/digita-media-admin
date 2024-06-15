<template>
  <div class="card-media-check box-shadow" :class="active ? 'active' : ''" @click="onClick">
    <i v-show="active" class="iconfont active_icon icon-duihao"></i>
    <div class="card-media-check-media">
      <el-image
        v-if="info.mediaType !== 0"
        class="detail-media-src_img"
        :src="img"
        fit="contain"
        :preview-src-list="[img]"
      >
        <div slot="error" class="image-slot">
          <i class="error-img_icon el-icon-picture-outline"></i>
        </div>
      </el-image>
      <template v-else>
        <div class="mask" @click="dialogVisible = true">
          <i class="iconfont icon-bofang"></i>
        </div>
        <video-player
          :info="info"
          :autoplay="false"
          :options="{ autoplay: false, controls: false }"
        ></video-player>
      </template>
    </div>
    <div class="card-media-check-info" @click="check">
      <p class="card-media-check-info-item">
        <span class="name type">媒体类型</span>
        <span class="value type">{{ mediaType }}</span>
      </p>
      <p class="card-media-check-info-item des">
        <span class="name">媒体大小</span>
        <span class="value">{{ oldSize }}</span>
      </p>
      <p class="card-media-check-info-item des">
        <span class="name">播放时长</span>
        <span class="value">{{ length }}</span>
      </p>
    </div>
    <template v-if="dialogVisible">
      <el-dialog
        title="视频媒体"
        :visible.sync="dialogVisible"
        @close="close"
        @open="open"
        append-to-body
        width="640px"
      >
        <span>
          <video-player ref="videoPlayer" :info="info"></video-player>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue'
import media from '@/mixins/media'
export default {
  name: 'card-media-check',

  components: { VideoPlayer },

  mixins: [media],

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [Number, String],
      default: null
    },
    checkeArr: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    img() {
      return this.info.address
    },

    active() {
      return this.checkeArr.includes(this.value)
    }
  },

  data() {
    return {
      dialogVisible: false
    }
  },

  methods: {
    close() {
      this.$refs.videoPlayer.dispose()
    },

    open() {
      this.$nextTick(() => {
        this.$refs.videoPlayer.init()
      })
    },

    check() {
      let arr = []
      if (this.active) {
        arr = this.checkeArr.filter(item => item !== this.value)
      } else {
        arr = this.checkeArr.concat([this.value])
      }
      this.$emit('update:checkeArr', arr)
    },

    onClick() {
      this.$emit('onClick', this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.card-media-check {
  width: 100%;
  height: 95px;
  margin-bottom: 10px;
  background-color: #ffffff;
  display: flex;
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid transparent;
  &-media {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #f0f0f0;
    position: relative;
    /deep/ .el-image__inner {
      width: 80px;
      height: 80px;
    }
  }
  &-info {
    flex: 1;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color: #606266;
    cursor: pointer;
  }
}
.type {
  font-size: 14px;
}
.name {
  margin-right: 5px;
}
.des {
  margin-top: 15px;
}
.mask {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 2;
  & i {
    cursor: pointer;
    font-size: 20px;
    color: #fff;
  }
}
.active {
  @include border-color('primary');
  position: relative;
  animation: all ease 0.3s;
  &::after {
    display: block;
    content: '';
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-right-color: #409eff;
    border-top-color: #409eff;
    position: absolute;
    top: 0;
    right: 0;
  }
  &_icon {
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: 0;
    right: 0px;
    z-index: 1;
  }
}
</style>
