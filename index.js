import mongoose from "mongoose";
import express from 'express'
import ejs from 'ejs'

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/formDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const FormSchema = new mongoose.Schema({
    name: String,
    number: Number,
    email: String
});

const Form = mongoose.model('Form', FormSchema)

app.get('/', function (req, res) {
    res.render('form')
})

app.get('/thank-you', function (req, res) {
    res.render('thank-you')
})

app.post('/', function (req, res) {
    const userName = req.body.name;
    const userNum = req.body.number;
    const email = req.body.email;
    const formData = new Form({
        name: userName,
        number: userNum,
        email: email
    })
    formData.save()
    res.redirect('/thank-you')
})

app.listen(port, () => console.log(`listening at port ${port}`))