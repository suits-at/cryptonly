<template>
    <div id="container">
        <div
                v-if="globals"
                id="globals"
                class="md-layout">
            <div class="md-layout-item"><strong>Total Market Cap:</strong> ${{ globals.total_market_cap_usd }}</div>
            <div class="md-layout-item"><strong>24h Volume:</strong>
                ${{ globals.total_24h_volume_usd }}</div>
            <div class="md-layout-item"><strong>BTC Dominance:</strong>
                {{ globals.bitcoin_percentage_of_market_cap }}%</div>
        </div>
        <div v-if="coins && coins.length">
            <v-data-table
                    :headers="headers"
                    :items="coins">
                <template
                        slot="items"
                        slot-scope="props">
                    <tr
                            class="textRight">
                        <td>{{ props.item.rank }}</td>
                        <td
                                md-label="Name"
                                md-sort-by="name"
                                class="textLeft">{{ props.item.name }}</td>
                        <td class="textLeft">{{ props.item.symbol }}</td>
                        <td>{{ props.item.price_usd }}</td>
                        <td>{{ props.item.price_eur }}</td>
                        <td v-if="props.item.percent_change_1h"><span :class="{ positive: props.item.percent_change_1h > 0, negative: props.item.percent_change_1h < 0}">{{ props.item.percent_change_1h }}%</span></td><td v-else>0%</td>
                        <td v-if="props.item.percent_change_24h"><span :class="{ positive: props.item.percent_change_24h > 0, negative: props.item.percent_change_24h < 0}">{{ props.item.percent_change_24h }}%</span></td><td v-else>0%</td>
                        <td v-if="props.item.percent_change_7d"><span :class="{ positive: props.item.percent_change_7d > 0, negative: props.item.percent_change_7d < 0}">{{ props.item.percent_change_7d }}%</span></td><td v-else>0%</td>
                        <td v-if="props.item.market_cap_usd">{{ props.item.market_cap_usd }}</td><td v-else>0</td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <div v-if="errors && errors.length">
            <div
                    v-for="error of errors"
                    :key="error.id">
                {{ error.message }}
            </div>
        </div>
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
        { text: "Name", value: "name" },
        { text: "Symbol", value: "-" },
        { text: "Price $", value: "-" },
        { text: "Price €", value: "-" },
        { text: "1h", value: "-" },
        { text: "24h", value: "-" },
        { text: "7d", value: "-" },
        { text: "Market Cap", value: "-" }
      ],
      coins: [],
      globals: [],
      errors: []
    };
  },

  // Fetches posts when the component is created.
  created() {
    function getCoins() {
      return axios.get(
        "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=10"
      );
    }

    function getGlobals() {
      return axios.get("https://api.coinmarketcap.com/v1/global/?convert=EUR");
    }

    axios
      .all([getCoins(), getGlobals()])
      .then(
        axios.spread((coins, globals) => {
          this.coins = coins.data;
          this.globals = globals.data;
          // add thousands seperator
          this.globals.total_market_cap_usd = globals.data.total_market_cap_usd.toLocaleString(
            "en-US"
          );
          this.globals.total_24h_volume_usd = globals.data.total_24h_volume_usd.toLocaleString(
            "en-US"
          );
        })
      )
      .catch(e => {
        this.errors.push(e);
      });
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
