import { useState, useEffect } from "react";
import axios from "axios";
import CrudForm from "../organisms/CrudForm";
import CrudTable from "../organisms/CrudTable";

const API_URL = "https://inventario-hospitalario.onrender.com/insumos";

const CrudApp = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

  const readData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setDb(data);
    } catch (error) {
      console.error("Error al leer los datos:", error?.response?.data || error);
    }
  };

  const createData = async (data) => {
    try {
      const res = await axios.post(API_URL, data);
      setDb((prev) => [...prev, res.data]);
    } catch (error) {
      console.error(error);
    }
  };  

  const updateData = async (data) => {
    try {
      const res = await axios.put(`${API_URL}/${data.id}`, data);
  
      setDb((prev) =>
        prev.map((el) => (el.id === data.id ? res.data : el))
      );
    } catch (error) {
      console.error(
        "Error al actualizar insumo:",
        error?.response?.data || error
      );
    }
  };
  

  const deleteData = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este insumo?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      readData();
    } catch (error) {
      console.error(
        "Error al eliminar insumo:",
        error?.response?.data || error,
      );
    }
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <div>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />

      <CrudTable
        data={db}
        deleteData={deleteData}
        setDataToEdit={setDataToEdit}
      />
    </div>
  );
};

export default CrudApp;
