import type { App } from 'vue'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

export function setupGlobComponent(app: App) {
  app.component('infinite-loading', InfiniteLoading)
}