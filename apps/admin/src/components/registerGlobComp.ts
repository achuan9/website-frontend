import type { App } from 'vue';
import { Button, Input, Layout, Menu, Dropdown, Avatar, Breadcrumb, Form, Checkbox, Result } from 'ant-design-vue';

export function registerGlobComp(app: App) {
  app.use(Button);
  app.use(Input);
  app.use(Layout);
  app.use(Menu);
  app.use(Dropdown);
  app.use(Avatar);
  app.use(Breadcrumb);
  app.use(Form);
  app.use(Checkbox);
  app.use(Result);
} 