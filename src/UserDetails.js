import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

function UserDetails() {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserRepos = async () => {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    setRepos(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserRepos();
  }, [username]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">{username}'s Repositories</Typography>
      {loading ? <CircularProgress /> : (
        repos.map(repo => (
          <Card key={repo.id} style={{ margin: '10px 0' }}>
            <CardContent>
              <Typography variant="h6">{repo.name}</Typography>
              <Typography>Language: {repo.language}</Typography>
              <Typography>Stars: {repo.stargazers_count}</Typography>
              <Typography>Forks: {repo.forks_count}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default UserDetails;
