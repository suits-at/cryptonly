<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Table</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<!--<template>
    <div id="app">
        <v-app>
            <v-navigation-drawer app>Test</v-navigation-drawer>
            <v-toolbar app></v-toolbar>
            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>
            <v-footer app>Copyright 2018</v-footer>
        </v-app>
    </div>
</template>-->
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
