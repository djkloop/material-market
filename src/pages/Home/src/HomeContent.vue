<template>
  <div class="scroller-wrapper-box" ref="ScrollerWrapperBox">
    <div class="scroll-item" v-for="comment in comments" :key="comment.id">
      <div>{{ comment.email }}</div>
      <div>{{ comment.id }}</div>
    </div>
    <infinite-loading :comments="comments" @infinite="load" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
let comments = ref<Array<any>>([]);
let page = 1;

onMounted(() => {
  // const el = document.documentElement;
  // const getEventHandler = (el) => {
  //   console.log(el)
  // return () => {
  //   const { scrollTop, scrollHeight, clientHeight } = el;
  //   const validState = state.value == "loaded" || !state.value;

  //   if (top && Math.ceil(scrollTop) - distance <= 0 && validState) emitInfiniteEvent();
  //   if (!top && Math.ceil(scrollTop) + clientHeight >= scrollHeight - distance && validState)
  //     emitInfiniteEvent();
  // };
  //   return () => { }
  // };
  // let eventHandler = getEventHandler(el);
  window.addEventListener('scroll', () => {
    console.log('---->')
  })
})


const load = async ($state: any) => {
  console.log("loading...");

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments?_limit=30&_page=" + page
    );
    const json = await response.json();
    if (json.length < 10) $state.complete();
    else {
      comments.value.push(...json);
      $state.loaded();
    }
    page++;
  } catch (error) {
    $state.error();
  }
};

</script>
<style lang="less">
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