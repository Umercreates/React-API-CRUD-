import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import AddData from './AddData';
import UpdateData from './UpdateData';
import FetchData from './FetchData'; // Ensure you're using FetchData

export default function GetUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = () => {
    setLoading(true);  // Start loading
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setData(response.data);
        setLoading(false);  // End loading
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = (newPost) => {
    axios.post('http://localhost:5000/posts', newPost)
      .then(fetchData)
      .catch(error => console.error('Error adding data:', error));
    setOpenAdd(false);
  };

  const handleUpdate = (updatedPost) => {
    console.log(updatedPost)
    axios.put(`http://localhost:5000/posts/${updatedPost.id}`, updatedPost)
      .then(fetchData)
      .catch(error => console.error('Error updating data:', error));
    setOpenUpdate(false);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then(fetchData)
      .catch(error => console.error('Error deleting data:', error));
  };

  return (
    <Box>
      <Typography
  variant="h4"
  sx={{
    background: 'linear-gradient(45deg, #ff6b6b, #f94c10)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    letterSpacing: '2px',
    textAlign: 'center',
    paddingBottom: '36px',
    paddingTop: '23px',
    textShadow: '2px 4px 6px rgba(0,0,0,0.2)',
  }}
>
  User Posts
</Typography>

      <Button
  onClick={() => setOpenAdd(true)}
  variant="contained"
  sx={{
    background: 'linear-gradient(90deg, #1e88e5, #42a5f5)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    borderRadius: '30px',
    padding: '10px 24px',
    marginLeft:'32px',
    boxShadow: '0px 4px 10px rgba(0, 123, 255, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(90deg, #42a5f5, #1e88e5)',
      boxShadow: '0px 6px 15px rgba(0, 123, 255, 0.6)',
      transform: 'scale(1.05)',
    },
  }}
>
  Add New Post
</Button>

      <AddData open={openAdd} onClose={() => setOpenAdd(false)} onAdd={handleAdd} />
      {selectedItem && (
        <UpdateData
          open={openUpdate}
          selectedItem={selectedItem}
          onClose={() => setOpenUpdate(false)}
          onUpdate={handleUpdate}
        />
      )}
      {/* Use loading state to show loading indicator */}
      {loading ? (
        <CircularProgress />
      ) : (
        <FetchData
          data={data}
          onRead={(id) => console.log("Read clicked for:", id)}
          onUpdate={(item) => { setSelectedItem(item); setOpenUpdate(true); }}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
}
