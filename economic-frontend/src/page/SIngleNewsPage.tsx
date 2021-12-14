import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../effects/user/userSlice';
import { userAuthSelector } from '../effects/user/userSelector';
import { getNewsById, newsLoadingFailed, newsLoadingSelector } from '../effects/news/newsSelector';
import { Loader } from '../components/Loader';
import { ErrorComponent } from '../components/ErrorComponent';

export const SingleNewsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useAppSelector(newsLoadingSelector);
  const newsById = useAppSelector(getNewsById(Number(id)));
  const isLogin = useAppSelector(userAuthSelector);
  const isError = useAppSelector(newsLoadingFailed);

  useEffect(() => {
    !isLogin && navigate('/');
  }, [isLogin, navigate]);

  const logoutHandler = () => {
    navigate('/');
    dispatch(logout());
  };

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={() => navigate('/')} color="inherit">
              <ArrowBackIosIcon/>
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button onClick={logoutHandler} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="lg">
        {isLoading ? (
          <Loader />
        ) : (
          <Card sx={{marginTop: 2}}>
            {newsById?.img && (
              <CardMedia component="img" height="auto" image={newsById?.img} alt="news" />
            )}
            <CardContent>
              <Typography gutterBottom variant={'h3'} component="div">
                {newsById?.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {newsById?.description}
              </Typography>
              {newsById?.text?.map((item, i) => (
                <Typography key={i} variant="body1" color="text.secondary">
                  {item}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
};
