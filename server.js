const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { exec } = require("child_process");

const app = express();
app.use(bodyParser.json());

const SECRET = "143d3d7c3abcd99bd2fe0f91ace852d59bd59854347c136c5bf923ce69cb4b1bff3f0f9ff4cd926b5acb0b0fda10edd2e5137f0647cfd408dc4edf43aea335f2"; // نفس السر اللي هتحطه في GitHub Webhook

// التحقق من توقيع GitHub عشان الأمان
function verifySignature(req, res, buf) {
    const signature = req.headers["x-hub-signature-256"];
    if (!signature) {
        throw new Error("No signature found");
    }
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(buf);
    const digest = "sha256=" + hmac.digest("hex");
    if (signature !== digest) {
        throw new Error("Invalid signature");
    }
}

// إعادة body-parser مع التحقق
app.use(bodyParser.json({ verify: verifySignature }));

app.post("/webhook", (req, res) => {
    console.log("Webhook received from GitHub!");

    // تشغيل git pull في مجلد المشروع
    exec("cd ../wa-platform && git pull origin main && npm i && pm2 restart wa-platform && pm2 restart worker", (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return res.status(500).send("Error pulling repo");
        }
        console.log(stdout);
        res.status(200).send("Pulled latest code!");
    });
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});
