import React from 'react';

import SEO from '../seo';

interface EmptyLayoutProps extends React.HTMLAttributes<HTMLElement> {
  description?: string;
  lang?: string;
  meta?: Array<HTMLMetaElement>;
  offset?: boolean;
  title: string;
}

const EmptyLayout: React.FunctionComponent<EmptyLayoutProps> = (props) => {
  const { title, description, lang, meta, children, className, ...rest } = props;

  return (
    <div className={className + ' app'} {...rest}>
      <SEO title={title} description={description} lang={lang} meta={meta} />
      <div className="app-wrap">
        <main className="app-content">
          <div className="app-content-wrap">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default EmptyLayout;
