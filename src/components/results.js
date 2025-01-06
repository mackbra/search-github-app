import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';

function ResultsGrid(props) {
  const columns = [
    { key: 'login', name: 'Name'},
    { key: 'blog', name: 'Age' },
  ];
  const gridStyle = { minHeight: 550 };
  const { state } = useLocation();
  const { rows } = state.userName;
    return  (
      <div>
         <DataGrid columns={columns} rows={rows} />
      </div>
    );

}

export default () => <ResultsGrid/>;