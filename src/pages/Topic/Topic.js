import React, { useState } from "react";
import "../../pages/Topic/Topic.scss";
import DataGrid, { Column, Editing } from "devextreme-react/data-grid";
import { LoadPanel } from "devextreme-react/load-panel";
import "whatwg-fetch";

import reducer from "../../../src/reducer";
import {
  saveChange,
  loadOrders,
  setChanges,
  setEditRowKey,
} from "../../../src/actions";

const initialState = {
  data: [],
  changes: [],
  editRowKey: null,
  isLoading: false,
};

const loadPanelPosition = { of: "#gridContainer" };

const Topic = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const changesText = React.useMemo(
    () =>
      JSON.stringify(
        state.changes.map((change) => ({
          type: change.type,
          key: change.type !== "insert" ? change.key : undefined,
          data: change.data,
        })),
        null,
        " "
      ),
    [state.changes]
  );

  React.useEffect(() => {
    loadOrders(dispatch);
  }, []);

  const onSaving = React.useCallback((e) => {
    e.cancel = true;
    e.promise = saveChange(dispatch, e.changes[0]);
  }, []);

  const onChangesChange = React.useCallback((changes) => {
    setChanges(dispatch, changes);
  }, []);

  const onEditRowKeyChange = React.useCallback((editRowKey) => {
    setEditRowKey(dispatch, editRowKey);
  }, []);

  const [listData, setListData] = useState();
  const handleList = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const date = new Date();
    setListData(name, date);

    console.log(name, date);
    event.target.reset();
  };

  return (
    <div className="lg:p-10 md:p-5 p-3  h-[100vh]">
      <div className="mt-5 lg:mx-60 md:mx-12 flex justify-around items-center">
        {listData}
        <div>
          <p className="text-4xl font-bold">Create Topic</p>
        </div>
        {/* Open the modal using ID.showModal() method */}
        <button
          className="btn btn-primary btn-outline btn-sm"
          onClick={() => window.my_modal_2.showModal()}
        >
          Create
        </button>
        <dialog id="my_modal_2" className="modal">
          <form onSubmit={handleList} method="dialog" className="modal-box">
            <p className="font-bold text-lg">Create a topic list</p>
            <p className="my-2 mx-6 mt-5">Topic Name</p>
            <input
              name="name"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl"
            />
            <input
              className="btn w-40 flex mx-auto btn-active btn-sm my-2 btn-primary mt-10"
              type="submit"
              value={"submit"}
            />
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* You can open the modal using ID.showModal() method */}
        {/* <button
          className="btn btn-outline btn-primary btn-sm"
          onClick={() => window.my_modal_3.showModal()}
        >
          Create
        </button>
        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <p className="font-bold text-lg">Create a topic list</p>
            <p className="my-2 mx-6 mt-5">Topic Name</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl"
            />
            <button className="btn w-40 flex mx-auto btn-active btn-sm my-2 btn-primary mt-10">Submit</button>
          </form>
        </dialog> */}
      </div>

      <div className="mt-5 lg:mx-60 md:mx-12">
        <div class="md:w-3/3 py-3">
          <React.Fragment>
            <LoadPanel position={loadPanelPosition} visible={state.isLoading} />
            <DataGrid
              id="gridContainer"
              keyExpr="OrderID"
              dataSource={state.data}
              showBorders
              repaintChangesOnly
              onSaving={onSaving}
            >
              <Editing
                mode="row"
                allowAdding
                allowDeleting
                allowUpdating
                changes={state.changes}
                onChangesChange={onChangesChange}
                editRowKey={state.editRowKey}
                onEditRowKeyChange={onEditRowKeyChange}
              />
              <Column dataField="OrderID" allowEditing={false}></Column>
              <Column dataField="ShipName"></Column>
              <Column dataField="ShipCountry"></Column>
              <Column dataField="ShipCity"></Column>
              <Column dataField="ShipAddress"></Column>
              <Column dataField="OrderDate" dataType="date"></Column>
              {/* <Column dataField="Freight"></Column> */}
            </DataGrid>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default Topic;
