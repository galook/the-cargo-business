import { AxiosInstance } from 'axios';
import { Vue } from 'vue-property-decorator';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}
