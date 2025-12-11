import Button from "./Button";

const EditButton = ({ onClick }) => {
  return <Button label="Editar" onClick={onClick} type="edit" />;
};

export default EditButton;
