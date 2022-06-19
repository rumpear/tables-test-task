import * as React from 'react';
import { MainTable } from './MainTable';
import { Route, Routes } from 'react-router-dom';
import { PopupTable } from './PopupTable';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainTable />} />
        <Route path="popup-table" element={<PopupTable />} />
      </Routes>
    </>
  );
};
