import { useState } from 'react';

import * as Yup from 'yup';
import getValidationErrors, {
  Errors,
} from '../../../utils/getValidationErrors';
import { Modal, Button, FormGroup, Form } from 'react-bootstrap';

interface ModalObservationProps {
  handleCloseModalObservation: () => void;
  handleCreateReview: (action: number, observation: string | null) => void;
  showModalObservation: boolean;
}

const ModalObservation: React.FC<ModalObservationProps> = ({
  handleCloseModalObservation,
  handleCreateReview,
  showModalObservation,
}) => {
  const [observation, setObservation] = useState(null);
  const [errors, setErrors] = useState({} as Errors);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setObservation(value);
  };

  const handleSubmit = async () => {
    try {
      const schema = Yup.object().shape({
        observation: Yup.string().required('Observation is required'),
      });

      await schema.validate(
        { observation },
        {
          abortEarly: false,
        }
      );
      return handleCreateReview(2, observation);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(error);
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <Modal show={showModalObservation} onHide={handleCloseModalObservation}>
        <Modal.Header closeButton>
          <Modal.Title>Request Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Label>Observation</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleChange}
              placeholder="Please, type the reason..."
              isInvalid={!!errors.observation}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalObservation}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalObservation;
