import '/@/design/index.less';
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '/@/router/router'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

async function bootstrap() {
  const app = createApp(App);

  app.use(ArcoVueIcon);

  setupRouter(app);

  app.mount('#form-create-material-root')
}


bootstrap();