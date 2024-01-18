import {BrowserRouter, Route, Routes} from "react-router-dom"
import TodoCreate from "../page/app/todo-create.page"
import TodoList from "../page/app/todo-list.page"
import TodoUpdate from "../page/app/todo-update.page"
export const Routing = ()=>{
    return (<>
        <BrowserRouter>
            <Routes>
                <Route index element={<TodoList/>}/>
                <Route path="/create" element={<TodoCreate/>}/>
                <Route path="/:id" element={<TodoUpdate/>}/>
            </Routes>
        </BrowserRouter>
    </>)
}

