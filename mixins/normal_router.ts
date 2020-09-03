/**
 * Created by Menglj on 2020/03/30.
 * 处理个人中心layout，为第三方定制去掉头尾
 * 和移动端layout匹配问题
 */
import {Vue,Component} from "nuxt-property-decorator";
import {  normalizePath } from "@/utils/utils";
@Component
export default class NormalRouterMixins extends Vue {
  normalizePath(path: string) {
    return normalizePath(path,this.$i18n);
  }
}