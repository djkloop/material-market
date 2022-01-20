<template>
  <div :class="prefixCls">
    <div class="max-w-8xl mx-auto h-full" :class="`${prefixCls}__content`">
      <div :class="`${prefixCls}__content-left`">
        <div class="font-bold text-5xl font-mono">Material Market</div>
        <div>
          <span class="text-xl underline-blue-500 underline underline-offset-4">让生态丰富起来、让更多组件服务更多业务。</span>
          <a-button class="ml-8 docs" size="small" type="outline">阅读文档</a-button>
        </div>
        <div class="select-compose">
          <a-input :style="{ width: '320px' }" size="large" allow-clear>
            <template #prepend>
              <a-select
                size="large"
                class="select"
                v-model="isSelectValue"
                :style="{ width: '85px' }"
              >
                <a-option value="material">物料</a-option>
                <a-option value="team">团队</a-option>
              </a-select>
            </template>
            <template #append>
              <a-button type="text" class="w-full h-full search-btn">
                <template #icon>
                  <icon-search size="20" />
                </template>
              </a-button>
            </template>
          </a-input>
        </div>
      </div>
      <div :class="`${prefixCls}__content-right`">
        <img src="../../assets/images/bg.jpeg" alt="banner" title="banner" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useDesign } from '/@/hooks/web/useDesign';


export default defineComponent({
  name: 'LayoutBanner',
  setup() {
    const { prefixCls } = useDesign('layout-banner');
    const { getIsMobile } = useAppInject();
    const isSelectValue = ref('material');

    return {
      prefixCls,
      getIsMobile,
      isSelectValue
    }
  }
})

</script>
<style lang="less">
@import "./index.less";
</style>
@import "./index.less";
