<template>
  <CoinTable :errored="errored" :loading="loading" :info="info" />
</template>

<script>
import axios from "axios";
import CoinTable from "../components/CoinTable";

export default {
  components: { CoinTable },
  data() {
    return {
      loading: true,
      errored: false,
      info: null
    };
  },
  mounted() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
      )
      .then(response => {
        console.log("get data", response.data);
        this.info = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>
