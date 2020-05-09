/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from './seo';

import '../scss/components/layout.scss';

type LayoutProps = {
  description?: string;
  lang?: string;
  meta?: Array<HTMLMetaElement>;
  title: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title,
  description,
  lang,
  meta,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <SEO title={title} description={description} lang={lang} meta={meta} />
      <div className="app">
        <div className="app-wrap">
          <main className="app-content">
            <div className="app-content-wrap">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
