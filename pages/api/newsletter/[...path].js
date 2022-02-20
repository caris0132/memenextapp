import httpProxy from "http-proxy";
const proxy = httpProxy.createProxyServer();
export const config = {
    api: {
        bodyParser: false
    }
}
export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(404).json({ message: "method not supported" });
    }
    return new Promise((resolve, reject) => {
        proxy.once('proxyRes', function(proxyRes, req, res) {
            var body = [];
            proxyRes.on('data', function(chunk) {
                body.push(chunk);
            });
            proxyRes.on('end', function() {
                body = Buffer.concat(body).toString();
                res.json(body);
                res.status(200).end();
            });
            resolve(true);
        });


        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: true,
        });

    });
}