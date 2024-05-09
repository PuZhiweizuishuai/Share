<template>
  <v-btn
    density="compact"
    icon="mdi-chevron-up"
    size="x-large"
    width="56"
    height="56"
    color="pink"
    @click="toTop"
    style="position: fixed; z-index: 9999; right: 64px; bottom: 64px"
  >
  </v-btn>
</template>

<script>
import { useGoTo } from 'vuetify'
export default {
  name: 'BackToTop',
  data() {
    return {
      fab: true
    }
  },
  setup() {
    const goTo = useGoTo()
    return { goTo }
  },
  methods: {
    toTop() {
      this.goTo(0, 0)
      //this.$vuetify.goTo(0)
    }
  }
}
</script>
