<template>
  <div :class="prefixCls" id="back-content">
    <div :class="[`${prefixCls}-plugin`]">
      <div
        :class="[`${prefixCls}-plugin__item`]"
        class="border-gray-200 dark:border-light-100 border rounded-md overflow-hidden"
        v-for="plugin in plugins"
        :key="plugin.id"
      >
        <div :class="[`${prefixCls}-plugin__item__img`]">
          <img :src="plugin.screenshot" :alt="plugin.title" />
          <div :class="`${prefixCls}-plugin__item__img__bage flex`">
            <icon-font class="mr-1" :type="_useRenderTagIconType(plugin.type)" :size="22" />
            <span
              class="capitalize rounded-sm px-1 flex justify-center items-center"
            >{{ plugin.type }}</span>
          </div>
        </div>
        <div :class="[`${prefixCls}-plugin__item__title`, 'truncate', 'my-2']">
          <a-tooltip :content="plugin.title">
            <span class="truncate font-bold">{{ plugin.title }}</span>
          </a-tooltip>
          <div class="h-2"></div>
          <a-typography-paragraph
            type="secondary"
            :class="`${prefixCls}-plugin__item__title__desc`"
            :ellipsis="{
              rows: 2,
              showTooltip: true,
            }"
          >{{ plugin.description }}</a-typography-paragraph>
        </div>
        <div :class="[`${prefixCls}-plugin__item__infos flex items-center justify-between`]">
          <div class="space-x-2 flex items-center">
            <a-avatar :class="[`${prefixCls}-plugin__item__infos__avatar`]" :size="36">
              <img alt="avatar" src="https://avatars.githubusercontent.com/u/29861850?v=4" />
            </a-avatar>
            <div
              class="flex items-center text-gray-600 justify-center bg-gray-100 px-2 py-1 rounded font-bold"
            >
              <span v-if="plugin.isTeam" class="text-yellow-500 mr-1">
                <icon-user-group :size="16" />
              </span>
              <span
                :class="{
                  'text-yellow-500': plugin.isTeam,
                }"
              >{{ plugin.author }}</span>
              <span v-if="plugin.isTeam" class="text-yellow-500">（团队）</span>
            </div>
          </div>
          <div class="flex items-center space-y-1 flex-col text-[12px] text-[#444] font-semibold">
            <div>
              <icon-to-bottom />
              {{ transformNumber(plugin.downloadTimes) }}
            </div>
            <div>
              <icon-star-fill />
              {{ transformNumber(plugin.favoriteTimes) }}
            </div>
          </div>
        </div>
        <div :class="[`${prefixCls}-plugin__item__times text-right`]">
          <span class="text-[#666] text-[12px]">更新时间: {{ plugin.publishTime }}</span>
        </div>
      </div>
    </div>
    <infinite-loading :comments="plugins" @infinite="load">
      <template #spinner>
        <div class="flex justify-center">
          <a-spin tip="加载中" :size="28" />
        </div>
      </template>
      <template #complete>
        <div class="flex justify-center text-center py-4">
          <a-typography-text type="secondary">我也是有底线的~</a-typography-text>
        </div>
      </template>
      <template #error="{ retry }">
        <div class="flex flex-col items-center space-y-2">
          <a-typography-text type="danger" bold>请求失败！</a-typography-text>
          <a-button type="primary" status="danger" @click="retry">重新请求</a-button>
        </div>
      </template>
    </infinite-loading>
    <a-back-top :style="{ position: 'fixed' }" :visible-height="400" />
  </div>
</template>

<script setup lang="ts">
import type { LibType, ListItem, PluginsList } from './home.content'
import { ref } from 'vue'
import { get } from '/@/utils/get';
import { useDesign } from "/@/hooks/web/useDesign";
import { Icon } from '@arco-design/web-vue';
import { transformNumber } from '/@/utils/transformnumber'
const IconFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/font_3236355_vnj1l4z4mpd.js' })

const { prefixCls } = useDesign('home-content')




let plugins = ref<Array<ListItem>>([]);
let page = 1;

/// not support
// const _setColor = (color: string) => {
//   const colorRgbaText = colorRgba(color, 0.3).rgba
//   const colorHexBgText = colorHex(colorRgbaText)
//   const varBgColor = `bg-[${colorHexBgText}]`
//   const varTextColor = `text-[${color}]`
//   return {
//     [varBgColor]: true,
//     [varTextColor]: true,
//   }
// }

// const _useRenderTagColor: (type: LibType) => { [key: string]: any } = (type: LibType) => {

//   if (type === 'vue2' || type === 'vue3') {
//     return _setColor('#00B42A')
//   } else if (type === 'react') {
//     return _setColor('#61dafb')
//   } else if (type === 'angular') {
//     return _setColor('#e10031')
//   } else {
//     return _setColor('#00B42A')
//   }
// }

const _useRenderTagIconType: (type: LibType) => string = (type: LibType) => {
  const vueSrc = 'icon-Vue'
  const reactSrc = 'icon-React'
  const angularSrc = 'icon-Angular'
  if (type === 'vue2' || type === 'vue3') {
    return vueSrc
  } else if (type === 'react') {
    return reactSrc
  } else if (type === 'angular') {
    return angularSrc
  } else {
    return vueSrc
  }
}


const load = async ($state: any) => {
  let count = 10
  if (page > 3) {
    count = 0
  }
  try {
    const result = await get<PluginsList>("/api/getPlugins", { count, page });
    if (result.code === 200) {
      if (result.data.list.length < 10) $state.complete();
      else {
        plugins.value.push(...result.data.list);
        $state.loaded();
      }
    }
    page++;
  } catch (error) {
    $state.error();
  }
};

</script>
<style lang="less">
@import "./home-content.less";

.scroller-wrapper-box {
  padding: 20px 0;
}
.scroll-item {
  display: flex;
  justify-content: center;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  text-align: center;
  &:nth-child(2n) {
    background-color: #f3f5f7;
  }
  &:nth-child(2n + 1) {
    background-color: #42b983;
  }
}
</style>