import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);



  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {

      dispatch(getPostsBySearch({ tags: name }));
    } else {

      dispatch(getPostsByCreator(name));
    }
  }, []);

  if (!posts.length && !isLoading) return 'No posts';

  return (
    <div style={{ background: 'transparent' }}>
      <Typography variant="h5" style={{ color: 'white', marginBottom: '10px' }}>


      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          padding: '5px 10px',
          marginBottom: '10px',
        }}
      >
        <Typography variant="h3" style={{ color: 'white', marginRight: '10px' }}>
          {name}
        </Typography>
      </Box>
      <Divider style={{ margin: '20px 0 50px 0', background: 'white' }} />
      {isLoading ? (
        <CircularProgress style={{ color: 'white' }} />
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
