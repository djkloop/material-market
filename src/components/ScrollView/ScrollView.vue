<template>
  <div class="scroll-wrapper">
    <div class="scroll-content">
      <div class="pull-down-slot">
        <slot name="pull-down-slot" v-if="isShowPullDonwSlot">
          <div class="justify-center flex text-blue-500 font-bold" v-show="isShowPullDownTips">下拉并刷新</div>
          <div class="justify-center flex text-blue-500 font-bold" v-show="!isShowPullDownTips">
            <div v-show="isPullDownLoad">
              <span>加载中...</span>
            </div>
            <div v-show="!isPullDownLoad">
              <span>加载成功!</span>
            </div>
          </div>
        </slot>
      </div>
      <slot name="scroll-content"></slot>
      <slot v-if="isShowPullUpSlot" name="pull-up-slot">
        <div class="justify-center flex text-blue-500 font-bold" v-show="isShowPullUpTips">上拉并刷新</div>
        <div class="justify-center flex text-blue-500 font-bold" v-show="!isShowPullUpTips">
          <div v-show="isPullUpload">
            <span>加载中...</span>
          </div>
          <div v-show="!isPullUpload">
            <span>加载成功!</span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @evnet {Function} pullingUp(callback) 滚动到底部事件, 用于上拉加载, 需要释放事件
 * @evnet {Function} pullingDown(callback) 滚动到顶部下拉事件, 用于下拉刷新
 */
import { defineEmits, onMounted, ref, defineProps, computed } from 'vue'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import MouseWheel from '@better-scroll/mouse-wheel'
// 扩展鼠标
BScroll.use(MouseWheel)
// 扩展下拉刷新的能力
BScroll.use(PullDown)
// 扩展上拉加载的能力
BScroll.use(Pullup)
const props = defineProps({
  // 滑动块高度(默认页面高度)
  height: {
    type: Number,
    default: document.documentElement.clientHeight || document.body.clientHeight
  },
  otherHeight: {
    type: Number,
    default: 0
  },
  // 头部导航高度(默认46)
  navHeight: {
    type: Number,
    default: 46
  },
  // 底部导航高度(默认50)
  tabHeight: {
    type: Number,
    default: 50
  },
  isShowPullDonwSlot: {
    type: Boolean,
    default: true
  },
  isShowPullUpSlot: {
    type: Boolean,
    default: true
  },
  // 是否开启上拉(底部)刷新
  pullUpLoad: {
    type: Boolean,
    default: false
  },
  // 是否拖动到底了
  pullUpLoadEnd: {
    type: Boolean,
    default: false
  },
  // 是否开启下拉(头部)刷新
  pullDownRefresh: {
    type: Boolean,
    default: false
  },
  // 下拉停止高度
  pullDownRefreshTopHeight: {
    type: Number,
    default: 40
  }
})
/// 下拉刷新正在加载
let isPullDownLoad = ref(false)
/// 下拉刷新提示
let isShowPullDownTips = ref(true)
// 上拉加载正在加载
const isPullUpload = ref(false)
/// 下拉刷新提示
let isShowPullUpTips = ref(true)

const emit = defineEmits(['pullup', 'pulldown', 'scroll'])

// 是否展示底部
onMounted(() => {
  // 初始化滚动条
  const scrollEl = document.querySelector<HTMLElement>('.scroll-wrapper')
  if (!scrollEl) {
    return false
  }
  const pullDownRefreshOpts = props.pullDownRefresh && {
    stop: props.pullDownRefreshTopHeight
  }
  const scroll = new BScroll(scrollEl, {
    probeType: 3,
    mouseWheel: true,
    pullDownRefresh: pullDownRefreshOpts as any,
    pullUpLoad: props.pullUpLoad as any
  })

  // 派发滚动到顶部下拉事件, 用于下拉刷新
  props.pullDownRefresh &&
    scroll.on('pullingDown', () => {
      isPullDownLoad.value = true
      isShowPullDownTips.value = false
      emit('pulldown', () => {
        scroll.finishPullDown()
        isPullDownLoad.value = false
        setTimeout(() => {
          isShowPullDownTips.value = true
          scroll.refresh()
        }, 800)
      })
    })

  // 派发滚动到底部事件, 用于上拉加载
  props.pullUpLoad &&
    scroll.on('pullingUp', () => {
      isPullUpload.value = true
      isShowPullUpTips.value = false
      emit('pullup', () => {
        scroll.finishPullUp()
        isPullUpload.value = false
        setTimeout(() => {
          isShowPullUpTips.value = true
          scroll.refresh()
        }, 800)
      })
    })


  // 派发滚动事件
  scroll.on('scroll', (pos: { x: number; y: number }) => {
    emit('scroll', pos)
  })
})
</script>
<style lang="less">
.scroll-wrapper {
  position: relative;
  overflow: hidden;
  height: 100%;

  .scroll-content {
    height: 100%;
  }
}
.pull-down-slot {
  position: absolute;
  width: 100%;
  padding: 20px;
  bottom: 0;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
}
</style>