<template>
  <div>
    <section v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment,
        please try back later
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <v-data-table
        v-else
        :headers="headers"
        :items="info"
        :hide-actions="true"
      >
        <template slot="items" slot-scope="props">
          <tr class="narrow" @click="props.expanded = !props.expanded">
            <td>{{ props.item.rank }}</td>
            <td class="textLeft hidden-xs-only">{{ props.item.name }}</td>
            <td class="textLeft">{{ props.item.symbol }}</td>
            <td class="hidden-xs-only">${{ props.item.quotes.USD.price }}</td>
            <td class="hidden-xs-only">{{ props.item.quotes.EUR.price }}€</td>
            <td v-if="props.item.quotes.USD.percent_change_1h">
              <span
                :class="{
                  positive: props.item.quotes.USD.percent_change_1h > 0,
                  negative: props.item.quotes.USD.percent_change_1h < 0
                }"
                >{{ props.item.quotes.USD.percent_change_1h }}%</span
              >
            </td>
            <td v-else>0%</td>
            <td v-if="props.item.quotes.USD.percent_change_24h">
              <span
                :class="{
                  positive: props.item.quotes.USD.percent_change_24h > 0,
                  negative: props.item.quotes.USD.percent_change_24h < 0
                }"
                >{{ props.item.quotes.USD.percent_change_24h }}%</span
              >
            </td>
            <td v-else>0%</td>
            <td v-if="props.item.quotes.USD.percent_change_7d">
              <span
                :class="{
                  positive: props.item.quotes.USD.percent_change_7d > 0,
                  negative: props.item.quotes.USD.percent_change_7d < 0
                }"
                >{{ props.item.quotes.USD.percent_change_7d }}%</span
              >
            </td>
            <td v-else>0%</td>
            <td v-if="props.item.quotes.USD.market_cap" class="hidden-xs-only">
              ${{ props.item.quotes.USD.market_cap }}
            </td>
            <td v-else>0</td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <p>Name: {{ props.item.name }}</p>
            <p>Price USD: ${{ props.item.quotes.USD.price }}</p>
            <p>Price EUR: {{ props.item.quotes.EUR.price }}€</p>
            <p v-if="props.item.quotes.USD.market_cap">
              Market Cap: ${{ props.item.quotes.USD.market_cap }}
            </p>
            <p v-else>Market Cap: 0</p>
          </v-card>
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
          value: "name",
          class: "hidden-xs-only"
        },
        {
          text: "Symbol",
          value: "symbol"
        },
        {
          text: "Price $",
          align: "right",
          value: "quotes.USD.price",
          class: "hidden-xs-only"
        },
        {
          text: "Price €",
          align: "right",
          value: "quotes.EUR.price",
          class: "hidden-xs-only"
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
          value: "quotes.USD.market_cap",
          class: "hidden-xs-only"
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
      .get("https://api.coinmarketcap.com/v2/ticker/?convert=EUR&limit=50")
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
/*#container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 10px;
}*/

.negative {
  color: red;
}

.positive {
  color: limegreen;
}

tr {
  text-align: right;
}

/*overwrite td styling from vuetify*/
table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding: 0 16px;
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
