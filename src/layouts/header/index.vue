<template>
  <Header :class="getHeaderClass">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <!-- action button start -->
      <div :class="`${prefixCls}-left-action`">
        <div class="icon-item">
          <icon-apps size="20" class="icon-apps" />
        </div>
      </div>
      <!-- action button end -->
      <!-- left logo start -->
      <AppLogo :class="`${prefixCls}-logo`" show-title />
      <!-- left logo end -->
    </div>
    <!-- left end -->
    <!-- right start -->
    <div :class="`${prefixCls}-right`">
      <div :class="`${prefixCls}-right-wrapper`">
        <div class="w-l"></div>
        <div class="w-r">
          <!-- menu start -->
          <div :class="`${prefixCls}-right-menu`">124</div>
          <!-- menu end -->
          <!-- action start -->
          <div :class="`${prefixCls}-right-action`">444</div>
          <!-- action end -->
        </div>
      </div>
      <!-- right end -->
    </div>
  </Header>
</template>

<script lang="ts" >
import { computed, defineComponent, unref } from 'vue';
import { Layout } from '@arco-design/web-vue';
import { AppLogo } from '/@/components/Application';
import { useDesign } from '/@/hooks/web/useDesign';
import { propTypes } from '/@/utils/propTypes';
import { useAppInject } from '/@/hooks/web/useAppInject';

/// props
const props = {
  fixed: propTypes.bool,
}

const components = {
  Header: Layout.Header,
  AppLogo
}

export default defineComponent({
  name: 'LayoutHeader',
  components,
  props,
  setup(props) {
    const { prefixCls } = useDesign('layout-header');

    const { getIsMobile } = useAppInject();

    const getHeaderClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--mobile`]: unref(getIsMobile),
        }
      ]
    })

    return {
      prefixCls,
      getIsMobile,
      getHeaderClass
    }
  }
})

</script>
<style lang="less">
@import "./index.less";
</style>