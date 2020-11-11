/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    /* Your site config here */
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
    ],
};
