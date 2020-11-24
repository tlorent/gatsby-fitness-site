import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

const query = graphql`
    query SEO {
        site {
            siteMetadata {
                title
                description
                siteUrl
                keywords
            }
        }
    }
`;

interface Props {
    url: string;
    title: string;
    isBlogPost?: boolean;
    description?: string | null;
    pathname?: string;
}

const SEO: FC<Props> = ({
    children,
    title,
    url,
    isBlogPost = false,
    description,
    pathname,
}) => {
    const {
        site: { siteMetadata },
    } = useStaticQuery(query);

    const metaDescription = description ?? siteMetadata.description;
    const metaTitle =
        title === '/'
            ? `${siteMetadata.title} - ${siteMetadata.description}`
            : title;
    // Only necessary if you have several paths to the same content.
    const canonical = pathname ? `${siteMetadata.siteUrl}${pathname}` : null;

    return (
        <Helmet
            titleTemplate={title !== '/' ? `%s | ${siteMetadata.title}` : ''}
            title={metaTitle}
            htmlAttributes={{
                lang: 'en',
            }}
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    name: 'keywords',
                    content: siteMetadata.keywords.join(','),
                },
                {
                    property: 'og:title',
                    content: metaTitle,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: isBlogPost ? 'article' : 'website',
                },
                {
                    property: 'og:sitename',
                    content: siteMetadata.title,
                },
                {
                    property: 'og:url',
                    content: url,
                },
            ]}
            link={
                canonical
                    ? [
                          {
                              rel: 'canonical',
                              href: canonical,
                          },
                      ]
                    : []
            }
        >
            {/* Meta tags */}
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1.0"
            />
            <meta charSet="utf-8" />

            {/* favicons */}
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />

            {/* Open Graph */}
            <meta
                property="og:image"
                content="https://images.unsplash.com/photo-1600181957705-92f267a2740e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
                key="ogimage"
            />

            {/* Scripts */}
            <script
                src="https://kit.fontawesome.com/2f096f0c47.js"
                crossOrigin="anonymous"
            />

            {children}
        </Helmet>
    );
};

export default SEO;
