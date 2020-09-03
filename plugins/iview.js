import Vue from 'vue'
import ViewUI from 'view-design'
import locale from 'view-design/dist/locale/en-US' // Change locale, check node_modules/view-design/dist/locale
// import zhCN from 'iview/dist/locale/zh-CN' // Change locale, check node_modules/view-design/dist/locale
import 'view-design/dist/styles/iview.css';

export default ({ app }) => {
  if(app.i18n.locale=="zh-cn") {
    Vue.use(ViewUI);
  }else {
    Vue.use(ViewUI, { locale });
  }
}
