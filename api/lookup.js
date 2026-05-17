export default async function handler(req, res) {
    // Enable cross-origin resource sharing
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { num } = req.query;
    if (!num) {
        return res.status(400).json({ status: false, error: "Parameter 'num' is required" });
    }

    // Keep only numerical values from the input string
    const cleanNum = num.trim().replace(/\D/g, ''); 

    // Construct target URL string dynamically
    const targetUrl = `https://l34k-osint.onrender.com/search?query=${cleanNum}&key=79f1b4b1696107b2578763c409ba087d`;

    try {
        const response = await fetch(targetUrl);
        
        if (!response.ok) {
            return res.status(response.status).json({ status: false, error: "Failed to fetch data from remote server" });
        }

        // Parse the raw JSON payload completely
        const rawData = await response.json();
        
        // Return the exact raw data object directly back to the webpage client
        return res.status(200).json(rawData);
    } catch (error) {
        return res.status(500).json({ status: false, error: "Network pipeline communication error" });
    }
}
