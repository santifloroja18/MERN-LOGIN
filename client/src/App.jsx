import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/tasks" element={<h1>Tasks Page</h1>} />
          <Route path="/add-task" element={<h1>New Task</h1>} />
          <Route path="/task/:id" element={<h1>Update Task</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App