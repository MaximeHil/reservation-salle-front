<template>
  <option :value="timeSlot">{{ timeToShow }}</option>
</template>

<script>
export default {
  name: "TimeOption",
  date: function(){
    return {
      timeSlot: new Date()
    }
  },
  props: {
    timeSlot: {
      type: Date,
      required: true
    },
  },
  computed: {
    timeToShow (){
      return `${this.timeSlot.getHours()}h00`;
    }
  }
}
</script>

<style scoped>

</style>
