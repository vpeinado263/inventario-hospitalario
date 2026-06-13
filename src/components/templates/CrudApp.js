import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import CrudForm from "../organisms/CrudForm";
import CrudTable from "../organisms/CrudTable";

const API_URL = "https://inventario-hospitalario.onrender.com/insumos";

const CrudApp = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

  const readData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      setDb(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar la lista");
    } finally {
      setLoading(false);
    }
  };

  const createData = async (data) => {
    // Validaciones
    if (!data.name || data.name.trim().length === 0) {
      toast.warning("Debe escribir el nombre del insumo");
      return false;
    }

    if (data.name.trim().length < 3) {
      toast.warning("El nombre debe tener al menos 3 caracteres");
      return false;
    }

    if (!data.quantity || data.quantity <= 0) {
      toast.warning("Debe indicar una cantidad mayor a cero");
      return false;
    }

    const toastId = toast.loading("Guardando insumo...");

    try {
      const res = await axios.post(API_URL, {
        name: data.name.trim(),
        quantity: data.quantity,
        comments: data.comments?.trim() || ""
      });
      
      setDb(prev => [...prev, res.data]);
      
      toast.success(`✓ "${res.data.name}" agregado`, { id: toastId });
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar", { id: toastId });
      return false;
    }
  };

  const updateData = async (data) => {
    if (!data.name || data.name.trim().length === 0) {
      toast.warning("Debe escribir el nombre");
      return false;
    }

    const toastId = toast.loading("Actualizando...");

    try {
      const res = await axios.put(`${API_URL}/${data.id}`, {
        name: data.name.trim(),
        quantity: data.quantity,
        comments: data.comments?.trim() || ""
      });
  
      setDb(prev => prev.map(item => (item.id === data.id ? res.data : item)));
      
      toast.success(`✓ "${res.data.name}" actualizado`, { id: toastId });
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar", { id: toastId });
      return false;
    }
  };
  
  const deleteData = async (id) => {
    const insumoAEliminar = db.find(item => item.id === id);
    
    // Confirmación nativa de JavaScript
    const confirmar = window.confirm(`¿Eliminar "${insumoAEliminar?.name}"?`);
    
    if (!confirmar) return;

    const toastId = toast.loading("Eliminando...");

    try {
      await axios.delete(`${API_URL}/${id}`);
      setDb(prev => prev.filter(item => item.id !== id));
      
      toast.success(`✓ "${insumoAEliminar?.name}" eliminado`, { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar", { id: toastId });
    }
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      
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