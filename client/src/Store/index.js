import { createStore, action } from 'easy-peasy';

const Store = createStore({
    car: { name:"",color: "", roof: "", wheels: "", interior: "" , price:25000},
    updateRoof:action ((state, payload) => {
      state.car.roof =  payload ;
    }),
    updateColor:action ((state, payload) => {
        state.car.color =  payload ;
      }),
      updateWheels:action ((state, payload) => {
        state.car.wheels =  payload ;
      }),
      updateInterior:action ((state, payload) => {
        state.car.interior =  payload ;
      }),
      updatePrice:action ((state, payload) => {
        state.car.price +=  payload ;
      }),
      updateName:action ((state, payload) => {
        state.car.name =  payload ;
      }),
      resetCar:action((state,payload) =>{
        state.car = {name:"", color: "", roof: "", wheels: "", interior: "" , price:25000}
      }),
  });


export default Store;