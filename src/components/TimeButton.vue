<template>
  <button :class="{btn: true, 'btn-success': !booked&&!isSelected, 'btn-primary': !booked&&isSelected,  spaced: true, 'btn-danger': booked, disabled: booked}"
          @click="buttonClicked()" :disabled="booked">{{ timeToShow }}
          </button>
</template>

<script>
import {mapGetters} from "vuex";

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
    }
  },
  computed: {
    timeToShow (){
      return `${this.timeSlot.getHours()}h00`;
    },
    ...mapGetters(['selectedValues']),
    isSelected(){
      for(let i=0; i<this.selectedValues.length; i++){
        if(this.timeSlot.getTime() === this.selectedValues[i].getTime()){
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    buttonClicked(){
      //this.touched = !this.isSelected;
      if(!this.isSelected){
        this.$store.commit('PUSH_VALUE', this.timeSlot)
      }else {
        this.$store.commit('REMOVE_VALUE', this.timeSlot)
      }
    }
  }
}
</script>

<style scoped>
.disabled{

}
</style>
