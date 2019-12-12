import {Vue,Component} from "nuxt-property-decorator"

@Component
export default class UinfoMixin extends Vue{
  private uinfo:object={
    mid:0,
    name:"default"
  };

  fetchUserInfo(){
    console.log("===fetch user info==",this.uinfo)
  }
}