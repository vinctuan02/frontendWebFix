import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { routes } from './routes'
import { isJsonString } from './utils'
import jwt_decode from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/userSlide'
import axios from 'axios'

function App() {
  const dispatch = useDispatch();

  axios.interceptors.request.use(async (config) => {
    // Do something before request is sent
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  useEffect(() => {
    let storageData = localStorage.getItem('access_token')
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      const decoded = jwt_decode(storageData)
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData)
      }
    }
  }, [])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App