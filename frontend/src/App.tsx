
import { lazy, Suspense } from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
const SenderPage = lazy(()=>import('./pages/Sender'))
const ReceiverPage = lazy(()=>import('./pages/Receiver'))
function App() {
  return (
    <>
       <Router>
        <Routes>
          <Route path="/sender" element={<Suspense><SenderPage/></Suspense>}/>
          <Route path="/receiver" element={<Suspense><ReceiverPage/></Suspense>}/>
        </Routes>
       </Router>

    </>
  )
}

export default App
