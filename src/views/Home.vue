<template>
  <div class="home">
    <form @submit="checkForm">
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="inputName">Nom</label>
          <input type="text" class="form-control" id="inputName" v-model="nameFilter">
        </div>
        <div class="form-group col-md-3">
          <label for="inputEquipement">Equipement</label>
          <select id="inputEquipement" class="form-control" v-model="equipementFilter">
            <option></option>
            <option >TV</option>
            <option >Retro projecteur</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="inputCapacity">Capacité minimale</label>
          <input type="number" class="form-control" id="inputCapacity" min="0" v-model="capacityFilter">
        </div>
        <div class="form-group col-md-2">
          <label for="inputDate">Jour</label>
          <input type="date" class="form-control" id="inputDate" v-model="dateFilter" :min="currentDate">
        </div>
        <div v-show="dateFilter" class="form-group col-md-2">
          <label for="inputTime">Horaire</label>
          <select id="inputTime" class="form-control" v-model="timeFilter" :required="dateFilter">
            <TimeOption v-for="slot in slots"
                    :key="slot.getHours()"
                    :timeSlot="slot">
            </TimeOption>
          </select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Filtrer</button>
    </form>

    <div class="card-deck">
      <RoomCardItem v-for="room in rooms"
                    :key="room.name"
                    :name="room.name"
                    :description="room.description"
                    :capacity="room.capacity"
                    :equipements="room.equipements"/>
    </div>
    <!--<ul class="list-group">
    <RoomItem v-for="room in rooms"
    :key="room.name"
    :name="room.name"
    :description="room.description"
    :capacity="room.capacity"
    :equipements="room.equipements"/>
    </ul>-->
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
import RoomCardItem from "@/components/RoomCardItem";
import TimeOption from "@/components/TimeOption";

export default {
  name: 'Home',

  data: function () {
    return {
      nameFilter: '',
      equipementFilter: '',
      capacityFilter: 0,
      dateFilter: null,
      timeFilter: null,
      slots: []
    }
  },
  components: {
    TimeOption,
    //RoomItem,
    RoomCardItem
  },
  methods: {
    ...mapActions(['setAllRooms', 'setRoomsFiltered']),
    checkForm: function (e){
      e.preventDefault();
      let newDate;
      if(this.dateFilter){
        newDate = new Date(this.dateFilter);
        newDate.setHours(this.timeFilter.getHours());
      }
      const payload = {
        name: this.nameFilter,
        equipement: this.equipementFilter,
        capacity: this.capacityFilter,
        date: newDate ? newDate : undefined
      }
      this.setRoomsFiltered(payload);
    },
    changeSlots(){
      while(this.slots.length > 0){
        this.slots.pop();
      }

      let newDate = new Date(this.dateFilter);
      newDate.setHours(8);
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      for(let i = 0; i<6; i++){
        this.slots.push(new Date(newDate));
        newDate.setHours(newDate.getHours() + 2);
      }
    },
  },
  computed: {
    ...mapGetters(['rooms']),
    currentDate(){
      let d = new Date(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return `${year}-${month}-${day}`
    }
  },
  mounted() {
    if(this.rooms.length === 0){
      this.setAllRooms();
    }
    this.changeSlots()
  },
}
</script>

<style scoped>
.card-deck {
  margin-top: 2%;
}

</style>
