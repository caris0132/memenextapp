import httpProxy from "http-proxy";
const proxy = httpProxy.createProxyServer();
export const config = {
    api: {
        bodyParser: false
    }
}
export default function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(403).json({ message: "method not supported" });
    }

    return new Promise((resolve) => {
        req.headers.cookie = "";
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: false,
        });
        proxy.once("proxyRes", () => {
            resolve(true);
        });
    });
}