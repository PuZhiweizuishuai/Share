<template>
  <v-btn
    density="compact"
    icon="mdi-chevron-up"
    size="x-large"
    v-show="fab"
    v-scroll="onScroll"
    color="pink"
    @click="toTop"
    style="position: absolute; right: 0; bottom: 84px"
  >
  </v-btn>
</template>

<script>
import { useGoTo } from 'vuetify'
export default {
  name: 'BackToTop',
  data() {
    return {
      fab: false
    }
  },
  setup() {
    const goTo = useGoTo()
    return { goTo }
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 200
      //   if (window.pageYOffset > 100) {
      //     this.fab = true
      //   }
    },
    toTop() {
      this.goTo(0, 0)
      //this.$vuetify.goTo(0)
    }
  }
}
</script>
