export default async function handler(req, res) {
    // Enable CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    let { num } = req.query;
    if (!num) {
        return res.status(400).json({ status: false, error: "Missing target identifier" });
    }

    // Clean inputs and enforce structural rules
    let cleanNum = num.trim().replace(/\s+/g, '').replace(/[-+]/g, '');
    
    // Ensure number is precisely prefixed with country code 91
    if (!cleanNum.startsWith('91')) {
        cleanNum = '91' + cleanNum;
    }

    // New API endpoint target configuration
    const targetUrl = `https://l34k-osint.onrender.com/search?query=${cleanNum}&key=79f1b4b1696107b2578763c409ba087d`;

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            throw new Error(`Target API returned status code: ${response.status}`);
        }
        
        const rawData = await response.json();
        
        // Strip out key_stats/metadata and forward only status and leak data structures
        if (rawData.status && rawData.data) {
            return res.status(200).json({
                status: true,
                query: rawData.query,
                data: rawData.data
            });
        } else {
            return res.status(200).json({ status: false, message: "No records found in master logs" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, error: "Upstream architecture connection timeout" });
    }
}
