const { CosmosClient } = require('@azure/cosmos');

// Azure Cosmos DB Connection
const endpoint = "https://<your-cosmos-db-name>.documents.azure.com:443/";
const key = "<your-cosmos-db-key>";
const client = new CosmosClient({ endpoint, key });
const databaseId = "AirlinePolicies";
const containerId = "Policies";

module.exports = async function (context, req) {
    const query = req.query.query || (req.body && req.body.query);
    if (!query) {
        context.res = {
            status: 400,
            body: "Please provide a valid query",
        };
        return;
    }

    try {
        const container = client.database(databaseId).container(containerId);

        // Query Cosmos DB for relevant policy
        const querySpec = {
            query: "SELECT * FROM Policies p WHERE CONTAINS(p.policyText, @query)",
            parameters: [{ name: "@query", value: query }],
        };

        const { resources: policies } = await container.items.query(querySpec).fetchAll();

        if (policies.length > 0) {
            context.res = {
                status: 200,
                body: policies,
            };
        } else {
            context.res = {
                status: 404,
                body: "No matching policies found",
            };
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error: ${error.message}`,
        };
    }
};
