/**
 * Created by Menglj on 2020/03/30.
 * 处理个人中心layout，为第三方定制去掉头尾
 * 和移动端layout匹配问题
 */
import {mixins,Component} from "nuxt-property-decorator";
import CalcHeightMixin from "@/mixins/calc_height.ts";
import { isFromThird, normalizePath } from "@/utils/utils";
@Component
export default class LayoutMixins extends mixins(CalcHeightMixin) {
  layout({req}:any){
    if (isFromThird(req)){
      return "no_hf"
    }
    return "default";
  }
  normalizePath(path: string) {
    return normalizePath(path,this.$i18n);
  }
}