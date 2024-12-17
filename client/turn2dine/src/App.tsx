import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./pages/auth-pages/layout"
import Dashboard from "./pages/auth-pages/dashboard/page"
import Orders from "./pages/auth-pages/orders/page"
import SingleOrder from "./pages/auth-pages/orders/[orderid]/page"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='orders' element={<Orders />} />
            <Route path="orders/:id" element={<SingleOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
