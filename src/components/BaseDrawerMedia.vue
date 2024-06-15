<template>
  <el-drawer
    title="媒体列表"
    direction="rtl"
    :size="400"
    :visible="visible"
    @close="close"
    @open="open"
    class="base-drawer-media"
  >
    <div
      class="content infinite-list-wrapper"
      :class="empty ? 'flex-center' : ''"
      style="overflow:auto"
    >
      <ul
        class="list clear"
        v-infinite-scroll="pageLoad"
        :infinite-scroll-disabled="scrollDisabled"
      >
        <template v-for="item in pageList">
          <card-media-check
            @onClick="check(item)"
            :key="item.id"
            :info="item"
            :checkeArr="checkeArr"
            :value="item.id"
          ></card-media-check>
        </template>
        <template v-if="empty && pageLoading">
          <base-empty></base-empty>
        </template>
        <base-page-loading
          :loading="pageLoading"
          :noMore="noMore"
          :list="pageList"
        ></base-page-loading>
        <div class="fix--values">
          {{ scrollDisabled }}
          {{ empty }}
          {{ pageLoading }}
          {{ noMore }}
        </div>
      </ul>
    </div>
    <div class="demo-drawer__footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="add" :disabled="empty">添加</el-button>
    </div>
  </el-drawer>
</template>

<script>
import CardMediaCheck from './CardMediaCheck.vue'
import BasePageLoading from './BasePageLoading'
import BaseEmpty from './BaseEmpty'
import page from '@/mixins/page'
import { listMedia } from '@/api/media'
export default {
  name: 'base-drawer-media',

  components: { CardMediaCheck, BaseEmpty, BasePageLoading },

  mixins: [page],

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    empty() {
      return !this.pageList.length
    }
  },

  data() {
    return {
      pageRequest: listMedia,
      pageList: [],
      checkeArr: []
    }
  },

  methods: {
    close() {
      this.$emit('update:visible', false)
    },

    open() {
      this.refresh()
      this.checkeArr = []
    },

    add() {
      // const checkeArr = this.pageList.filter(item => this.checkeArr.includes(item.id))
      const checkeArr = this.checkeArr.map(id => {
        const item = this.pageList.find(item => item.id === id)
        return item
      })
      const uncheckeArr = this.pageList.filter(item => !this.checkeArr.includes(item.id))
      this.$emit('add', checkeArr, uncheckeArr)
      this.$emit('update:visible', false)
    },

    check(item) {
      const index = this.checkeArr.findIndex(el => el === item.id)
      if (index >= 0) {
        this.checkeArr.splice(index, 1)
      } else {
        this.checkeArr.push(item.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-drawer-media {
  /deep/ .el-drawer {
    background-color: #f9f9f9;
  }
  /deep/ .el-drawer__header {
    margin-bottom: 20px;
  }
  /deep/ .el-drawer__body {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #f0f0f0;
    padding: 5px;
    overflow: auto;
  }
  /deep/ .demo-drawer__footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #f0f0f0;
    padding: 5px 0;
    & button {
      width: 40%;
    }
  }
}
.content {
  box-sizing: border-box;
  flex: 1;
  overflow: auto;
}
.fix--values {
  opacity: 0;
  height: 0;
}
</style>
