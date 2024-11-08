import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function GetUsers() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const[editOpen, setEditOpen] =useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = data.filter(item => item.id === parseInt(value, 10));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleRead = (id) => {
    console.log(`Read post ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete post ID: ${id}`);
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleUpdate = (item) => {
    setSelectedItem(item); // Set the selected item to edit
    setEditOpen(true);         // Open the dialog
  };
  const handledit = (item) => {
    const newPost = {id:selectedItem.id, title: selectedItem.title, content: selectedItem.content };
    axios.put(`http://localhost:5000/posts/${selectedItem.id}`, newPost)
      .then(() => {
        fetchData();
        setEditOpen(false);
      })
      .catch(error => console.error('Error adding data:', error));
    setSelectedItem(item); // Set the selected item to edit
    setEditOpen(true);         // Open the dialog
  };
  const handleAddClick = () => {
    setSelectedItem({ id: null, title: '', content: '' }); // Initialize empty post for adding new data
    setOpen(true);
  };

  const handleAdd = () => {
    const newPost = { id: Date.now().toString(), title: selectedItem.title, content: selectedItem.content };
    axios.post('http://localhost:5000/posts', newPost)
      .then(() => {
        fetchData();
        handleClose();
      })
      .catch(error => console.error('Error adding data:', error));
  };

  let displayContent;
  if (loading) {
    displayContent = (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '200px' }}>
        <CircularProgress sx={{ color: '#1976d2' }} />
      </Box>
    );
  } else if (filteredData.length > 0) {
    displayContent = filteredData.map((item) => (
      <Box key={item.id} sx={{ width: { xs: '100%', sm: '45%', md: '22%' } }}>
        <Card sx={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', '&:hover': { boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' } }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }} gutterBottom>
              User ID: {item.id}
            </Typography>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
              {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              Post
            </Typography>
            <Typography variant="body2" sx={{ color: '#333', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', textAlign: 'justify' }}>
              {item.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" sx={{ color: '#1976d2' }} onClick={() => handleRead(item.id)}>Read</Button>
            <Button size="small" color="primary" onClick={() => handleUpdate(item)}>Update</Button>
            <Button size="small" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
          </CardActions>
        </Card>
      </Box>
    ));
  } else {
    displayContent = (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '200px' }}>
        <Typography variant="h6" sx={{ color: '#d32f2f' }}>
          No post found with the given ID.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#1976d2' }}>
        API Data in Cards
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
        >
          Add
        </Button>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <TextField
          label="Search by ID"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            width: '300px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#1976d2' },
              '&:hover fieldset': { borderColor: '#1565c0' },
            },
          }}
          InputAdornment={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#1976d2' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {displayContent}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedItem?.id ? 'Update Post' : 'Add New Post'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label="Title"
              value={selectedItem?.title || ''}
              fullWidth
              onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Body"
              value={selectedItem?.content || ''}
              fullWidth
              multiline
              rows={4}
              onChange={(e) => setSelectedItem({ ...selectedItem, content: e.target.value })}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
          <Button onClick={handleAdd} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={()=>setEditOpen(false)}>
        <DialogTitle>{selectedItem?.id ? 'Update Post' : 'Add New Post'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label="Title"
              value={selectedItem?.title || ''}
              fullWidth
              onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Body"
              value={selectedItem?.content || ''}
              fullWidth
              multiline
              rows={4}
              onChange={(e) => setSelectedItem({ ...selectedItem, content: e.target.value })}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setEditOpen(false)} color="primary">Close</Button>
          <Button onClick={()=>handledit()} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
