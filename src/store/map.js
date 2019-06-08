const state = {
    location: {},
    address: '定位中...',
    city: ''
}
const getters = {

}
const mutations = {
    setLocation (state, location){
        if(location) {
            state.location = location;
        }else{
            state.location = null;
        }
    },
    setAddress(state, address){
        if(address){
            state.address = address;
        }else{
            state.address = '定位中...'
        }
    },
    changeCity(state, val){
        state.city = val
    }

}
const actions = {

}
export default {namespaced: true, state, getters, mutations, actions}