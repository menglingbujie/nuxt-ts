/**
 * Created by Menglj on 2019/07/22.
 * 标准吐司服务页面
 * msg 吐司内容
 * icon:{ 带图片的吐司
 *  type:"icon|img",
 *  url:"",
 *  color:"",
 * } 
 */
import _ from "lodash";
import {Vue,Component} from "nuxt-property-decorator";
import ToastView from "@/components/ToastView.vue";
@Component({
  components: {ToastView}
})
export default class ToastMixins extends Vue{
  private msgTimer:any;
  private toastParams:{[propName:string]:any} = {
    msg:"",
    delay:3e3,
    type:-1,
    callback:()=>{}
  }

  initToastParams() {
    this.toastParams = {
      msg:"",
      delay:3e3,
      type:-1,
      callback:()=>{}
    }
  }

  // methods
  showToast(opts:object){
    if (this.msgTimer) { clearTimeout(this.msgTimer); }
    this.initToastParams();
    _.assign(this.toastParams, opts);
    this.msgTimer = setTimeout(() => { this.toastParams.msg = ""; this.toastParams.callback && this.toastParams.callback(); }, this.toastParams.delay);
  }

  showError(msg: string,callback:any=()=>{},isicon:boolean=true) {
    let opts= {
      msg: msg,
      callback:callback,
    }
    if(isicon){
      opts=_.assign({},opts,{
        icon:{
          type:"icon",
          url:"icon-fail",
          color:"#ff5151",
        }
      })
    }
    this.showToast(opts)
  }
  showToastError(msg:string,callback:any=()=>{},isicon:boolean=true){
    this.showError(msg,callback,isicon);
  }
  showToastSuccess(msg:string,callback:any=()=>{},isicon:boolean=true){
    let opts= {
      msg: msg,
      callback:callback,
    }
    if(isicon){
      opts=_.assign({},opts,{
        icon:{
          type:"icon",
          url:"icon-circle-duigou",
          color:"#35CC6C"
        }
      })
    }
    this.showToast(opts);
  }
  showToastWarn(msg: string,callback:any=()=>{},isicon:boolean=true) {
    let opts= {
      msg: msg,
      callback:callback,
    }
    if(isicon){
      opts=_.assign({},opts,{
        icon:{
          type:"icon",
          url:"icon-circle-clock",
          color:"#4e78ff",
        }
      })
    }
    this.showToast(opts);
  }
  
  showFormErrors(e:any,isicon:boolean=true) {
    if(!e){return}
    let err:any = "";
    if (_.isString(e)) {
      err = e;
    }else{
      let errors = e.data&&e.data.errors;
      if(!_.isEmpty(errors)){
        if (_.isObject(errors)) {
          err = _.first(_.values(errors));
        } else if (_.isString(errors)) {
          err = errors;
        }
      }else if (!e.result) {
        err = e.message;
      }
    }
    this.showError(err,null,isicon);
  }
}