const cors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // التعامل مع preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // إنهاء الرد فورًا
    }

    next();
};

exports.cors = cors;
