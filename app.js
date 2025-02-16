const express = require('express');
const qr = require('qr-image');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send('URL is required');
    }
    const qr_svg = qr.image(url, { type: 'png' });
    res.type('png');
    qr_svg.pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
