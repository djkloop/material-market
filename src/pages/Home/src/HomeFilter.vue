<template>
  <div :class="prefixCls">
    <a-affix :offsetTop="60" class="filter">
      <div class="filter-wrapper flex py-4">
        <div class="text-xl font-mono font-bold mr-7">所有物料({{ material_count }})</div>
        <a-space size="medium">
          <a-select :style="{ width: 'auto', minWidth: '100px' }" placeholder="UI 框架" allow-clear>
            <a-option>React</a-option>
            <a-option>Vue</a-option>
          </a-select>
          <a-select :style="{ width: 'auto', minWidth: '100px' }" placeholder="物料类型" allow-clear>
            <a-option>React</a-option>
            <a-option>Vue</a-option>
          </a-select>
          <a-select :style="{ width: 'auto', minWidth: '100px' }" placeholder="物料状态" allow-clear>
            <a-option>React</a-option>
            <a-option>Vue</a-option>
          </a-select>
          <a-select
            :style="{ width: 'auto', minWidth: '100px' }"
            placeholder="关键词"
            multiple
            allow-clear
            :max-tag-count="2"
          >
            <a-option>React</a-option>
            <a-option>Vue</a-option>
          </a-select>
          <a-select :style="{ width: 'auto', minWidth: '100px' }" placeholder="排序方式">
            <a-option>React</a-option>
            <a-option>Vue</a-option>
          </a-select>
        </a-space>
      </div>
    </a-affix>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useDesign } from "/@/hooks/web/useDesign";
import { propTypes } from "/@/utils/propTypes";

const props = {
  material_count: propTypes.number.def(0),
  material_ui: propTypes.string.def(''),
  material_type: propTypes.string.def(''),
  material_worlds: propTypes.arrayOf(propTypes.string).def([]),
  material_sort: propTypes.string.def(''),
}

export default defineComponent({
  name: ' HomeFilter',
  props,
  setup(props) {
    const { prefixCls } = useDesign('home-filter')

    return {
      prefixCls,
    }
  }
})


</script>

<style lang="less">
@import "./home-filter.less";
</style>
