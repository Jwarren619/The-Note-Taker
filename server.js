const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

require('./routes/api')(app);
require('./routes/html')(app);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});