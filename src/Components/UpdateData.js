import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';

const UpdateData = ({ open, selectedItem, onClose, onUpdate }) => {
  const [updatedItem, setUpdatedItem] = useState({ title: '', content: '' });

  useEffect(() => {
    if (selectedItem) {

      setUpdatedItem({
        id: selectedItem.id,
        title: selectedItem.title,
        content: selectedItem.content,
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onUpdate(updatedItem); // Pass the updated item to the parent for updating in the database
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={updatedItem.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          name="content"
          value={updatedItem.content}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateData.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedItem: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

UpdateData.defaultProps = {
  selectedItem: null,
};

export default UpdateData;
