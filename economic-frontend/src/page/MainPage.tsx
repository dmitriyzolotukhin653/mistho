import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { fetchNews, fetchSingleNews } from '../effects/news/newsSlice';
import { newsLoadingFailed, newsLoadingSelector, newsSelector } from '../effects/news/newsSelector';
import { userAuthSelector } from '../effects/user/userSelector';
import { logout, resetError } from '../effects/user/userSlice';
import { RequestUserType } from '../effects/user/type';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Header } from '../components/Header';
import { AuthComponent } from '../components/AuthComponent';
import { NewsList } from '../components/NewsList';
import { Loader } from '../components/Loader';
import { ErrorComponent } from '../components/ErrorComponent';

export const MainPage = () => {
  const [authType, setAuthType] = useState(RequestUserType.DEFAULT);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLogin = useAppSelector(userAuthSelector);
  const newsList = useAppSelector(newsSelector);
  const isLoading = useAppSelector(newsLoadingSelector);
  const isError = useAppSelector(newsLoadingFailed);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const loginHandler = () => {
    setAuthType(RequestUserType.LOGIN);
  };

  const registerHandler = () => {
    setAuthType(RequestUserType.SIGNUP);
  };

  const closeHandler = () => {
    setAuthType(RequestUserType.DEFAULT);
    dispatch(resetError());
  };

  const clickNewsHandler = (link: string, id: number) => {
    dispatch(fetchSingleNews(link));
    navigate(`/news/${id}`);
  };

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <Header
        isLogin={isLogin}
        logoutHandler={logoutHandler}
        loginHandler={loginHandler}
        registerHandler={registerHandler}
      />
      <Container maxWidth="lg">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container">
            <NewsList news={newsList} isLogin={isLogin} clickHandler={clickNewsHandler} />
          </div>
        )}
      </Container>
      <AuthComponent type={authType} closeHandler={closeHandler} />
    </>
  );
};
