<template>
  <section>
    <CoinTable :is-watch-list="true" />
  </section>
</template>

<script>
import CoinTable from "../components/CoinTable";

export default {
  name: "WatchList",
  components: { CoinTable },
};
</script>
