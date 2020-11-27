/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: 'Ben Dobson',
        description: 'Personal Training & Dietary Advice',
        siteUrl: 'https://gatsby-fitness-site.netlify.app/',
        author: 'Ben Dobson',
        keywords: ['personal training', 'fitness', 'diet', 'ben dobson'],
    },
    plugins: [
        'gatsby-plugin-styled-components',
        'gatsby-plugin-eslint',
        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                modulePath: `${__dirname}/src/cms/cms.ts`,
            },
        },
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: [
                        'Roboto Condensed:300, 600',
                        'Open Sans:300, 700',
                    ],
                },
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
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
    ],
};
