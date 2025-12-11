import { useState, useEffect } from "react";
import styles from "@/styles/CrudForm.module.css";

const initialForm = {
  name: "",
  quantity: "",
  comments: "",
  id: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Number.isInteger(Number(form.quantity)) || form.quantity <= 0) {
      alert("Por favor, ingresa una cantidad válida.");
      return;
    }

    if (!form.name || !form.quantity) {
      alert("Por favor, completa el formulario correctamente.");
      return;
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>
        {dataToEdit ? "Editar Insumo" : "Agregar insumo Faltante"}
      </h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre de insumo"
          onChange={handleChange}
          value={form.name}
          className={styles.input}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Cantidad requerida"
          onChange={handleChange}
          value={form.quantity}
          min="1"
          required
          className={styles.input}
        />

        <input
          type="text"
          name="comments"
          placeholder="Detalles"
          onChange={handleChange}
          value={form.comments}
          required
          className={styles.input}
        />

        <input
          type="submit"
          value="Insertar"
          disabled={!form.name || !form.quantity}
          className={`${styles.button} ${styles.submit}`}
        />

        <input
          type="reset"
          value="Limpiar"
          onClick={handleReset}
          className={`${styles.button} ${styles.reset}`}
        />
      </form>
    </section>
  );
};

export default CrudForm;
