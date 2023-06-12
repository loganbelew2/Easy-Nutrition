import { Outlet, Route, Router, Routes } from "react-router-dom"

export const ApplicationViews = () => {

      return (
          <Routes>
              <Route path="/" element={
                  <>
                      <h1>Easy Nutrition</h1>
                      <div>Start your nutrition journey today!</div>
  
                      <Outlet />
                  </>
              }>
                

              </Route>
          </Routes>
      )
  }
  