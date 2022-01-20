<template>
  <div :class="[prefixCls]">
    <page-layout />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useContentViewHeight } from "./useContentViewHeight";
import { useDesign } from "/@/hooks/web/useDesign";

import PageLayout from '/@/layouts/page/index.vue';

export default defineComponent({
  name: 'LayoutCotnet',
  components: {
    PageLayout
  },
  setup() {
    const { prefixCls } = useDesign('layout-content');

    /// 获取window相关信息
    useContentViewHeight();

    return { prefixCls }
  }
})


</script>