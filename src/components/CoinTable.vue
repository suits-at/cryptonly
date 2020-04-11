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
                  <td class="text-center">{{ item.rank }}</td>
                  <td class="text-left hidden-xs-only">{{ item.name }}</td>
                  <td class="text-left">{{ item.symbol }}</td>
                  <td class="hidden-xs-only">
                    ${{
                      item.quotes.USD.price.toLocaleString("en-US", {
                        minimumSignificantDigits: 2,
                        maximumSignificantDigits: 6
                      })
                    }}
                  </td>
                  <td class="hidden-xs-only">
                    {{
                      item.quotes.EUR.price.toLocaleString("de-DE", {
                        minimumSignificantDigits: 2,
                        maximumSignificantDigits: 6
                      })
                    }}€
                  </td>
                  <td v-if="item.quotes.USD.percent_change_1h">
                    <span
                      :class="{
                        positive: item.quotes.USD.percent_change_1h > 0,
                        negative: item.quotes.USD.percent_change_1h < 0
                      }"
                      >{{ item.quotes.USD.percent_change_1h }}%</span
                    >
                  </td>
                  <td v-else>0%</td>
                  <td v-if="item.quotes.USD.percent_change_24h">
                    <span
                      :class="{
                        positive: item.quotes.USD.percent_change_24h > 0,
                        negative: item.quotes.USD.percent_change_24h < 0
                      }"
                      >{{ item.quotes.USD.percent_change_24h }}%</span
                    >
                  </td>
                  <td v-else>0%</td>
                  <td v-if="item.quotes.USD.percent_change_7d">
                    <span
                      :class="{
                        positive: item.quotes.USD.percent_change_7d > 0,
                        negative: item.quotes.USD.percent_change_7d < 0
                      }"
                      >{{ item.quotes.USD.percent_change_7d }}%</span
                    >
                  </td>
                  <td v-else>0%</td>
                  <td v-if="item.quotes.USD.market_cap" class="hidden-xs-only">
                    ${{ item.quotes.USD.market_cap.toLocaleString("en-US") }}
                  </td>
                  <td v-else class="hidden-xs-only">0</td>
                </tr>
                <tr
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
                </tr>
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
          align: "right",
          value: "quotes.USD.percent_change_1h"
        },
        {
          text: "24h",
          align: "right",
          value: "quotes.USD.percent_change_24h"
        },
        {
          text: "7d",
          align: "right",
          value: "quotes.USD.percent_change_7d"
        },
        {
          text: "Market Cap",
          align: "right",
          value: "quotes.USD.market_cap",
          class: "hidden-xs-only"
        }
      ],
      search: "",
      expanded: false
    };
  },
  props: {
    errored: Boolean,
    loading: Boolean,
    info: Object
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
</style>
