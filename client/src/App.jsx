import {Outlet, createBrowserRouter} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Navbar from "./component/Navbar"
import HomePage from "./pages/HomePage";
import ImagePage from "./pages/ImagePage";

const AppLayout = ()=>{
  return(
    <>
      <Navbar/>
      <Outlet/>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"/login",
        element:<SignIn/>
      },
      {
        path:"/register",
        element:<SignUp/>
      },
      {
        path:"/image/:imgId",
        element:<ImagePage/>
      }
    ]
  }
])

export default router
