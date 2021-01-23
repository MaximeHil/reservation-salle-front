<template>
  <div class="booking">
    <h2>Réservation de la salle : {{ $route.query.name }}</h2>
    <br>
    <div class="greyBack">
      <h3 style="margin-bottom: 10px">Choisissez le jour : </h3>
      <datepicker v-model="date" @closed="pickerClosed" :disabled-dates="disabledDates"></datepicker>
      <br>
      <br>
      <h3 style="margin-bottom: 10px">Choisissez le créneau (2h) : </h3>
      <TimeButton :key="slot.getHours()" v-for="slot in slots"
              :timeSlot="slot"
              :booked="isAlreadyBooked(slot)"/>
      <br>
    </div>
    <button class="btn btn-danger" @click="goBack()">Retour</button>
    <button class="btn btn-primary spaced" style="margin-left: 15em"
            @click="bookTheRoom" :disabled="!this.selectedValues.length > 0">Valider</button>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import axios from "axios";
import TimeButton from "@/components/TimeButton";
import Vue from 'vue';
import VueToasted from 'vue-toasted';
import {mapGetters} from "vuex";

Vue.use(VueToasted, {
  iconPack : 'material' // set your iconPack, defaults to material. material|fontawesome|custom-class
});

export default {
  name: 'Booking',
  components: {
    TimeButton,
    Datepicker
  },
  data: function(){
    return {
      reservations: [],
      date: new Date(),
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      },
      slots: [],
      current: new Date()
    }
  },
  beforeCreate() {
    axios.post(process.env.VUE_APP_API_URL + "rooms/reservations", {name: this.$route.query.name})
        .then(response => this.reservations = response.data.reservations);
  },
  mounted(){
    this.changeSlots();
  },
  computed: {
    ...mapGetters(['selectedValues'])
  },
  methods: {
    goBack(){
      this.$store.commit('EMPTY_VALUES');
      this.$router.back();
    },
    pickerClosed(){
      this.$store.commit('EMPTY_VALUES');
      this.changeSlots();
    },
    changeSlots(){
      while(this.slots.length > 0){
        this.slots.pop();
      }

      let newDate = new Date(this.date);
      newDate.setHours(8);
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      for(let i = 0; i<6; i++){
        this.slots.push(new Date(newDate));
        newDate.setHours(newDate.getHours() + 2);
      }
    },
    isAlreadyBooked(time){
      if(this.reservations && this.reservations.length>0){
        for(let i =0; i<this.reservations.length; i++){
          if(time.getTime() === new Date(this.reservations[i].begin).getTime() ){
            return true;
          }
        }
      }
      return false;
    },
    bookTheRoom(){
      for(let i = 0; i<this.selectedValues.length; i++){
        const beginValue = new Date(this.selectedValues[i]);
        let endValue = new Date(beginValue);
        endValue.setHours(beginValue.getHours()+1);
        endValue.setMinutes(beginValue.getMinutes()+59);
        endValue.setSeconds(beginValue.getSeconds()+59);
        const data = {
          reservation: {
            roomName: this.$route.query.name,
            begin: beginValue,
            end: endValue
          }
        }
        axios.post(process.env.VUE_APP_API_URL + 'rooms/reservation', data)
          .then(response => {
            console.log(response);
            if(i === this.selectedValues.length-1){
              this.$router.replace('/');
              this.$toasted.success('Réservation faite !', {
                action: {
                  text : 'Fermer',
                  onClick : (e, toastObject) => {
                    toastObject.goAway(0);
                  }
                },
                position: "bottom-center",
                duration: 5000
              });
              this.$store.commit('EMPTY_VALUES');
            }
          })
          .catch(error => console.log(error));
      }
    }
  }
}
</script>

<style scoped>
.booking{
  margin-left: 15rem;
}

.greyBack {
  background: #f2f2f2;
  border: 1px solid #ddd;
  padding: 1em 1em 1em;
  margin-bottom: 2em;
  width: 25em;
}

.spaced{
  margin: 1em;
  width: 5em;
}


</style>
