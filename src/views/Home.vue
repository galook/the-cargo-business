<template>
  <div class="home">
    <div v-if="data">
      <b-table class="tabule" :data="formData" :columns="formColumns"></b-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  private data: any = {};
  private formData: Array<any> = [];
  private formColumns = [
    {
      field: "product",
      label: "Produkt",
    },
    {
      field: "amount",
      label: "Množství K Dispozici",
    },
     {
      field: "price",
      label: "Kč",
    },
  ];

  async mounted(): Promise<void> {
    Vue.prototype.$axios.get();
    let json = await this.$axios.get("/data/index.json");
    this.data = json.data;

    for (const key in this.data.stock) {
      let n = {
        product: this.data.products[key].name,
        price: this.data.products[key].price,
        amount: this.data.stock[key],
      };
      this.formData.push(n);
    }
  }
}
</script>
