<template>
  <div class="booking">
    <button class="btn btn-danger" @click="$router.back()">Retour</button>
    <h3>Réservation de la salle : {{ $route.params.name }}</h3>
  </div>
</template>

<script>


export default {
  name: 'Booking',
  data: function(){
    return {
      Reservations: []
    }
  },
  mounted(){
    console.log(this.$route.params)
  }
}
</script>

<style scoped>


</style>
