import { defineComponent, ref, toRefs } from 'vue';
import { createAppProviderContext } from './useAppContext';
import { createBreakpointListen } from '/@/hooks/event/useBreakpoint';
import { prefixCls } from '/@/settings/designSettings';

const props = {
  prefixCls: { type: String, default: prefixCls }
}


export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const isMobile = ref(false);
    const { prefixCls } = toRefs(props);

    // Monitor screen breakpoint information changes
    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG);
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth;
      }
    });

    createAppProviderContext({ prefixCls, isMobile });

    return () => slots.default?.();
  }
})