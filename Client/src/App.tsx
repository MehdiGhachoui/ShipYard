import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Error from "./pages/Error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboardLoader,
    action: dashboardAction,
    errorElement: <Error />
  },
]);
function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>

  )
}

export default App
