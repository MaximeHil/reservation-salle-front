<template>
  <li class="list-group-item">
    <h4>Nom de la salle : {{ name }}</h4>
    <p>Description : {{ description }}</p>
    <p>Capacité : {{ capacity }}</p>
    <p v-if="equipements && equipements.length > 0">
      <span v-for="equipement in equipements"
      :key="equipement.name"
      >{{ equipement.name }} - </span>
    </p>
  </li>
</template>

<script>
export default {
name: "RoomItem",
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

</style>
