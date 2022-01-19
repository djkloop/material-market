import { withInstall } from '/@/utils';

export { useAppProviderContext } from './src/useAppContext';

import appLogo from './src/AppLogo.vue';
import appProvider from './src/AppProvider';

export const AppLogo = withInstall(appLogo);
export const AppProvider = withInstall(appProvider);