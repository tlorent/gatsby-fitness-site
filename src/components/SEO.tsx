import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

const SEO: FC = () => {
    const {
        site: { siteMetadata },
    } = useStaticQuery(query);
    const { title, description } = siteMetadata;

    return (
        <Helmet>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
        </Helmet>
    );
};

export default SEO;

const query = graphql`
    query SEO {
        site {
            siteMetadata {
                title
                description
            }
        }
    }
`;
