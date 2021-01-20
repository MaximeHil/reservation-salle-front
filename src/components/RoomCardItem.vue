<template>
  <div class="card mb-3">
    <div class="card-header text-center">
      <h4><b>{{ name }}</b></h4>
    </div>
    <div class="card-body ">
      <p class="card-text"><b>Description :</b> <br>{{ description }}</p>
      <p class="card-text"><b>Capacité :</b> {{ capacity }}</p>
      <p v-if="equipements && equipements.length > 0">
        <b>Equipement :</b> <br>
      <span v-for="equipement in equipements"
            :key="equipement.name"
      >{{ equipement.name }} - </span>
      </p>

    </div>
    <div class="card-footer text-center">
      <button class="btn btn-primary">Reserver</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomCardItem",
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    equipements: {
      type: Array,
    }
  }
}
</script>

<style scoped>

.card{
  min-width: 16rem;
  max-width: 16rem;
}


</style>
