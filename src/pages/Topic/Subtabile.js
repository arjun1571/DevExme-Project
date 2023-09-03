import React, { useEffect, useState } from 'react';

import DataGrid, {
  Column,
  Editing,
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';


const Subtabile = () => {


    const [customers, setCustomers] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3001/topic')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCustomers(data);
        });
    }, []);
  const [autoExpandAll] = useState(true);


  return (
    <div>
      <DataGrid
        dataSource={customers}
        keyExpr="TopicID"
        allowColumnReordering={true}
        showBorders={true}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} />
        <Grouping autoExpandAll={autoExpandAll} />
        <Paging defaultPageSize={10} />

        <Editing mode="form" allowUpdating={true} allowAdding={true} allowDeleting={true} />
        <Column dataField="Name" />
        <Column dataField="CreatedOn" dataType="date" />
        <Editing mode="form" allowUpdating={true} allowAdding={true} allowDeleting={true} />

      </DataGrid>

    </div>
  );
};

export default Subtabile;
