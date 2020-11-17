module.exports = {
    client: {
        service: {
            name: 'fitness-site',
            url: 'http://localhost:8000/__graphql',
            includes: ['src/components/**.tsx'],
            tagName: 'graphql',
        },
    },
};
