<template>
  <div class="home">
    <div v-if="data">
      <b-table class="tabule" :data="formData" :columns="formColumns"></b-table>

      <div class="order">
        <h2>Vytvořit objednávku</h2>
        <b-field>
          <b-select placeholder="Zvolte produkt" v-model="inputType" expanded>
            <option v-for="(product, i) in products" :key="i">
              {{ product.name }}
            </option>
          </b-select>
        </b-field>
        <b-input
          v-model="inputName"
          placeholder="Zadejte Vaše jméno nebo identifikátor"
        >
        </b-input>
        <b-input v-model="inputAmount" placeholder="Zadejte množství">
        </b-input>

        {{ checkAvailability }}

        <b-button @click="send">
          Odeslat
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  private data: any = {};
  private products: any;
  private inputType = null;
  private inputAmount = null;
    private inputName = null;

  private formData: Array<any> = [];
  private formColumns = [
    {
      field: "id",
      label: "Označení objednávky",
    },
    {
      field: "price",
      label: "CZK",
    },
    {
      field: "product",
      label: "Produkt",
    },
    {
      field: "amount",
      label: "Množství",
    },
  ];


  async mounted(): Promise<void> {
    Vue.prototype.$axios.get();
    let json = await this.$axios.get("/data/index.json");
    this.data = json.data;
    this.products = this.data.products;

    this.data.orders.forEach((order: any, i: number) => {
      let n = {
        id: order.id,
        product: this.data.products[order.what].name,
        amount: order.amount,
        price: this.data.products[order.what].price * order.amount,
      };

      this.formData.push(n);
    });
  }

  get checkAvailability(): string {
    let s = -1;
    for (const a in this.products) {
      if (this.products[a].name === this.inputType) s = Number(a);
    }
    console.log(s);

    return this.data.stock[s] && Number(this.inputAmount) != 0 ? this.data.stock[s] >= (this.inputAmount ?? 1) ? this.inputAmount ? 'Zboží je v daném množství naskladněno' : 'Zboží je dostupné' : `Zboží bude naskladněno po vytvoření objednávky (Aktuálně na skladě ks: ${this.data.stock[s]}` : ''
  }

  send(): void {
    if(this.inputName && this.inputType && this.inputAmount) {
    this.$axios.get(`https://mailer.quvia.online/mail?from=cargobusiness&to=matej.holubec@gmail.com&body=Jmeno:%20${this.inputName}%20Produkt:%20${this.inputType}%20Mnozstvi:%20${this.inputAmount}&subject=New%20Order&name=The%20Cargo%20Business`)
    alert("Hotovo, objednávka čeká na schválení...")
    } else {
      alert("Nezadali jste některý z údajů")
    }
  }
}
</script>
<style lang="scss">
.tabule {
  padding: 3rem;
}
.order {
  padding: 5rem;
  max-width: 25rem;
}
</style>
