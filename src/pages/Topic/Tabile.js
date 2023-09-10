import React, { useEffect, useState } from "react";
import DataGrid, {
  Column,
  Export,
  GroupPanel,
  Grouping,
  SortByGroupSummaryInfo,
  SearchPanel,
} from "devextreme-react/data-grid";
import { jsPDF } from "jspdf";
import { exportDataGrid } from "devextreme/pdf_exporter";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es"; // Use 'file-saver-es' as you mentioned
import { exportDataGrid as exportDataGridExcel } from "devextreme/excel_exporter";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";


const exportFormats = ["pdf", "xlsx"]; // Add both export formats

function Tabile() {
  const [topic, setTopic] = useState([]);
  const navigate = useNavigate()


  // DATE CONVERTION
  let date = new Date();
  let c = date.getHours();
  let d = date.getMinutes();
  let date1 = date.toString();
  let date2 = date1.split(" ");
  const finaldate = date2.slice(1, 4);
  const fullFinalData = finaldate.join("-");

  const YYYY_MM_DD_Formater = (date, format = "YYYY-MM-DD") => {
    const t = new Date(date);
    const y = t.getFullYear();
    const m = ("0" + (t.getMonth() + 1)).slice(-2);
    const d = ("0" + t.getDate()).slice(-2);
    return format.replace("YYYY", y).replace("MM", m).replace("DD", d);
  };
  const formateDate = YYYY_MM_DD_Formater(fullFinalData);

  // FECTCH TEH TOPIC DATA
  useEffect(() => {
    fetch("http://localhost:3000/topic")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTopic(data);
      });
  }, []);

  // deltete function

  const handleDeleteClick = (e) => {
    const topicIdToDelete = e.data.TopicID;
    console.log(topicIdToDelete);
    fetch(`http://localhost:3000/topic/${topicIdToDelete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Data deleted successfully");
        const updatedTopic = topic.filter(
          (item) => item.TopicID !== topicIdToDelete
        );
        setTopic(updatedTopic);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };



  // handleUpdate
  const handleUpdate = (e) => {
    const topicIDToUpdate = e.data.TopicID;
    console.log(topicIDToUpdate);
    navigate(`/topic/topicFrom?id=${topicIDToUpdate}`)
  };

  const onExporting = (e) => {
    if (e.format === "pdf") {
      const doc = new jsPDF();

      exportDataGrid({
        jsPDFDocument: doc,
        component: e.component,
        columnWidths: [40, 40, 30, 30, 40],
        customizeCell({ gridCell, pdfCell }) {
          if (
            gridCell.rowType === "data" &&
            gridCell.column.dataField === "Phone"
          ) {
            pdfCell.text = pdfCell.text.replace(
              /(\d{3})(\d{3})(\d{4})/,
              "($1) $2-$3"
            );
          } else if (gridCell.rowType === "group") {
            pdfCell.backgroundColor = "#BEDFE6";
          } else if (gridCell.rowType === "totalFooter") {
            pdfCell.font.style = "italic";
          }
        },
        customDrawCell(options) {
          const { gridCell, pdfCell } = options;

          if (
            gridCell.rowType === "data" &&
            gridCell.column.dataField === "Website"
          ) {
            options.cancel = true;
            doc.setFontSize(11);
            doc.setTextColor("#0000FF");

            const textHeight = doc.getTextDimensions(pdfCell.text).h;
            doc.textWithLink(
              "website",
              options.rect.x + pdfCell.padding.left,
              options.rect.y + options.rect.h / 2 + textHeight / 2,
              { url: pdfCell.text }
            );
          }
        },
      }).then(() => {
        doc.save(`topic-${formateDate}-${c}.${d}.pdf`);
      });
    } else if (e.format === "xlsx") {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("topic");

      worksheet.columns = [
        { width: 5 },
        { width: 30 },
        { width: 25 },
        { width: 15 },
        { width: 25 },
        { width: 40 },
      ];

      exportDataGridExcel({
        component: e.component,
        worksheet,
        keepColumnWidths: false,
        topLeftCell: { row: 2, column: 2 },
        customizeCell: ({ gridCell, excelCell }) => {
          if (gridCell.rowType === "data") {
            if (gridCell.column.dataField === "Phone") {
              excelCell.value = parseInt(gridCell.value, 10);
              excelCell.numFmt = "[<=9999999]###-####;(###) ###-####";
            }
            if (gridCell.column.dataField === "Website") {
              excelCell.value = {
                text: gridCell.value,
                hyperlink: gridCell.value,
              };
              excelCell.font = { color: { argb: "FF0000FF" }, underline: true };
              excelCell.alignment = { horizontal: "left" };
            }
          }
          if (gridCell.rowType === "group") {
            excelCell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "BEDFE6" },
            };
          }
          if (gridCell.rowType === "totalFooter" && excelCell.value) {
            excelCell.font.italic = true;
          }
        },
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            `topic-${formateDate}-${c}.${d}.xlsx`
          );
        });
      });
    }
    e.cancel = true;
  };

  return (
    <div>
      <DataGrid
        id="gridContainer"
        dataSource={topic}
        keyExpr="TopicID"
        showBorders={true}
        onExporting={onExporting}
      >
        <Export enabled={true} formats={exportFormats} />
        <GroupPanel visible={true} />
        <Grouping autoExpandAll={true} />
        <SearchPanel visible={true} />
        <SortByGroupSummaryInfo summaryItem="count" />

        <Column dataField="Name" />
        <Column dataField="CreatedOn" dataType="date" />

        <Column
          caption="Action"
          width={100}
          alignment="center"
          cellRender={(cellData) => {
            return (
              <>
                <label className="btn btn-sm btn-info btn-outline duration-200"
                  onClick={() => handleUpdate(cellData.row)}
                  htmlFor="my_modal_7"
                >
                   <RiEditBoxLine className="w-5 h-8" />
                </label>
              </>
            );
          }}
        />
        <Column
          caption="Action"
          width={100}
          alignment="center"
          cellRender={(cellData) => {
            return (
              <button
              className="btn btn-sm btn-error btn-outline duration-50 btn-delete" 
                onClick={() => handleDeleteClick(cellData.row)}
                
              >
                <MdDelete className="w-5  h-8" />
              </button>
            );
          }}
        />
      </DataGrid>
    </div>
  );
}

export default Tabile;
