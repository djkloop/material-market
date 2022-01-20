<template>
  <div :class="prefixCls" class="max-w-8xl mx-auto">
    <HomeFilter />
    <a-button>homehomehome</a-button>
  </div>
</template>
<script setup lang="ts" name="Home">
import HomeFilter from './src/HomeFilter.vue';
import { useDesign } from '/@/hooks/web/useDesign';
const { prefixCls } = useDesign('home');

</script>
<style lang="less">
@import "./index.less";
</style>
