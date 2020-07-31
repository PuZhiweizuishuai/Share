<template>
  <v-container>
    <v-row>
      <v-col>
        <br>
        <span>共找到 {{ total }} 条有关<strong> {{ key }}</strong> 的结果</span>
      </v-col>
    </v-row>

    <v-divider />
    <v-row>
      <div id="share-top" />
      <v-col
        v-for="item in shareList"
        :key="item.id"
        cols="12"
      >

        <v-card outlined>
          <v-card-actions>
            <v-list-item-content>
              <v-list-item-title>创建时间： <span v-text="formateTimeToChinese(item.createTime)" /> </v-list-item-title>
            </v-list-item-content>
          </v-card-actions>
          <v-divider />
          <v-card-subtitle>
            <ShowMarkdown :markdown="item.data" :speech="false" />
          </v-card-subtitle>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ShowMarkdown from '@/components/vditor/show-markdown.vue'
export default {
  name: 'Search',
  components: { ShowMarkdown },
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
    this.key = this.$route.query.key
    this.getShareList()
  },
  methods: {
    setKey(key) {
      this.key = key
      console.log(key)
    },
    getShareList() {
      fetch(`/api/share/list?key=${this.key}`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json())
        .then(json => {
          this.shareList = json.page
          this.total = json.page.length
        })
        .catch(e => {
          return null
        })
    },
    formateTimeToChinese(date) {
      if (date === '' || date == null) {
        return ''
      }
      const da = new Date(date)
      return da.getFullYear() + '年' + (da.getMonth() + 1) + '月' + da.getDate() + '日 ' + da.getHours() + '时' + da.getMinutes() + '分'
    },
    pageChange(page) {
      this.page = page

      this.getShareList()
      document.querySelector('#share-top').scrollIntoView()
    },
    subString() {
      if (this.deleteData.data.length > 30) {
        return this.deleteData.data.substring(0, 30) + '......'
      }
      return this.deleteData.data
    }
  }
}
</script>
