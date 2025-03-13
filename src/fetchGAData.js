const { google } = require('googleapis');

async function fetchGAData() {
    const analyticsData = google.analyticsdata('v1beta');
    const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    // Set the credentials after user authentication
    auth.setCredentials({ refresh_token: REFRESH_TOKEN });

    const response = await analyticsData.properties.runReport({
        property: 'properties/YOUR_PROPERTY_ID',
        requestBody: {
            dimensions: [{ name: 'city' }],
            metrics: [{ name: 'activeUsers' }],
            dateRanges: [{ startDate: '2023-01-01', endDate: '2023-01-31' }],
        },
        auth: auth,
    });

    return response.data;
} 