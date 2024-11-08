import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const DeleteData = ({ id, onDelete }) => (
  <Button variant="contained" color="secondary" onClick={() => onDelete(id)}>
    Delete
  </Button>
);

DeleteData.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteData;
