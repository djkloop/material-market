<template>
  <div :class="getAppLogoClass" @click="goHome">
    <img
      src="../../../assets/images/logo.png"
      :class="`${prefixCls}__logo`"
      alt="logo"
      title="logo"
    />
    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">{{ title }}</div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { PageEnum } from "/@/enums/pageEnums";
import { useDesign } from "/@/hooks/web/useDesign";
import { useGo } from "/@/hooks/web/usePage";
import { propTypes } from "/@/utils/propTypes";

const props = {
  showTitle: propTypes.bool.def(false),
  alwaysShowTitle: propTypes.bool
}

export default defineComponent({
  name: 'AppLogo',
  props,
  setup(props) {

    const { prefixCls } = useDesign('app-logo');
    const go = useGo();
    /// TODO: config
    const title = ref('form-create-market');

    const getAppLogoClass = computed(() => [
      prefixCls
    ])

    const getTitleClass = computed(() => [
      `${prefixCls}__title`,
      {
        'xs:opacity-0': !props.alwaysShowTitle,
      },
    ]);

    const goHome = () => {
      go(PageEnum.BASE_HOME)
    }

    return {
      prefixCls,
      title,
      getAppLogoClass,
      getTitleClass,
      /// methods
      goHome
    }
  }
})

</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-app-logo";

.@{prefix-cls} {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;

  &__logo {
    height: 22px;
    width: 22px;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }
}
</style>