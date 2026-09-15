const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url')
const app = express();

const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/url', urlRoute);
app.get('/:shortId',
  async (req,res)=>{
const shortId=req.params.shortId;
const entry = await URL.findOneAndUpdate(
  {
    shortId
  },{$push : {
    visitHistory: {
      timestamo : Date.now()
    }
  },
}
)
res.redirect(entry.redirectURL)
})
connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});