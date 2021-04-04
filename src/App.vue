<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer fixed v-model="drawer" app>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-btn icon to="/top100">
                <v-icon color="teal">fas fa-trophy</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                ><router-link to="/top100"
                  >Top 100</router-link
                ></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-action>
              <v-btn icon to="/profile">
                <v-icon color="teal">fas fa-user-circle</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                ><router-link to="/profile"
                  >Profile</router-link
                ></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-action>
              <v-btn icon to="/settings">
                <v-icon color="teal">fas fa-cog</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title color="teal"
                ><router-link to="/settings"
                  >Settings</router-link
                ></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-action>
              <v-btn icon to="/about">
                <v-icon color="teal">fas fa-info-circle</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                ><router-link to="/about">About</router-link></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar color="teal" dark fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title>cryptonly</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          href="https://github.com/suits-at/cryptonly"
          target="_blank"
        >
          <v-icon>fab fa-github</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
      <v-footer app color="teal" padless
        ><v-bottom-navigation
          v-model="bottomNav"
          :background-color="color"
          shift
          app
        >
          <v-btn to="/">
            <span class="white--text">Ticker</span>
            <v-icon color="white">fas fa-home</v-icon>
          </v-btn>

          <v-btn to="/watchlist">
            <span class="white--text">Watchlist</span>
            <v-icon color="white">fas fa-eye</v-icon>
          </v-btn>

          <v-btn dark to="/portfolio">
            <span class="white--text">Portfolio</span>
            <v-icon color="white">fas fa-chart-bar</v-icon>
          </v-btn>
        </v-bottom-navigation></v-footer
      >
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      bottomNav: 3,
    };
  },
  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          return "teal";
        case 1:
          return "blue-grey";
        case 2:
          return "indigo";
        default:
          return "teal";
      }
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
.v-application .v-navigation-drawer a {
  color: #009688;
  text-decoration: none;
}
</style>
