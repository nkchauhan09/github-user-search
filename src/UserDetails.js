import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

function UserDetails() {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Wrap fetchUserRepos with useCallback to make it stable
  const fetchUserRepos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(response.data);
    } catch (error) {
      console.error("Error fetching user repos:", error);
    } finally {
      setLoading(false);
    }
  }, [username]); // Depend on username only

  useEffect(() => {
    fetchUserRepos();
  }, [fetchUserRepos]); // Depend on fetchUserRepos

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
