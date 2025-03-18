import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const store = createPinia();
store.use(createPersistedState({
  storage: localStorage,
  key: (id) => `__persisted__${id}`,
}));

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store }; 