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

export default {
  name: 'Home',

  data: function () {
    return {
      nameFilter: '',
      equipementFilter: '',
      capacityFilter: 0
    }
  },
  components: {
    //RoomItem,
    RoomCardItem
  },
  methods: {
    ...mapActions(['setAllRooms', 'setRoomsFiltered']),
    checkForm: function (e){
      e.preventDefault();
      const payload = {
        name: this.nameFilter,
        equipement: this.equipementFilter,
        capacity: this.capacityFilter
      }
      this.setRoomsFiltered(payload);
    }
  },
  computed: {
    ...mapGetters(['rooms'])
  },
  mounted() {
    if(this.rooms.length === 0){
      this.setAllRooms();
    }
  },
}
</script>

<style scoped>
.card-deck {
  margin-top: 2%;
}

</style>
