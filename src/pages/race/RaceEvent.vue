<template>
  <PreLoader v-if="this.matchLoading"></PreLoader>
  <div v-else class="event_wrapper">
    <PageHeader class="header">Соревнование</PageHeader>
    <SectionRace
        v-for="(arrSection, index) in arMatches"
        :arMatches="arrSection"
        :key=index
    ></SectionRace>
  </div>
</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import PreLoader from "@/components/main/PreLoader";
import SectionRace from "@/components/race/SectionRace";

export default {
  name: "F1raceEvent",
  components: {
    SectionRace,
    PageHeader,
    PreLoader,

  }
}
</script>

<style lang="less" scoped>

</style>