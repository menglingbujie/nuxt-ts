/**
 * Created by Menglj on 2019/07/22.
 * 标准吐司服务页面
 * msg 吐司内容
 * icon:{ 带图片的吐司
 *  type:"icon|img",
 *  url:"",
 *  color:"",
 *  width:"",// default 40 
 *  height:"",// default 40
 * } 
 */
import _ from "lodash";
import {Vue,Component} from "nuxt-property-decorator";
@Component
export default class ToastMixins extends Vue{

  created() {
    this.$Message.config({
      top: 100
    });
  }

  showError(msg:string, callback:any=()=>{}, opts:any=null) {
    this.showToastError(msg, callback, opts);
  }

  showToastError(msg:string, callback:any=()=>{}, opts:any=null){
    let info:any={
      content: msg,
      onClose: callback
    }
    if(opts) {
      _.assign(info, opts);
    }
    this.$Message.error(info);
  }
  showToastSuccess(msg:string, callback:any=()=>{}, opts:any=null){
    let info:any={
      content: msg,
      onClose: callback
    }
    if(opts) {
      _.assign(info, opts);
    }
    this.$Message.success(info);
  }
  showToastWarn(msg:string, callback:any=()=>{}, opts:any=null){
    let info:any={
      content: msg,
      onClose: callback
    }
    if(opts) {
      _.assign(info, opts);
    }
    this.$Message.warning(info);
  }
  
  showFormErrors(e:any, callback:any=()=>{}) {
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
    this.showToastError(err, callback);
  }
  showDialog(opts:any){
    const type = opts.type||"";
    if(type==="info"){
      this.$Modal.info(opts);
    }else if(type==="success"){
      this.$Modal.success(opts);
    }else if(type==="warning"){
      this.$Modal.warning(opts);
    }else if(type==="error"){
      this.$Modal.error(opts);
    }else{
      this.$Modal.confirm(opts);
    }
  }
}