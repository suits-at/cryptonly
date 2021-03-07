<template>
  <section class="top100">
    <CoinTable :per-page="100" :enable-pagination="false" />
  </section>
</template>

<script>
import CoinTable from "../components/CoinTable";

export default {
  name: "Top100",
  components: { CoinTable }
};
</script>
