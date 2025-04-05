import Header from '../components/common/Header'
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-white ">
      {/* Header */}
     
      <div className="fixed top-0 z-50 w-full">
        <Header />
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Index