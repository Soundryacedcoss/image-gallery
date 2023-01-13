import { configureStore } from "@reduxjs/toolkit";
import slice from './Slice/DataSlice'
const store =configureStore({
        reducer:{
            DataSlice:slice,
        }
})
export default store