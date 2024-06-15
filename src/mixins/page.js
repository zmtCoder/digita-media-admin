export default {
  data() {
    return {
      isInit: true,
      pageCurrent: 1,
      pageLimit: 20,
      pageList: [],
      pageRequest: null,
      pageLoading: false,
      pageTotal: 0
    }
  },

  computed: {
    lengthList() {
      return this.pageList.length
    },
    noMore: {
      get() {
        return !this.isInit && this.pageList.length >= this.pageTotal
      },
      set(v) {
        return v
      }
    },
    scrollDisabled: {
      get() {
        return this.pageLoading || this.noMore
      },
      set(v) {
        return v
      }
    }
  },

  methods: {
    async pageLoad() {
      this.pageLoading = true
      try {
        const res = await this.pageRequest({ page: this.pageCurrent, limit: this.pageLimit })
        this.isInit = false
        this.pageTotal = res.page.totalCount
        this.pageCurrent = res.page.currPage
        if (this.pageCurrent < res.page.totalPage) {
          this.pageCurrent++
        }
        this.beforeAssignPageList && this.beforeAssignPageList(res.page.list)
        this.pageList = this.dataProcessing
          ? this.dataProcessing(this.pageList.concat(res.page.list))
          : this.pageList.concat(res.page.list)
      } catch (e) {
        console.log(e)
        this.isInit = false
        this.noMore = true
      }
      this.pageLoading = false
    },

    resetPageParams() {
      this.isInit = true
      this.pageList = []
      this.pageCurrent = 1
      this.pageLimit = 20
      this.pageTotal = 0
      this.pageLoad()
    },

    refresh() {
      this.resetPageParams()
    }
  }
}
