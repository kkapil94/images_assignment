import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/users/userSlice'
import imagesReducer from './features/images/imageSlice'

export default configureStore({
    reducer:{
        user:userReducer,
        images:imagesReducer
    }
})