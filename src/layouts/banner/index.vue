<template>
  <div :class="prefixCls">banner</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useDesign } from '/@/hooks/web/useDesign';


export default defineComponent({
  name: 'LayoutBanner',
  setup() {
    const { prefixCls } = useDesign('layout-banner');
    const { getIsMobile } = useAppInject();

    return {
      prefixCls,
      getIsMobile,
    }
  }
})

</script>
<style lang="less">
@import "./index.less";
</style>