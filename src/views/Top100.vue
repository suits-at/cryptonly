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
      .get("https://api.coinpaprika.com/v1/tickers?quotes=usd,eur")
      .then(response => {
        this.info = response.data.sort(function(a, b) {
          return a.rank - b.rank;
        });
        this.info = this.info.slice(0, 100);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>
