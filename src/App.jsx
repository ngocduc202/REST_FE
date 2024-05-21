import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import path from './utils/path'
import { AboutUs, Home, OurEgents, Properties, PublicLayout, Search } from './pages/public'
import { Modal } from './components'
import { useAppStore } from './store/useAppStore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from './store/useUserStore'
import { AdminLayout, CreatePropertyType, Dashboard, ManagePropertyType } from './pages/admin'
const App = () => {
  const { isShowModal } = useAppStore()
  const { getCurrent, getRoles, token } = useUserStore()
  useEffect(() => {
    getCurrent()
    getRoles()
  }, [token])

  return (
    <>
      {isShowModal && <Modal />}
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.OUR_EGENTS} element={<OurEgents />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.SEARCH} element={<Search />} />
        </Route>

        {/* ADMIN ROUTE */}
        <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.CREATE_PROPERTY_TYPE} element={<CreatePropertyType />} />
          <Route path={path.MANAGE_PROPERTY_TYPE} element={<ManagePropertyType />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </>
  )
}

export default App