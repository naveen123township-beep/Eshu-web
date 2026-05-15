export default async function handler(req, res) {
    const { num } = req.query;
    const targetUrl = `https://paid.proportalx.workers.dev/number?key=my&num=${num}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();
        
        // Allow your frontend to read this data
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "API connection failed" });
    }
}
  
