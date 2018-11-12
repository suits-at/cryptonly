<template>
    <div id="container">
        <section v-if="errored">
            <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>

        <section v-else>
            <div v-if="loading">Loading...</div>

            <div
                    v-else
                    v-for="currency in info"
                    :key="currency.id"
                    class="currency"
            >
                {{ currency.name }}:
                {{ currency.quotes.USD.price }}
            </div>

        </section>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "left",
          sortable: true,
          value: "#"
        },
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Symbol",
          value: "-"
        },
        {
          text: "Price $",
          value: "-"
        },
        {
          text: "Price €",
          value: "-"
        },
        {
          text: "1h",
          value: "-"
        },
        {
          text: "24h",
          value: "-"
        },
        {
          text: "7d",
          value: "-"
        },
        {
          text: "Market Cap",
          value: "-"
        }
      ],
      info: null,
      loading: true,
      errored: false
    };
  },
  filters: {
    // currencydecimal(value) {
    //   return value.toFixed(2);
    // }
  },
  mounted() {
    axios
      .get("https://api.coinmarketcap.com/v2/ticker/?convert=EUR&limit=10")
      .then(response => {
        this.info = response.data.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>
<style>
#container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 10px;
}

.textRight {
  text-align: right;
}

.textCenter {
  text-align: center;
}

.negative {
  color: red;
}

.positive {
  color: limegreen;
}

tr {
  text-align: right;
}

td:nth-child(2),
td:nth-child(3),
th:nth-child(2),
th:nth-child(3) {
  text-align: left;
}

td:nth-child(1),
th:nth-child(1),
th:nth-child(6),
th:nth-child(7),
th:nth-child(8) {
  text-align: center;
}
</style>
