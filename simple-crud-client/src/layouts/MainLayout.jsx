import React from 'react';

import Header from '../components/header';
import { Outlet } from 'react-router-dom';


export const MainLayout = () => {
  return (
    <div>
        <Header></Header>
        <Outlet></Outlet>
    </div>
  )
}
