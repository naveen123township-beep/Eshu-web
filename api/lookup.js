export default async function handler(req, res) {
    // Explicit CORS headers to bypass strict origin security
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    let { num } = req.query;
    if (!num) {
        return res.status(400).json({ status: false, error: "Missing required query parameter: num" });
    }

    // Sanitize string inputs instantly
    let cleanNum = num.trim().replace(/\s+/g, '').replace(/[-+]/g, '');
    cleanNum = cleanNum.replace(/\D/g, ''); 

    // Auto-prefix matching architecture logic
    if (cleanNum.length === 10 && !cleanNum.startsWith('91')) {
        cleanNum = '91' + cleanNum;
    }

    // Direct endpoint connection pipeline
    const targetUrl = `https://l34k-osint.onrender.com/search?query=${cleanNum}&key=79f1b4b1696107b2578763c409ba087d`;

    try {
        const response = await fetch(targetUrl);
        const rawData = await response.json();
        
        // Pass out clean object payload mappings
        if (rawData.status && rawData.data) {
            return res.status(200).json({
                status: true,
                data: rawData.data
            });
        } else {
            return res.status(200).json({ status: false, message: "No records found matching target." });
        }
    } catch (error) {
        return res.status(500).json({ status: false, error: "Upstream pipeline timeout" });
    }
}
