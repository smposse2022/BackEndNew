import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserForm = ()=> {

    const handleSubmitForm = async(event)=>{ };

    return (
        <div className='formContainer'>
            <Form onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar Nombre" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar Apellido" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar DNI" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Agregar
                </Button>
            </Form>
        </div>
    );
}

export {UserForm};