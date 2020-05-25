import React from 'react';

import SEO from './seo';
import AppBar from './app-bar';
import Footer from './footer';

import '../scss/components/layout.scss';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

type DefaultLayoutProps = {
  description?: string;
  lang?: string;
  meta?: Array<HTMLMetaElement>;
  offset?: boolean;
  title: string;
};

const DefaultLayout: React.FunctionComponent<DefaultLayoutProps> = ({
  children,
  title,
  description,
  lang,
  meta,
  offset,
}) => {
  const classes = useStyles();

  return (
    <>
      <SEO title={title} description={description} lang={lang} meta={meta} />
      <div className="app">
        <div className="app-wrap">
          <AppBar />
          {offset && <div className={classes.offset}></div>}
          <main className="app-content">
            <div className="app-content-wrap">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

DefaultLayout.defaultProps = {
  offset: true,
};

export default DefaultLayout;
