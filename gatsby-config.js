/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: 'Ben Dobson',
        description: 'Personal Training & Dietary Advice',
    },
    plugins: [
        'gatsby-plugin-styled-components',
        'gatsby-plugin-eslint',
        'gatsby-plugin-netlify-cms',
        {
            resolve: 'gatsby-plugin-prefetch-google-fonts',
            options: {
                fonts: [
                    {
                        family: 'Roboto Condensed',
                        variants: ['300', '400', '600', '700'],
                    },
                    {
                        family: 'Open Sans',
                        variants: ['300', '400', '700'],
                    },
                ],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/content`,
            },
        },
        `gatsby-transformer-remark`,
        'gatsby-plugin-react-helmet',
    ],
};
