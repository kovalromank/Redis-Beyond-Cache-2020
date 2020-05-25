import React from 'react';
import { Helmet } from 'react-helmet';

import * as config from '../config';

type SEOPropTypes = {
  description?: string;
  lang?: string;
  meta?: HTMLMetaElement[];
  title: string;
};

const SEO: React.FunctionComponent<SEOPropTypes> = ({ description, lang, meta, title }) => {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${config.title}`}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ].concat(meta as any)}
    />
  );
};

SEO.defaultProps = {
  description: config.description,
  lang: 'en',
  meta: [],
};

export default SEO;
