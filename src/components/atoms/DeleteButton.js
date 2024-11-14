import Button from "./Button";

const DeleteButton = ({ onClick}) => {
 return <Button label="Eliminar" onClick={onClick} type="delete" />;
}

export default DeleteButton
