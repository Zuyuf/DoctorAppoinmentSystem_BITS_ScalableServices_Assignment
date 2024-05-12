const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();


const doctorRoutes = require('./routes/doctorRoutes');
const { errorHandler } = require('./middlewares/errorHandler');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use('/api/doctor', doctorRoutes);

// Define a health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
