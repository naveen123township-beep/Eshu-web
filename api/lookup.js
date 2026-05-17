export default async function handler(req, res) {
    // Enable CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    let { num } = req.query;
    if (!num) {
        return res.status(400).json({ status: false, error: "Missing number parameter" });
    }

    // Clean inputs: remove spaces, dashes, and plus signs
    let cleanNum = num.trim().replace(/\s+/g, '').replace(/[-+]/g, '');
    cleanNum = cleanNum.replace(/\D/g, ''); 

    // Auto-prefix with 91 if it's a 10-digit number missing the country code
    if (cleanNum.length === 10 && !cleanNum.startsWith('91')) {
        cleanNum = '91' + cleanNum;
    }

    const targetUrl = `https://l34k-osint.onrender.com/search?query=${cleanNum}&key=79f1b4b1696107b2578763c409ba087d`;

    try {
        const response = await fetch(targetUrl);
        const rawData = await response.json();
        
        // Pass the raw structural data directly to the website layout
        return res.status(200).json(rawData);
    } catch (error) {
        return res.status(500).json({ status: false, error: "API connection failed" });
    }
}
