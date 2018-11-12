<template>
    <div id="container">
        <section v-if="errored">
            <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>
        <section v-else>
            <div v-if="loading">Loading...</div>
            <v-data-table
                    v-else
                    :headers="headers"
                    :items="info"
                    :hide-actions="true"
            >
                <template
                        slot="items"
                        slot-scope="props">
                    <tr class="textRight">
                        <td>{{ props.item.rank }}</td>
                        <td class="textLeft">{{ props.item.name }}</td>
                        <td class="textLeft">{{ props.item.symbol }}</td>
                        <td>{{ props.item.quotes.USD.price }}</td>
                        <td>{{ props.item.quotes.EUR.price }}</td>
                        <td v-if="props.item.quotes.USD.percent_change_1h"><span
                                :class="{ positive: props.item.quotes.USD.percent_change_1h > 0, negative: props.item.quotes.USD.percent_change_1h < 0}">{{ props.item.quotes.USD.percent_change_1h }}%</span>
                        </td>
                        <td v-else>0%</td>
                        <td v-if="props.item.quotes.USD.percent_change_24h"><span
                                :class="{ positive: props.item.quotes.USD.percent_change_24h > 0, negative: props.item.quotes.USD.percent_change_24h < 0}">{{ props.item.quotes.USD.percent_change_24h }}%</span>
                        </td>
                        <td v-else>0%</td>
                        <td v-if="props.item.quotes.USD.percent_change_7d"><span
                                :class="{ positive: props.item.quotes.USD.percent_change_7d > 0, negative: props.item.quotes.USD.percent_change_7d < 0}">{{ props.item.quotes.USD.percent_change_7d }}%</span>
                        </td>
                        <td v-else>0%</td>
                        <td v-if="props.item.quotes.USD.market_cap">{{ props.item.quotes.USD.market_cap }}</td>
                        <td v-else>0</td>
                    </tr>
                </template>
            </v-data-table>
        </section>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pagination: {
        sortBy: "rank"
      },
      headers: [
        {
          text: "#",
          align: "center",
          sortable: true,
          value: "rank"
        },
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Symbol",
          value: "symbol"
        },
        {
          text: "Price $",
          align: "right",
          value: "quotes.USD.price"
        },
        {
          text: "Price €",
          align: "right",
          value: "quotes.EUR.price"
        },
        {
          text: "1h",
          align: "center",
          value: "quotes.USD.percent_change_1h"
        },
        {
          text: "24h",
          align: "center",
          value: "quotes.USD.percent_change_24h"
        },
        {
          text: "7d",
          align: "center",
          value: "quotes.USD.percent_change_7d"
        },
        {
          text: "Market Cap",
          align: "right",
          value: "quotes.USD.market_cap"
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
        this.info = Object.values(response.data.data);
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
