import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import CardsComponent from './CardsComponent'; // Import CardsComponent

const FetchData = ({ data, loading, onRead, onUpdate, onDelete }) => {
  if (loading) {
    return <CircularProgress />;
  }

  // Only pass the data and handlers to CardsComponent for rendering
  return (
    <div>
      <CardsComponent
        data={data}
        onEdit={onUpdate}
        onDelete={onDelete}
        onRead={onRead}
      />
    </div>
  );
};

// Prop validation
FetchData.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onRead: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FetchData;
