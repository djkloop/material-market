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
          <div :class="`${prefixCls}-right-menu`">
            <div :class="`${prefixCls}-right-menu-item`">
              <a-link class="link">
                开发
                <template #icon>
                  <icon-down />
                </template>
              </a-link>
            </div>
            <div :class="`${prefixCls}-right-menu-item`">
              <a-link class="link">
                生态产品
                <template #icon>
                  <icon-down />
                </template>
              </a-link>
            </div>
          </div>
          <!-- menu end -->
          <!-- action start -->
          <ul :class="`${prefixCls}-right-action`">
            <li>
              <a-link
                title="Github"
                target="_blank"
                class="link"
                href="https://github.com/xaboy/form-create"
              >
                <icon-github size="20" />
              </a-link>
            </li>
            <li>
              <a-badge :count="9" dot :offset="[-6, 0]">
                <a-link class="link">
                  <template #icon>
                    <icon-notification size="22" />
                  </template>
                </a-link>
              </a-badge>
            </li>
            <li>
              <icon-moon-fill v-if="!getIsDark" size="22" />
              <icon-sun-fill v-else size="22" />
            </li>
            <li>
              <a-avatar :size="32">
                <template v-if="!isLogin">未登录</template>
                <template v-else>
                  <icon-user />
                </template>
              </a-avatar>
            </li>
          </ul>
          <!-- action end -->
        </div>
      </div>
    </div>
    <!-- right end -->
  </Header>
</template>

<script lang="ts" >
import { computed, defineComponent, ref, unref } from 'vue';
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
    const isLogin = ref(false);

    const { prefixCls } = useDesign('layout-header');


    const { getIsMobile, getIsDark } = useAppInject();

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
      isLogin,
      prefixCls,
      getIsMobile,
      getIsDark,
      getHeaderClass
    }
  }
})

</script>
<style lang="less">
@import "./index.less";
</style>