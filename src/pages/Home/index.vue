<template>
  <div :class="prefixCls" class="max-w-8xl mx-auto">
    <HomeFilter :home-filter-props="material_state" />
    <HomeContent />
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { useDesign } from '/@/hooks/web/useDesign';
import { useState } from './useHome';

import HomeContent from "./src/HomeContent.vue";
import HomeFilter from './src/HomeFilter.vue';

const state = useState();
export default defineComponent({
  name: 'Home',
  components: {
    HomeFilter,
    HomeContent
  },
  setup() {

    const { prefixCls } = useDesign('home');
    const state = useState();

    return {
      prefixCls,
      ...toRefs(state)
    }
  }
})




</script>
<style lang="less">
@import "./index.less";
</style>
