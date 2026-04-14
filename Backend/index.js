const ex = require('express');
const app = ex();

const cors = require('cors');
app.use(cors("http://localhost:3000"));

app.get('/', (req, res) => {
    res.send('Hello Folks!');
});

app.listen(3030, () => {
    console.log('Server is running on port 3030');
});