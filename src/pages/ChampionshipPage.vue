<template>
  <PageHeader class="header">Данные</PageHeader>
  <p>{{$route.params.type}}</p>
  <RaceTable v-if="$route.params.type === 'race'"></RaceTable>
</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import RaceTable from "@/components/championship/RaceTable";

export default {
  name: "ChampionshipPage",
  components: {
    PageHeader,
    RaceTable
  }
}
</script>

<style scoped>

</style>