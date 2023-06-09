import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { ProjectDetails, CreateProject, Profile, Home } from './pages';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#4e0536] min-h-screen flex flex-row">
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar />


        {/*To specify each individual page that will be on the application*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create_project' element={<CreateProject />} />
          <Route path='/project-details/:id' element={<ProjectDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App