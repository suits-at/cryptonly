<template>
  <section v-if="errored">
    <p>
      We're sorry, we're not able to retrieve this information at the moment,
      please try back later. Whitelisting this domain in your adblocker might
      help as well.
    </p>
  </section>
  <section v-else>
    <v-progress-circular v-if="loading" indeterminate color="primary" />
    <section v-else>
      <v-text-field
        v-model="search"
        label="Search"
        singe-line
        hide-details
        append-icon="fa-search"
      />
      <v-data-table
        :headers="headers"
        :items="info"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
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
          <v-card flat class="pl-3 pt-3">
            <p><span class="bold">Name:</span> {{ props.item.name }}</p>
            <p>
              <span class="bold">Price USD:</span> ${{
                props.item.quotes.USD.price
              }}
            </p>
            <p>
              <span class="bold">Price EUR:</span>
              {{ props.item.quotes.EUR.price }}€
            </p>
            <p v-if="props.item.quotes.USD.market_cap">
              <span class="bold">Market Cap:</span> ${{
                props.item.quotes.USD.market_cap
              }}
            </p>
            <p v-else><span class="bold">Market Cap:</span> 0</p>
          </v-card>
        </template>
      </v-data-table>
    </section>
  </section>
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
      errored: false,
      search: "",
      rowsPerPageItems: [
        10,
        25,
        50,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ]
    };
  },
  filters: {
    // currencydecimal(value) {
    //   return value.toFixed(2);
    // }
  },
  mounted() {
    axios
      .get("https://api.coinmarketcap.com/v2/ticker/?convert=EUR&limit=5000")
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
<style lang="scss" scoped>
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

.bold {
  font-weight: bold;
}
.v-card {
  p {
    text-align: left;
  }
}
</style>
