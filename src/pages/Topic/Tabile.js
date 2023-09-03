import React, { useEffect, useState } from 'react';

import DataGrid, {
    Column,
    Editing,
    Paging,
  } from 'devextreme-react/data-grid';
  import 'devextreme-react/text-area';
  
  

const Tabile = () => {

    const [employees,setEmployees]=useState()

    useEffect(() => {
        fetch("http://localhost:3001/topic")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setEmployees(data)
          });
      }, []);
      console.log(employees);
    return (
        <div id="data-grid-demo">
        <DataGrid
          dataSource={employees}
          keyExpr="TopicID"
          showBorders={true}
        >
          <Paging enabled={false} />
          <Editing
            mode="form"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true} />
          <Column dataField="Name" />
          <Column dataField="CreatedOn" dataType="date" />
        </DataGrid>
      </div>
    );
};

export default Tabile;