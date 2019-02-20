<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer fixed v-model="drawer" app>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>fas fa-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                ><router-link to="/">Overview</router-link></v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>fas fa-eye</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                ><router-link to="/">Watchlist</router-link></v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>fas fa-chart-bar</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                ><router-link to="/">Portfolio</router-link></v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>fas fa-user-circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                ><router-link to="/">Profile</router-link></v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>fas fa-cog</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                ><router-link to="/">Settings</router-link></v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>fas fa-envelope</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                ><router-link to="/about">About</router-link></v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="teal" dark fixed app>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title
          >cryptonly
          <a href="https://github.com/suits-at/cryptonly-vue" target="_blank"
            ><v-icon>fab fa-github</v-icon></a
          ></v-toolbar-title
        >
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <router-view />
        </v-container>
      </v-content>
      <v-footer color="teal" app inset>
        <span class="white--text pl-3">
          made with <v-icon class="white--text">fas fa-heart fa-1x</v-icon> by
          <a class="white--text" href="https://www.suits.at">SUITS</a>
        </span>
        <v-spacer />
        <span class="white--text pr-3">&copy; 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
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

#nav {
  margin-top: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
