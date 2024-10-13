<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-06-06 17:42:45
 * @LastEditors: zmt
 * @LastEditTime: 2021-12-06 11:24:37
-->
<template>
  <div class="play-list">
    <div class="play-list-header">
      <span class="scenes-img" :class="[type, scenes]"></span>
      <div class="scenes-info">
        <div class="scenes-info-top">
          <h3 class="scenes-info_title ellipsis-1">{{ title }}</h3>
          <el-radio-group :disabled="disabled" v-model="lightColor" @change="changeColor">
            <el-radio class="green" :label="1">绿色</el-radio>
            <el-radio class="red" :label="0">红色</el-radio>
            <el-radio class="yellow" :label="9" v-if="scenes !== 'customizeScenes2'">黄色</el-radio>
          </el-radio-group>
          <!-- <el-switch
            v-if="hasSwitch"
            :disabled="disabled"
            v-model="lightColor"
            :active-value="1"
            :inactive-value="0"
            @change="changeColor"
            active-color="#13ce66"
            active-text="绿色"
            inactive-text="红色"
            inactive-color="#ff4949"
          >
          </el-switch> -->
        </div>
        <p class="scenes-info_des ellipsis-2">{{ des }}</p>
      </div>
    </div>
    <div class="play-list-content clear">
      <draggable
        v-model="scenesList"
        ref="draggable"
        chosenClass="chosen"
        forceFallback
        :disabled="disabled"
        :group="type"
        :touchStartThreshold="0"
        @end="end"
      >
        <transition-group name="cell" tag="div">
          <card-play-list
            v-for="item in scenesList"
            :key="item.mediaOrder"
            :info="item"
            :length.sync="item.mediaTime"
            :disabled="disabled"
            @deleteMedia="deleteMedia"
            @move="move"
            @setLength="setLength"
          ></card-play-list>
        </transition-group>
      </draggable>
      <card-play-list isAdd :disabled="disabled" @add="addPlaylist"></card-play-list>
    </div>
  </div>
</template>

<script>
import CardPlayList from './CardPlayList.vue'
import { playlistType } from '@/data/common'
import draggable from 'vuedraggable'
export default {
  components: { CardPlayList, draggable },

  name: 'play-lsit',

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    playlist: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    scenes: {
      type: String,
      default: '',
      validator: val => {
        return !!playlistType[val]
      }
    },
    hasSwitch: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    title() {
      return playlistType[this.scenes].find(item => item.type === this.type).title
    },
    des() {
      return playlistType[this.scenes].find(item => item.type === this.type).des
    },
    length() {
      return this.scenesList.length
    },
    lightColor: {
      get() {
        if (this.playlist.length > 0 && this.index !== undefined) {
          return this.playlist[this.index] ? this.playlist[this.index].color : 0
        } else {
          return 0
        }
      },
      set(val) {
        this.playlist[this.index].color = val
      }
    }
  },

  data() {
    return {
      visible: false,
      target: null,
      scenesList: []
    }
  },

  methods: {
    deleteMedia(info) {
      this.$confirm('在播放列表中删除该媒体吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const index = this.scenesList.findIndex(item => item.mediaOrder === info.mediaOrder)
          if (index >= 0) {
            this.scenesList.splice(index, 1)
            this.updatePlaylist()
          }
        })
        .catch(() => {})
    },

    changeColor(e) {
      this.$emit('changeColor', this.playlist, this.index, e)
    },

    updateInfo() {
      this.$emit('updateInfo', this.info)
    },

    addPlaylist() {
      this.$emit('addPlaylist', this.index)
    },

    async setLength() {
      this.updatePlaylist()
    },

    move(direction, target) {
      const currentIndex = this.scenesList.findIndex(item => item.mediaOrder === target.mediaOrder)
      if (direction === 'right' && currentIndex < this.length - 1) {
        const nextItem = this.scenesList[currentIndex + 1]
        this.scenesList.splice(currentIndex, 2, nextItem, target)
      } else if (direction === 'left' && currentIndex !== 0) {
        const nextItem = this.scenesList[currentIndex - 1]
        this.scenesList.splice(currentIndex - 1, 2, target, nextItem)
      }

      this.updatePlaylist()
    },

    end() {
      this.updatePlaylist()
    },

    updatePlaylist() {
      this.$emit('updatePlaylist', this.scenesList, this.index)
    }
  },

  watch: {
    playlist: {
      handler: function(newVal) {
        try {
          this.scenesList = JSON.parse(newVal[this.index].content)
        } catch (e) {
          this.scenesList = []
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
@import '~@/styles/scenes.scss';
.play-list {
  border: 1px solid #cecece;
  border-radius: 10px;
  margin-bottom: 16px;
  background-color: #ffffff;
  &-header {
    height: 80px;
    width: 100%;
    border-bottom: 2px solid #dcdfe6;
    display: flex;
    box-sizing: border-box;
    padding: 10px 10px 15px 10px;
  }
  &-content {
    width: 100%;
    box-sizing: border-box;
  }
}

.scenes {
  font-size: 13px;
  display: flex;
  &-img {
    display: inline-block;
    width: 55px;
    height: 55px;
    background-size: 190px;
    background-repeat: no-repeat;
  }
  &-info {
    flex: 1;
    margin-left: 18px;
    font-size: 13px;
    &_title {
      flex: 1;
      line-height: 30px;
      color: #4e4e4f;
    }
    &_des {
      line-height: 18px;
      color: #878788;
      font-size: 12px;
    }
  }
}
.chosen {
  @include border-color('danger');
}
.cell-move {
  transition: transform 1s;
}
.scenes-info-top {
  display: flex;
  align-items: center;
}
.green {
  /deep/ .is-checked + .el-radio__label {
    color: #67c23a;
  }
  /deep/ .is-checked .el-radio__inner {
    background-color: #67c23a;
    border-color: #67c23a;
  }
}
.red {
  /deep/ .is-checked + .el-radio__label {
    color: #f56c6c;
  }
  /deep/ .is-checked .el-radio__inner {
    background-color: #f56c6c;
    border-color: #f56c6c;
  }
}
.yellow {
  /deep/ .is-checked + .el-radio__label {
    color: #e6a23c;
  }
  /deep/ .is-checked .el-radio__inner {
    background-color: #e6a23c;
    border-color: #e6a23c;
  }
}
</style>
