<template>
  <div :class="prefixCls">
    <a-affix :offsetTop="60" class="filter" @change="useAffixChange" target="body">
      <div class="filter-wrapper">
        <a-button>11</a-button>
        <a-button>22</a-button>
        <a-button>33</a-button>
        <a-button>44</a-button>
      </div>
    </a-affix>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useDesign } from "/@/hooks/web/useDesign";
export default defineComponent({
  name: ' HomeFilter',
  setup() {
    const { prefixCls } = useDesign('home-filter')

    const useAffixChange = (f: boolean) => {
      console.log(f)
    }

    return {
      prefixCls,
      useAffixChange
    }
  }
})


</script>

<style lang="less">
@import "./home-filter.less";
</style>