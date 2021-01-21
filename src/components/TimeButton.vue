<template>
  <button :class="{btn: true, 'btn-success': !booked&&!isSelected, 'btn-primary': !booked&&isSelected,  spaced: true, 'btn-danger': booked, disabled: booked}"
          @click="buttonClicked()" :disabled="booked">{{ timeToShow }}
          </button>
</template>

<script>
export default {
  name: "TimeButton",
  props: {
    timeSlot: {
      type: Date,
      required: true
    },
    booked: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      isSelected: false
    }
  },
  computed: {
    timeToShow (){
      return `${this.timeSlot.getHours()}h00`;
    }
  },
  methods: {
    buttonClicked(){
      this.isSelected = !this.isSelected;
      if(this.isSelected){
        this.$emit('addTimeToList', { time: this.timeSlot })
      }else {
        this.$emit('removeTimeFromList', {time: this.timeSlot})
      }
    }
  }
}
</script>

<style scoped>
.disabled{

}
</style>
