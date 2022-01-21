<template>
  <a-list :max-height="200" @reach-bottom="useReachBottom">
    <template #header>List title</template>
    <a-list-item>Beijing Bytedance Technology Co., Ltd.</a-list-item>
    <a-list-item>Bytedance Technology Co., Ltd.</a-list-item>
    <a-list-item>Beijing Toutiao Technology Co., Ltd.</a-list-item>
    <a-list-item>Beijing Volcengine Technology Co., Ltd.</a-list-item>
    <a-list-item>China Beijing Bytedance Technology Co., Ltd.</a-list-item>
  </a-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeContent',
  setup() {
    const useReachBottom = () => {
      console.log('reach bottom!')

    }


    return {
      useReachBottom
    }
  }
})
</script>