<template>
  <button class="btn btn-success spaced" @click="buttonClicked()">{{ timeToShow }}</button>
</template>

<script>
export default {
  name: "TimeButton",
  props: {
    timeSlot: {
      type: Date,
      required: true
    }
  },
  computed: {
    timeToShow (){
      return `${this.timeSlot.getHours()}h00`;
    }
  },
  methods: {
    buttonClicked(){
      console.log(this.timeSlot);
    }
  }
}
</script>

<style scoped>

</style>
