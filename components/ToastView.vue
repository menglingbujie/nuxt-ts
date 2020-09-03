<template>
<div class="container toast" v-if="params.msg" 
  :class="{'icon':params.icon}">
  <div class="content">
    <template v-if="params.icon">
      <my-Icon :color="params.icon.color" 
        v-if="params.icon.type==='icon'" 
        :icon="params.icon.url" 
        :width="params.icon.width||40" 
        :height="params.icon.height||40" />
      <img class="img" :src="params.icon.url" v-else>
    </template>
    <div class="msg" v-html="params.msg"></div>
  </div>
</div>
</template>
<script>
import {Vue,Component,Prop} from "nuxt-property-decorator";
import myIcon from "@/components/Icon.vue";
@Component({
  components:{myIcon}
})
export default class ToastView extends Vue {
  @Prop({type:Object,required:true}) params;
}
</script>

<style lang="less" scoped>
@import (reference) "../assets/less/common/color.less";
.container.toast {
  //以下两种方式，可思
  display: flex;
  align-items: center;
  width: 100%;height:auto !important;
  justify-content: center;
  position: fixed !important;
  left: 0;
  right: 0;
  top: 45%;
  z-index:9999;
  background:none !important;
  &.icon{
    >.content{
      text-align: center;
      border-radius: 4px;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
      background-color: @color_white;
      >.img{display:block;}
      >.icon{display:inline-block;}
      >.icon{
        &.success{
          display:block;
          background:url("data:image/png;base64,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") no-repeat center;
          background-size:cover;
          width:4px;height:4px;
          margin:0 auto 15px;
        }
        &.fail{
          display:block;
          background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAAGyxPnNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE1QjM4QkZBODdENjExRTdBOUZDQjUwOUE4NUNFNzlGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE1QjM4QkZCODdENjExRTdBOUZDQjUwOUE4NUNFNzlGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTVCMzhCRjg4N0Q2MTFFN0E5RkNCNTA5QTg1Q0U3OUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTVCMzhCRjk4N0Q2MTFFN0E5RkNCNTA5QTg1Q0U3OUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4R657RAAAC0UlEQVR42mL8ZOTCgAUws0AZ/4GYEZkNk2CECsDYDEwMOAATmlFwnSAJZiTzYUatAAggRmyuwmZ+KLpgKBCvZkIXQNYOF4AJogiAAEAAwWz/j+Y0dACSD0MODmyawIpgYixoJjBiUwQDLNisw2UTCz6T0DUBBBDIg4uAjDgG/CAEFDxRQPwbnyJYiLNArfmNSxFIngnNvb+xKUKPbVYkxSiKsCULmOLV6KHAhMVNIGf8QXczEw43saK7mQmbw7G4GawQmyIMxUx4FKEoBgggUBQuAdLRUA+wMpAPQpCzSAxaJv1NhmH/oQaGIcc4A1ISYSDScAzD0DMzerjgMxynYbgyHAOO6PwPDXOY+jB0gwiVWuggEs0Bf/AZSMhQbN4kKsyZSIkAIsMcIy/hjQBiI5SJDMMIGg4QgNU6WgEQBqEAGpf6wKB+sYeofjCCWmwgNjenDXo9lNNrYaLCMhqfZ+v85w3YlC9p8XjgM3YIED85pdzkBK8w9iC1tMIU7OntW+EPyFuqFc6CuebXwiIoTVQNLoKl2ZfgKlgLFA6rQE30Ubhnmdp58nRhoT550ZO8IS3FbEUpOLBSrCUYSjBXYxFGA6iG0QiqYBjAKgwjWIThAEU4oPsPf3wUPm4BirG/FgZBIADgcfT59hAr6mGwrzYYBPNpn28GSzjhEEu9O1OQIKF++edO84nPbSdnfPiilAQlxa3aFXvQXR/u6wcycD0JSPdGwB8a6F5wAHJzwkjZAhwDbmjqw4NyC3ASmMqktcHZwNxE6sFWCVwMLMmjBsOMBMwGlkAlYDEw/G3EKSPuWuj2x5KT4Rq0bdhmOC+TQM/AnRaQM/RnU2Ih06ELeniWIjWgsTloD+bw2AJ6BJxwwcUW3UcCBmWgyYgSLDBUAOaGtSIwVASqguECoAoYLgSKwNAAyAIDHkNaAEvAb59C3bnptdfvxbhUar7t9enS8B/hMjlvwwDpOQAAAABJRU5ErkJggg==") no-repeat center;
          background-size:cover;
          width:4px;height:4px;
          margin:0 auto 15px;
        }
      }
      >.msg{vertical-align: middle;font-size:.17rem;margin-top:.1rem;}
    }
  }
  >.content {
    max-width: 72%;
    border-radius: 4px;
    font-size: 16px;
    font-family: inherit;
    min-width: 200px;
    padding: 15px;
    text-align: center;
    line-height:1.5;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
    background-color: @color_white;
    color:@color_slate;
    >.icon,>.img{display:none;margin:0 auto;}
    >.img{
      width:4px;height:4px;
    }
    >.msg{
      color:inherit;font-size:16px;display:inline-block;
    }
  }
  &.reg_error_hide{
    display: none;
  }
}
</style>