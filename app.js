require('dotenv').config();

const Express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")
const axios = require('axios')

const app = Express();
const router = Express.Router();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/getDataFromBackbone", (req, res) => {

  axios.get(`${process.env.BACKBONE_API_URI}/api/index`)
    .then(response => {
      res.json(response.data)
    })
    .catch(error => {
      console.error("Error occurred: " + error)
    })

})

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  // Data.find((err, data) => {
  //   if (err) return res.json({ success: false, error: err });                                   
  //   return res.json({ success: true, data: data });
  // });

  return res.json({
    success: true,
    data: [
      {
        id: 0, 
        message: 'first row of data'
      }, 
      {
        id: 1, 
        message: 'second row of data'
      }, 
      {
        id: 2, 
        message: 'third row of data'
      }
    ] 
  })

});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;

  // Data.findOneAndUpdate(id, update, err => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true });
  // });

  return res.json({
    success: true
  })

});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  // Data.findOneAndDelete(id, err => {
  //   if (err) return res.send(err);
  //   return res.json({ success: true });
  // });

  return res.json({
    success: true
  })

});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  // let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  // data.message = message;
  // data.id = id;
  // data.save(err => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true });
  // });

  return res.json({
    success: true
  })

});

// append /api for our http requests
app.use("/api", router);

module.exports = app