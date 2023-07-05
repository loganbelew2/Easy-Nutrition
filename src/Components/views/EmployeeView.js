import { Outlet, Route, Routes } from "react-router-dom"
import { FoodContainer } from "../food/FoodContainer"
import { CreateList } from "../Lists/createList"
import { FoodList } from "../Lists/FoodList"
import { UpdateUser } from "../user/UpdateUser"
import { SelectedList } from "../Lists/SelectedList"

export const EmployeeView = () => {
    
      return (
          <Routes>
              <Route path="/" element={
                  <>
                      <h1>Easy Nutrition</h1>
                     
  
                      <Outlet />   
                  </>
              }>
                <Route path="createList" element={<CreateList/>} />
                <Route path="searchFood" element={< FoodContainer/>} />
                <Route path="foodLists" element={<FoodList />} />
                <Route path="updateUser" element={<UpdateUser />} />
                <Route path="selectedList/:{listId}" element={<SelectedList/>} />

              </Route>
          </Routes>
      )
  }
  