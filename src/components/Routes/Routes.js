import React from 'react';
import { Switch } from 'react-router-dom';

import { DefaultLayout } from '../DefaultLayout';
import { MainPage } from '../MainPage';
import { TVShowListPage } from '../TVShowListPage';
import { MovieItemPage } from '../MovieItemPage';
import { SearchPage } from '../SearchPage';
import { TVShowItemPage } from '../TVShowItemPage';
import { LoginPage } from '../LoginPage';
import NotFoundPage from '../NotFoundPage';
import connectWithIoC from '../../services/connectWithIoC';

const Routes = ({ routingConfig }) => {
  const {
    main,
    view,
    notFound,
    login,
    movie: { movieList, moviePath },
    tvShow: { showList, showPath },
    search: { searchPath }
  } = routingConfig;

  const renderPages = () => (
    <Switch>
      <DefaultLayout component={MainPage} exact path={main} />
      <DefaultLayout component={MainPage} path={movieList} />
      <DefaultLayout component={TVShowListPage} path={showList} />
      <DefaultLayout component={SearchPage} path={searchPath} />
      <DefaultLayout component={MovieItemPage} path={`${moviePath}${view}`} />
      <DefaultLayout component={TVShowItemPage} path={`${showPath}${view}`} />
      <DefaultLayout component={LoginPage} path={login} />
      <DefaultLayout
        component={NotFoundPage}
        hideFooter
        hideHeader
        to={notFound}
      />
    </Switch>
  );

  return renderPages();
};

export default connectWithIoC(['routingConfig'])(Routes);
