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
          sortBy="market_cap_rank"
          :mobile-breakpoint="200"
          dense
          :footer-props="{
            itemsPerPageOptions: [100, 250, { text: 'all', value: -1 }],
            disablePagination: !this.enablePagination,
            disableItemsPerPage: !this.enablePagination,
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
                  <td class="text-left uppercase" style="max-width: 80px">
                    {{ item.symbol }}
                  </td>
                  <td class="hidden-xs-only">
                    <!--                    ${{
                    item.current_price.toLocaleString("en-US", {
                      minimumSignificantDigits: 2,
                      maximumSignificantDigits: 6
                    })
                  }}-->
                    ${{ item.current_price }}
                  </td>
                  <td v-if="item.price_change_percentage_1h_in_currency">
                    <span
                      :class="{
                        positive:
                          item.price_change_percentage_1h_in_currency > 0,
                        negative:
                          item.price_change_percentage_1h_in_currency < 0,
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
                          item.price_change_percentage_24h_in_currency < 0,
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
                          item.price_change_percentage_7d_in_currency < 0,
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
                      <span class="font-weight-bold">Price:</span>
                      ${{ item.current_price }}
                    </p>
                    <p v-if="item.market_cap" class="d-md-none">
                      <span class="font-weight-bold">Market Cap:</span>
                      ${{ item.market_cap.toLocaleString("en-US") }}
                    </p>
                    <p v-else class="d-md-none">
                      <span class="font-weight-bold">Market Cap:</span> 0
                    </p>
                    <p>
                      <span class="font-weight-bold">All-time-High:</span>
                      ${{
                        item.ath.toLocaleString("en-US", {
                          minimumSignificantDigits: 2,
                          maximumSignificantDigits: 6,
                        })
                      }}
                    </p>
                    <p>
                      <span class="font-weight-bold">Date of ATH:</span>
                      {{ formatDate(item.ath_date) }}
                    </p>
                    <p>
                      <span class="font-weight-bold">All-time-Low:</span>
                      ${{
                        item.atl.toLocaleString("en-US", {
                          minimumSignificantDigits: 2,
                          maximumSignificantDigits: 6,
                        })
                      }}
                    </p>
                    <p>
                      <span class="font-weight-bold">Date of ATL:</span>
                      {{ formatDate(item.atl_date) }}
                    </p>
                    <p class="font-weight-bold">
                      WatchList:
                      <v-btn
                        v-if="watchListMode"
                        icon
                        @click="updateWatchList(item.id)"
                      >
                        <v-icon v-if="isOnWatchList(item.id)" color="yellow"
                          >fas fa-star</v-icon
                        >
                        <v-icon v-else color="yellow">far fa-star</v-icon>
                      </v-btn>
                    </p>
                  </td>
                </tr>
              </template>
            </tbody>
          </template>
        </v-data-table>
        <v-btn
          v-if="enablePagination && !isWatchList"
          :loading="btnLoading"
          color="teal"
          class="white--text"
          @click="loadMore"
          >load next 250 coins</v-btn
        >
      </section>
    </section>
    <v-snackbar v-model="snackbar">
      {{ snackBarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import { lsTest } from "@/helpers/localstorage";

export default {
  name: "CoinTable",
  props: {
    perPage: {
      type: Number,
      default: 250,
    },
    page: {
      type: Number,
      default: 1,
    },
    enablePagination: {
      type: Boolean,
      default: true,
    },
    isWatchList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "center",
          sortable: true,
          value: "market_cap_rank",
        },
        {
          text: "Name",
          value: "name",
          class: "hidden-xs-only",
        },
        {
          text: "Symbol",
          value: "symbol",
        },
        {
          text: "Price $",
          align: "right",
          class: "hidden-xs-only",
          value: "current_price",
        },
        {
          text: "1h",
          align: "right",
          value: "price_change_percentage_1h_in_currency",
        },
        {
          text: "24h",
          align: "right",
          value: "price_change_percentage_24h_in_currency",
        },
        {
          text: "7d",
          align: "right",
          value: "price_change_percentage_7d_in_currency",
        },
        {
          text: "Market Cap",
          align: "right",
          class: "hidden-xs-only",
          value: "market_cap",
        },
      ],
      search: "",
      expanded: false,
      loading: true,
      errored: false,
      info: null,
      btnLoading: false,
      internalPerPage: this.perPage,
      internalPage: this.page,
      watchListMode: false,
      watchList: [],
      snackbar: false,
      snackBarText: "empty",
    };
  },
  mounted() {
    this.checkIfWatchList();

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.internalPerPage}&page=${this.internalPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((response) => {
        let watchList = response.data;
        if (this.isWatchList) {
          watchList = watchList.filter((coin) =>
            this.watchList.includes(coin.id)
          );
        }
        this.info = watchList;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    formatDate(date) {
      const newDate = new Date(date);
      return `${newDate.getDate()}.${
        newDate.getMonth() + 1
      }.${newDate.getFullYear()}`;
    },
    setExpanded(item) {
      if (this.expanded === item) {
        this.expanded = false;
      } else {
        this.expanded = item;
      }
    },
    loadMore() {
      this.btnLoading = true;
      this.internalPerPage = 250;
      this.internalPage += 1;
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.internalPerPage}&page=${this.internalPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
        )
        .then((response) => {
          if (response) {
            this.info = this.info.concat(response.data);
          } else {
            this.internalPage = 1;
            console.warn("no more coins found");
          }
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.btnLoading = false));
    },
    checkIfWatchList() {
      this.watchListMode = lsTest();
      const watchList = localStorage.getItem("watchList");
      if (typeof watchList === "string") {
        this.watchList = JSON.parse(watchList);
      }
    },
    isOnWatchList(coinId) {
      if (lsTest()) {
        if (!this.watchList.length) {
          return false;
        }
        if (this.watchList.includes(coinId)) {
          return true;
        }
      }
      return false;
    },
    updateWatchList(coinId) {
      if (lsTest()) {
        const watchList = localStorage.getItem("watchList");
        if (typeof watchList === "string") {
          this.watchList = JSON.parse(watchList);
        }
        if (!this.watchList.length) {
          this.watchList = [coinId];
        } else {
          if (this.watchList.includes(coinId)) {
            this.watchList.splice(this.watchList.indexOf(coinId), 1);
            this.snackBarText = "removed coin from watchlist";
            this.snackbar = true;
          } else {
            this.watchList.push(coinId);
            this.snackBarText = "successfully starred coin";
            this.snackbar = true;
          }
        }
        localStorage.setItem("watchList", JSON.stringify(this.watchList));
      }
    },
  },
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
