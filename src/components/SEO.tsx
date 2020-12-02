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
                author
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

    /*
        Only necessary if you have several paths to the same content.
        For example, a product page on mobile and desktop.
    */
    const canonical = pathname
        ? `${siteMetadata.siteUrl}${pathname}`
        : siteMetadata.siteUrl;

    return (
        <Helmet
            titleTemplate={title !== '/' ? `%s | ${siteMetadata.title}` : ''}
            title={metaTitle}
        >
            {/* Meta tags */}
            <html lang="en" />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={siteMetadata.keywords.join(',')} />
            <meta name="author" content={siteMetadata.author} />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1.0"
            />
            <link rel="canonical" href={canonical} />
            {/* <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
            {/* <link
                href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700&family=Roboto+Condensed:wght@300;700&display=swap"
                rel="preload"
                as="style"
            /> */}
            <link
                href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700&family=Roboto+Condensed:wght@300;700&display=swap"
                rel="stylesheet"
            />

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
            />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta
                property="og:type"
                content={isBlogPost ? 'article' : 'website'}
            />
            <meta property="og:sitename" content={siteMetadata.title} />
            <meta property="og:url" content={url} />

            {/* Scripts */}

            {children}
        </Helmet>
    );
};

export default SEO;
