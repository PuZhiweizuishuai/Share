<template>
  <v-container>
    <div id="share-top" />
    <v-row>
      <v-col>
        <span
          >共找到 {{ total }} 条有关<strong> {{ decodeURIComponent(key) }}</strong> 的结果，
          当前页：{{ page }}</span
        >
      </v-col>
    </v-row>

    <v-divider />

    <ShareListCom :share-list="shareList" @delete="deleteShare" />

    <div class="text-center">
      <v-pagination
        color="blue"
        v-model="page"
        :length="length"
        :total-visible="5"
        rounded="circle"
        @update:modelValue="pageChange"
      />
    </div>
  </v-container>
</template>

<script>
import ShareListCom from '@/components/share-list.vue'
export default {
  name: 'Search',
  components: { ShareListCom },
  data() {
    return {
      shareList: [],
      page: 1,
      length: 0,
      size: 15,
      total: 0,
      key: ''
    }
  },
  created() {
    const page = parseInt(this.$route.query.page)
    if (!isNaN(page)) {
      if (page <= 0) {
        this.page = 1
      } else {
        this.page = page
      }
    }
    this.key = this.$route.query.key
    this.getShareList()
  },
  methods: {
    setKey(key) {
      this.page = 1
      this.key = key
    },
    deleteShare(status) {
      if (status) {
        this.getShareList()
      }
    },
    getShareList() {
      this.httpGet(
        `/share/list?page=${this.page}&size=${this.size}&key=${encodeURIComponent(this.key)}`,
        (json) => {
          this.shareList = json.page.content
          this.total = json.page.totalElements
          this.length = json.page.totalPages
        }
      )
    },
    pageChange(page) {
      this.page = page
      this.$router.push({
        path: this.$router.path,
        query: { page: page, key: this.key }
      })

      this.getShareList()
      document.querySelector('#share-top').scrollIntoView()
    }
  }
}
</script>
