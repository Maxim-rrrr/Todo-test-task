import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Main from "./Main";
import AdminRouter from "./Admin/router"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={ <AdminRouter/> } />

        <Route path="/*" element={ <Main/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
