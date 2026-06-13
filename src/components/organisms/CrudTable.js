import CrudTableRow from "../molecules/CrudTableRow";
import styles from "@/styles/CrudTable.module.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const CrudTable = ({ data = [], loading = false, deleteData, setDataToEdit }) => {
  
  const exportarPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Insumos Faltantes - Enfermería", 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 14, 30);
  
    const columnas = ["Nombre", "Cantidad", "Comentarios"];
    const filas = data.map(item => [
      item.name,
      item.quantity,
      item.comments || "—"
    ]);
    
    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 40,
      theme: "striped",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] }
    });
    
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(8);
    doc.text(`Total de insumos registrados: ${data.length}`, 14, finalY);
    doc.save(`lista-insumos-${new Date().toISOString().slice(0,19)}.pdf`);
  };

  return (
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Nombre</th>
            <th className={styles.th}>Cantidad</th>
            <th className={styles.th}>Comentarios</th>
            <th className={styles.th}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr className={styles["empty-row"]}>
              <td className={styles.td} colSpan={4}>
                ⏳ Cargando insumos...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr className={styles["empty-row"]}>
              <td className={styles.td} colSpan={4}>
                📋 Sin insumos registrados
              </td>
            </tr>
          ) : (
            data.map((insumo) => (
              <CrudTableRow
                key={insumo.id}
                insumo={insumo}
                deleteData={deleteData}
                setDataToEdit={setDataToEdit}
              />
            ))
          )}
        </tbody>
      </table>
      
      <div className={styles["export-button-container"]}>
        <button 
          onClick={exportarPDF} 
          className={styles["btn-pdf"]}
          disabled={data.length === 0 || loading}
          title={data.length === 0 ? "No hay insumos para exportar" : "Descargar PDF para enviar a compras"}
        >
          📄 Descargar PDF
        </button>
      </div>
    </div>
  );
};

export default CrudTable;