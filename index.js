const express = require("express")
const app = express()

const cors = require("cors")

app.use(express.json())
app.use(cors({ origin: '*' }))

app.get("/",(req, res, next)=> res.send("You are not supposed to be here yet"))

app.post("/auth", ( req, res, next)=>{
  let r = req.headers.authorization
  console.log(r)
  if(r !== "Basic test") return res.json({ message: "Unauthorized" })
  else res.json({ message: "Understandable have a nice day" })
})


app.listen(9090);
