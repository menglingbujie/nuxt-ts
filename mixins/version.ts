import { Vue, Component} from "nuxt-property-decorator"

@Component
export default class VersionMixin extends Vue {
  private version: string = "1.0.0";

  getVersion(){
    console.log("Version is "+this.version);
  }
}