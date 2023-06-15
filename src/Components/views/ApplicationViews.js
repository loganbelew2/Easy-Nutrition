import { Outlet, Route, Router, Routes } from "react-router-dom"
import { FoodContainer } from "../food/FoodContainer"
import { CreateList } from "../Lists/createList"
import { FoodList } from "../Lists/FoodList"

export const ApplicationViews = () => {

      return (
          <Routes>
              <Route path="/" element={
                  <>
                      <h1>Easy Nutrition</h1>
                     
  
                      <Outlet />   
                  </>
              }>
                <Route path="searchFood" element={< FoodContainer/>} />
                <Route path="createList" element={<CreateList/>} />
                <Route path="foodLists" element={<FoodList />} />
              </Route>
          </Routes>
      )
  }
  