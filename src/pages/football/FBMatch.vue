<template>
  <div class="match_wrapper">
    <PageHeader class="header">Матч № {{$route.params.number}}</PageHeader>
    <span>FB Game event{{$route.params.event}}</span><br>
    <span>FB Game number{{$route.params.number}}</span>
  </div>

</template>

<script>
import PageHeader from "@/components/main/PageHeader";

export default {
  name: "FBMatch",
  components: {
    PageHeader
  }
}
</script>

<style scoped>

</style>