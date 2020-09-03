import moment from "moment";
export default function({app,route,store}){
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
  }
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    moment.locale(newLocale);
  }
}
