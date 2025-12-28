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

  const updateData = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, quantity, comments } = req.body;

      const { error } = await supabase
        .from("insumos")
        .update({ name, quantity, comments })
        .eq("id", id);

      if (error) throw error;

      res.json({ message: "Insumo actualizado correctamente" });
    } catch (error) {
      next(error);
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
