/**
 * Created by Menglj on 2020/05/22.
 * 处理第三方高度根据内容变化自适应
 */
import { Vue, Component } from "nuxt-property-decorator";
import {isFromThird} from "@/utils/utils"
@Component
// @Component
export default class CalcHeightMixins extends Vue {
  created() {
    if(process.server){return;}
    // 每个第三方layout页面页面渲染后发送自身高度
    // console.log("=created==",this.$route.query);
    this.updateHeight();
  }
  updated() {
    // console.log("=updated==", this.$route.query);
    this.updateHeight();
  }
  updateHeight() {
    // 如果不是第三方页面则不需要处理高度
    const _isFromThird: boolean = isFromThird(null);
    // // console.log("==calc height=ifrom==",_isFromThird)
    if (!_isFromThird) { return ;}
    this.calcPageOffsetHeight((h: number) => {
      const doc: any = document;
      setTimeout(() => {
        let updatedHeight: number = doc.body.offsetHeight;
        // console.log(h, "=update h==", updatedHeight)
        this.sendIframeMessage({type:2001,msg:"height",data:updatedHeight});
      }, 3e2)
    })
  }

  calcPageOffsetHeight(callback: any = null) {
    this.$nextTick(() => {
      if (!process.server ) {
        const pageEle: any = document.getElementsByClassName("page");
        if (pageEle && pageEle[0]) {
          let updatedHeight: number = pageEle[0].offsetHeight || 0;
          callback && callback(updatedHeight);
        }
      }
    })
  }
  sendIframeMessage(data:any) {
    const win: any = window;
    if (win.postMessage) {
      win.parent.postMessage(data, "*")
    } else {
      win.parent.name = JSON.stringify(data);
    }
  }
}