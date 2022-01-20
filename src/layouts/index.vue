<template>
  <a-layout :class="prefixCls">
    <LayoutHeader fixed />
    <a-layout :class="`${prefixCls}__inner`">
      <LayoutBanner />
      <LayoutContent />
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts" name="DefaultLayout" >
import { useDesign } from '/@/hooks/web/useDesign';
const { prefixCls } = useDesign('default-layout');

import LayoutHeader from './header/index.vue';
import LayoutBanner from './banner/index.vue';
import LayoutContent from './content/index.vue';



</script>