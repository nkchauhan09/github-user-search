import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Pagination, Select, MenuItem } from '@mui/material';

function App() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('');
  
  const PER_PAGE = 10;

  const fetchUsers = async () => {
    const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=${PER_PAGE}&page=${page}`);
    setUsers(response.data.items);
    setTotalPages(Math.ceil(response.data.total_count / PER_PAGE));
  };

  useEffect(() => {
    if (query) {
      fetchUsers();
    }
  }, [query, page, sortOption, fetchUsers]);

  const handleSort = (option) => {
    setSortOption(option);
    let sortedUsers = [...users];
    if (option === 'name-asc') {
      sortedUsers.sort((a, b) => a.login.localeCompare(b.login));
    } else if (option === 'name-desc') {
      sortedUsers.sort((a, b) => b.login.localeCompare(a.login));
    }
    setUsers(sortedUsers);
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Search GitHub Users"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Select
        value={sortOption}
        onChange={(e) => handleSort(e.target.value)}
        displayEmpty
        style={{ margin: '20px 0' }}
      >
        <MenuItem value="" disabled>Sort By</MenuItem>
        <MenuItem value="name-asc">Name (A - Z)</MenuItem>
        <MenuItem value="name-desc">Name (Z - A)</MenuItem>
      </Select>
      <div>
        {users.map(user => (
          <Card key={user.id} style={{ margin: '10px 0' }}>
            <CardContent>
              <Typography variant="h6">{user.login}</Typography>
              <img src={user.avatar_url} alt={user.login} style={{ width: '50px', borderRadius: '50%' }} />
              <Button variant="contained" href={`/user/${user.login}`} style={{ marginLeft: '20px' }}>Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
      />
    </div>
  );
}

export default App;
