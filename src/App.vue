<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer fixed v-model="drawer" app>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-btn icon to="/profile">
                <v-icon color="teal">fas fa-user-circle</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                ><router-link to="/profile"
                  >Profile</router-link
                ></v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-btn icon to="/settings">
                <v-icon color="teal">fas fa-cog</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title color="teal"
                ><router-link to="/settings"
                  >Settings</router-link
                ></v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-btn icon to="/about">
                <v-icon color="teal">fas fa-info-circle</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                ><router-link to="/about">About</router-link></v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="teal" dark fixed app>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title>cryptonly</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn
          icon
          href="https://github.com/suits-at/cryptonly"
          target="_blank"
        >
          <v-icon>fab fa-github</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-content>
      <v-footer app
        ><v-bottom-nav
          :active.sync="bottomNav"
          :color="color"
          :value="true"
          absolute
          dark
          shift
        >
          <v-btn dark to="/">
            <span>Overview</span>
            <v-icon>fas fa-home</v-icon>
          </v-btn>

          <v-btn dark to="/watchlist">
            <span>Watchlist</span>
            <v-icon>fas fa-eye</v-icon>
          </v-btn>

          <v-btn dark to="/portfolio">
            <span>Portfolio</span>
            <v-icon>fas fa-chart-bar</v-icon>
          </v-btn>
        </v-bottom-nav></v-footer
      >
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      bottomNav: 3
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
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
aside a,
.v-content a {
  color: #009688;
  text-decoration: none;
}
</style>
