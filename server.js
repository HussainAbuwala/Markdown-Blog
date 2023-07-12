const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

// Connect to mongoDB
mongoose.connect('mongodb+srv://hussainabuwala1997:djFbd3fselGqdCF1@hussainapi.sslerxx.mongodb.net/Node-API?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected! to MongoDB')
}).catch((error) => {
    console.log(error)
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {articles: articles})
})

app.use( '/articles', articleRouter)

app.listen(5000) 