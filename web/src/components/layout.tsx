/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';

import SEO from './seo';
import AppBar from './app-bar';
import Footer from './footer';

import '../scss/layouts/default.scss';

type DefaultLayoutProps = {
  description?: string;
  lang?: string;
  meta?: Array<HTMLMetaElement>;
  fixedBar?: boolean;
  title: string;
  name?: string;
  image?: {
    width?: number;
    height?: number;
    url: string;
  };
};

const DefaultLayout: React.FunctionComponent<DefaultLayoutProps> = ({
  children,
  title,
  description,
  lang,
  meta,
  name,
  image,
}) => {
  return (
    <>
      <SEO title={title} description={description} lang={lang} meta={meta} />
      <div className="app">
        <div className="app-wrap">
          <AppBar name={name} image={image} />
          <main className="app-content">
            <div className="app-content-wrap">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
