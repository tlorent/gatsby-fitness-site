/* eslint-disable @typescript-eslint/no-var-requires */
const { createFilePath } = require(`gatsby-source-filesystem`);
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
        type MarkdownRemark implements Node {
            frontmatter: Frontmatter
            featuredImg: File @link(from: "featuredImg___NODE")
        }

        type Frontmatter {
            title: String!
            featuredImgUrl: String
            featuredImgAlt: String
        }
    `);
};

// why async await? because createRemoteFileNode returns a promise
// and we want to await that and await only works within an async function
exports.onCreateNode = async ({
    node,
    getNode,
    actions,
    store,
    cache,
    createNodeId,
}) => {
    const { createNodeField, createNode } = actions;

    if (
        node.internal.type === 'MarkdownRemark' &&
        node.frontmatter.featuredImgUrl
    ) {
        let fileNode = await createRemoteFileNode({
            url: node.frontmatter.featuredImgUrl, // string that points to the url of the image
            parentNodeId: node.id,
            createNode, // helper function to generate the node
            createNodeId,
            cache, // Gatsby's cache
            store, // Gatsby's Redux store
        });

        // if the file was created, attach the new node to the parent node
        if (fileNode) {
            node.featuredImg___NODE = fileNode.id;
        }
    }

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` });
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
};
