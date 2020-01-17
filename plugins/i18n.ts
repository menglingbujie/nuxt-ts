const I18N = ({ app }:any):void =>{
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = (oldLocale:string, newLocale:string) => {
    console.log("=beforeLanguageSwitch=" + oldLocale, newLocale)
  }
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale:string, newLocale:string) => {
    console.log("=onLanguageSwitched=", oldLocale, newLocale)
  }
}
export default I18N;