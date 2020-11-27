/* eslint-disable @typescript-eslint/no-var-requires */
const { createFilePath } = require(`gatsby-source-filesystem`);
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
        type MarkdownRemark implements Node {
            frontmatter: Frontmatter
            featuredImg: File @link(from: "featuredImg___NODE")
            anotherImg: File @link(from: "anotherImg___NODE")
        }

        type Frontmatter {
            title: String!
            featuredImgUrl: String
            featuredImgAlt: String
            anotherImgUrl: String
            anotherImgAlt: String
        }
    `);
};

exports.onCreateNode = ({
    node,
    getNode,
    actions,
    store,
    cache,
    createNodeId,
}) => {
    const { createNodeField, createNode } = actions;

    // why async await? because createRemoteFileNode returns a promise
    // and we want to await that and await only works within an async function
    async function createImageNodes(node) {
        for (const key of Object.keys(node.frontmatter)) {
            if (key.includes('ImgUrl')) {
                let fileNode = await createRemoteFileNode({
                    url: node.frontmatter[key], // string that points to the url of the image
                    parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
                    createNode, // helper function to generate the node
                    createNodeId, // helper function to generate the node id
                    cache, // Gatsby's cache
                    store, // Gatsby's Redux store
                });

                const imgNode = `${key.replace('Url', '')}___NODE`;

                // if the file was created, attach the new node to the parent node
                if (fileNode) {
                    node[imgNode] = fileNode.id;
                }
            }
        }
    }

    if (
        node.internal.type === 'MarkdownRemark' &&
        node.frontmatter.featuredImgUrl
    ) {
        createImageNodes(node);
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
