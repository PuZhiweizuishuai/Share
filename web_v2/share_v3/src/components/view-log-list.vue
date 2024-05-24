<template>
  <v-container>
    <v-data-table-server :headers="headers" :items="viewList" hide-default-footer :loading="loading">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title
            >
            已被查看：{{ total }} 次</v-toolbar-title
          >
        </v-toolbar>
      </template>
      <template v-slot:item.viewTime="{ item }">
          {{ formateTimeToChinese(item.viewTime) }}
      </template>
    </v-data-table-server>
    <v-pagination
        color="blue"
        v-model="page"
        :length="pageCount"
        :total-visible="5"
        rounded="circle"
        @update:modelValue="pageChange"
      />
      <v-snackbar
      v-model="snackbar"
      :color="'success'"
      :timeout="3000"
      :top="true"
    >
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  naem: 'viewLogTable',
  props: {
    types: {
      type: Number,
      default: () => {
        return 0
      }
    },
    target: {
      type: Number,
      default: () => {
        return 0
      }
    },
  },
  data() {
    return {
      headers: [
        {
          title: "IP",
          sortable: false,
          key: "ip",
        },
        { title: "地区", sortable: false, key: "city" },
        { title: "访问时间", sortable: false, key: "viewTime" },
      ],
      viewList: [],
      page: 1,
      size: 10,
      type: this.types,
      targetId: this.target,
      total: 0,
      pageCount: 0,
      loading: true,
      snackbar: false,
      message: ''
    }
  },
  created() {
    this.getViewList()
  },
  methods: {
    pageChange(data) {
      this.loading = true
      this.page = data
      this.getViewList()
    },
    getViewList() {
      this.httpGet(`/admin/viewlog/list?type=${this.type}&targetId=${this.targetId}&page=${this.page}&size=${this.size}`, (json)=>{
        if (json.status === 200) {
          this.viewList = json.data.content
          this.total = json.data.totalElements
          this.pageCount = json.data.totalPages
          this.loading = false
        } else {
          //
          this.loading = false
        }
      })
    },
    formateTimeToChinese(date) {
      if (date === '' || date == null) {
        return ''
      }
      const da = new Date(date)
      return (
        da.getFullYear() +
        '年' +
        (da.getMonth() + 1) +
        '月' +
        da.getDate() +
        '日 ' +
        da.getHours() +
        '时' +
        da.getMinutes() +
        '分'
      )
    },
  }
};
</script>

<style>
</style>