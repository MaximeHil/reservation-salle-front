<template>
  <div class="booking">
    <button class="btn btn-danger" @click="$router.back()">Retour</button>
    <br>
    <br>
    <h2>Réservation de la salle : {{ $route.params.name }}</h2>
    <br>
    <div class="greyBack">
      <h3 style="margin-bottom: 10px">Choisissez le jour : </h3>
      <datepicker v-model="date" @closed="pickerClosed" :disabled-dates="disabledDates"></datepicker>
      <br>
      <br>
      <h3 style="margin-bottom: 10px">Choisissez le créneau (2h) : </h3>
      <TimeButton :key="slot.getHours()" v-for="slot in slots"
              class="btn btn-success spaced"
              :timeSlot="slot"/>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import axios from "axios";
import TimeButton from "@/components/TimeButton";

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
        days: [6, 0]
      },
      slots: []
    }
  },
  beforeCreate() {
    axios.post(process.env.VUE_APP_API_URL + "rooms/reservations", {name: this.$route.params.name})
        .then(response => this.reservations = response.data.reservations);
  },
  mounted(){
    let newDate = new Date(this.date);
    newDate.setHours(8);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    for(let i = 0; i<6; i++){
      this.slots.push(new Date(newDate));
      newDate.setHours(newDate.getHours() + 2);
    }
  },
  methods: {
    pickerClosed(){
      console.log(this.date);
      let newDate = this.date;
      newDate.setHours(10);
      newDate.setMinutes(0);
      newDate.setMilliseconds(0);
      newDate.setSeconds(0);
      console.log(newDate)
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
