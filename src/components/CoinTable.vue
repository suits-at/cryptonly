<template>
  <div>
    <section v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment,
        please try back later. Whitelisting this domain in your adblocker might
        help as well.
      </p>
    </section>
    <section v-else class="text-center">
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
          sortBy="rank"
          :mobile-breakpoint="200"
          dense
          :footer-props="{
            itemsPerPageOptions: [25, 50, 100, 500, { text: 'all', value: -1 }]
          }"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <template v-for="item in items">
                <tr
                  class="cursor-pointer"
                  :key="`${item.symbol}-${item.name}`"
                  @click="setExpanded(`${item.symbol}-${item.name}`)"
                >
                  <td class="text-center">{{ item.market_cap_rank }}</td>
                  <td class="text-left hidden-xs-only">{{ item.name }}</td>
                  <td class="text-left uppercase">{{ item.symbol }}</td>
                  <td class="hidden-xs-only">
                    ${{
                      item.current_price.toLocaleString("en-US", {
                        minimumSignificantDigits: 2,
                        maximumSignificantDigits: 6
                      })
                    }}
                  </td>
                  <!--                  <td class="hidden-xs-only">
                    {{
                      item.quotes.EUR.price.toLocaleString("de-DE", {
                        minimumSignificantDigits: 2,
                        maximumSignificantDigits: 6
                      })
                    }}€
                  </td>-->
                  <td v-if="item.price_change_percentage_1h_in_currency">
                    <span
                      :class="{
                        positive:
                          item.price_change_percentage_1h_in_currency > 0,
                        negative:
                          item.price_change_percentage_1h_in_currency < 0
                      }"
                      >{{
                        item.price_change_percentage_1h_in_currency.toFixed(2)
                      }}%</span
                    >
                  </td>
                  <td v-else>0%</td>
                  <td v-if="item.price_change_percentage_24h_in_currency">
                    <span
                      :class="{
                        positive:
                          item.price_change_percentage_24h_in_currency > 0,
                        negative:
                          item.price_change_percentage_24h_in_currency < 0
                      }"
                      >{{
                        item.price_change_percentage_24h_in_currency.toFixed(2)
                      }}%</span
                    >
                  </td>
                  <td v-else>0%</td>
                  <td v-if="item.price_change_percentage_7d_in_currency">
                    <span
                      :class="{
                        positive:
                          item.price_change_percentage_7d_in_currency > 0,
                        negative:
                          item.price_change_percentage_7d_in_currency < 0
                      }"
                      >{{
                        item.price_change_percentage_7d_in_currency.toFixed(2)
                      }}%</span
                    >
                  </td>
                  <td v-else>0%</td>
                  <td v-if="item.market_cap" class="hidden-xs-only">
                    ${{ item.market_cap.toLocaleString("en-US") }}
                  </td>
                  <td v-else class="hidden-xs-only">0</td>
                </tr>
                <!--                <tr
                  :key="`${item.symbol}-${item.name}-expanded`"
                  v-if="expanded === `${item.symbol}-${item.name}`"
                >
                  <td colspan="9" class="text-left dense pt-3 pl-5 pl-lg-10">
                    <p class="d-md-none">
                      <span class="font-weight-bold">Name:</span>
                      {{ item.name }}
                    </p>
                    <p class="d-md-none">
                      <span class="font-weight-bold">Price USD:</span>
                      ${{
                        item.quotes.USD.price.toLocaleString("en-US", {
                          minimumSignificantDigits: 2,
                          maximumSignificantDigits: 6
                        })
                      }}
                    </p>
                    <p class="d-md-none">
                      <span class="font-weight-bold">Price EUR:</span>
                      {{
                        item.quotes.EUR.price.toLocaleString("de-DE", {
                          minimumSignificantDigits: 2,
                          maximumSignificantDigits: 6
                        })
                      }}€
                    </p>
                    <p v-if="item.quotes.USD.market_cap" class="d-md-none">
                      <span class="font-weight-bold">Market Cap:</span>
                      ${{ item.quotes.USD.market_cap.toLocaleString("en-US") }}
                    </p>
                    <p v-else class="d-md-none">
                      <span class="font-weight-bold">Market Cap:</span> 0
                    </p>
                    <p>
                      <span class="font-weight-bold">All-time-High:</span>
                      ${{
                        item.quotes.USD.ath_price.toLocaleString("en-US", {
                          minimumSignificantDigits: 2,
                          maximumSignificantDigits: 6
                        })
                      }}
                    </p>
                    <p>
                      <span class="font-weight-bold">Date of ATH:</span>
                      {{ formatDate(item.quotes.USD.ath_date) }}
                    </p>
                  </td>
                </tr>-->
              </template>
            </tbody>
          </template>
        </v-data-table>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "CoinTable",
  data() {
    return {
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
          class: "hidden-xs-only"
        },
        {
          text: "1h",
          align: "right"
        },
        {
          text: "24h",
          align: "right"
        },
        {
          text: "7d",
          align: "right"
        },
        {
          text: "Market Cap",
          align: "right",
          class: "hidden-xs-only"
        }
      ],
      search: "",
      expanded: false,
      loading: true,
      errored: false,
      info: null,
      perPage: 100,
      page: 1
    };
  },
  mounted() {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
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
  },
  methods: {
    formatDate(date) {
      const newDate = new Date(date);
      return `${newDate.getDate()}.${newDate.getMonth() +
        1}.${newDate.getFullYear()}`;
    },
    setExpanded(item) {
      if (this.expanded === item) {
        this.expanded = false;
      } else {
        this.expanded = item;
      }
    }
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

.v-data-table--dense th,
.v-data-table--dense td {
  height: 40px !important;
}

td.dense p {
  margin-bottom: 8px;
}
</style>
<style lang="scss">
.v-application--is-ltr .v-data-footer__select .v-select {
  margin: 12px 0 12px 12px;
}
.v-application--is-ltr .v-data-footer__pagination {
  margin: 0 10px 0 10px;
}
.v-data-footer {
  justify-content: flex-start;
}
.v-application--is-ltr .v-data-footer__icons-before .v-btn:last-child {
  margin-right: 0;
}
.v-application--is-ltr .v-data-footer__icons-after .v-btn:first-child {
  margin-left: 0;
}
.uppercase {
  text-transform: uppercase;
}
</style>
