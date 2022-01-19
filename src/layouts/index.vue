<template>
  <a-layout :class="prefixCls">
    <LayoutHeader fixed />
  </a-layout>
</template>
<script setup lang="ts" name="DefaultLayout" >
import { useDesign } from '/@/hooks/web/useDesign';
const { prefixCls } = useDesign('default-layout');

import LayoutHeader from './header/index.vue';




</script>