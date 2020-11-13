import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

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

const SEO: FC = () => {
    const {
        site: { siteMetadata },
    } = useStaticQuery(query);
    const { title, description } = siteMetadata;

    return (
        <Helmet>
            <title>
                {title} - {description}
            </title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
        </Helmet>
    );
};

export default SEO;