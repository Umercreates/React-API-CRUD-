import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContentText, // Correct component
  DialogActions 
} from '@mui/material';


const CardsComponent = ({ data, onEdit, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClickDelete = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    if (selectedId) {
      onDelete(selectedId);
    }
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  return (
    <Box sx={{ flexGrow: 40, padding: 10}}>
      <Grid container spacing={4}> {/* Increase spacing for cleaner layout */}
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', borderRadius: '12px', padding: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', paddingX: 1.5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onEdit(item)}
                  sx={{
                    borderRadius: '25px',
                    padding: '8px 20px',
                    fontWeight: 'bold',
                    boxShadow: '0px 4px 8px rgba(0, 123, 255, 0.3)',
                    marginRight: 1, // Add space between buttons
                    fontSize: '0.875rem'
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleClickDelete(item.id)}
                  sx={{
                    borderRadius: '25px',
                    padding: '8px 20px',
                    fontWeight: 'bold',
                    boxShadow: '0px 4px 8px rgba(255, 0, 0, 0.3)',
                    fontSize: '0.875rem'
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
  <DialogTitle>Confirm Deletion</DialogTitle>
  <DialogContentText> 
    Are you sure you want to permanently delete this post?
  </DialogContentText>
  <DialogActions>
    <Button onClick={handleCancelDelete} color="primary">
      Cancel
    </Button>
    <Button onClick={handleDelete} color="error">
      Confirm
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

// Prop validation
CardsComponent.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardsComponent;
