import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms:[

    ],
    selectedValues: []
  },
  getters: {
    rooms(state) {
      return state.rooms;
    },
    selectedValues(state) {
      return state.selectedValues;
    }
  },
  mutations: {
    SET_ROOMS: (state, rooms) => {
      while(state.rooms.length > 0) {
        state.rooms.pop();
      }
      state.rooms.push(...rooms);
    },
    PUSH_VALUE: (state, value) => {
      state.selectedValues.push(value);
    },
    POP_VALUE: (state) => {
      state.selectedValues.pop();
    },
    REMOVE_VALUE: (state, value) => {
      for( let i = 0; i < state.selectedValues.length; i++){
        if ( state.selectedValues[i].getTime() === value.getTime()) {
          state.selectedValues.splice(i, 1);
        }
      }
    },
    EMPTY_VALUES: (state) => {
      while (state.selectedValues.length > 0){
        state.selectedValues.pop();
      }
    }
  },
  actions: {
    setAllRooms({ commit }) {
      axios.get(process.env.VUE_APP_API_URL + "rooms/")
          .then(response => commit('SET_ROOMS', response.data.rooms));
    },
    setRoomsFilteredByName({ commit }, filter){
      console.log("Dans le filter by name \n");
      console.log(filter);
      let url = process.env.VUE_APP_API_URL + 'rooms/'
      const filterTrim =  filter.trim();
      if(filterTrim.length){
        url += 'name/'
      }
      axios.get( url + filterTrim)
          .then(response => commit('SET_ROOMS', response.data.rooms));
    },

    setRoomsFilteredByEquipement({ commit }, filter){
      console.log("Dans le filter by equipment \n");
      console.log(filter);
      let url = process.env.VUE_APP_API_URL + 'rooms/'
      const filterTrim =  filter.trim();
      if(filterTrim.length){
        url += 'equipement/'
      }
      axios.get( url + filterTrim)
          .then(response => commit('SET_ROOMS', response.data.rooms));
    },

    setRoomsFiltered({commit}, payload){
      const data = {
        name: payload.name.trim(),
        equipement: payload.equipement,
        capacity: payload.capacity ? payload.capacity : 0,
        date: payload.date
      };
      axios.post( process.env.VUE_APP_API_URL + 'rooms/filter', data)
          .then(response => commit('SET_ROOMS', response.data.rooms));
    }
  },
  modules: {
  }
})
