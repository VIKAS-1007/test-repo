const { on } = require("events");
const express = require("express");
const { urlToHttpOptions } = require("url");
const port = 5555;

const app = express();

let users = [
  {
    name: "Jonathan",
    kidneys: [
      {
        isHealthy: false,
      },
    ],
  },
];

app.get("/", (req, res) => {
  let userKidney = users[0].kidneys;
  let totalKidneys = userKidney.length;
  let arr = userKidney.filter((x) => {
    return x.isHealthy == true;
  });

  let healthyKidney = arr.length;
  console.log(healthyKidney);

  let unhealthyKidney = totalKidneys - healthyKidney;
  res.json({ totalKidneys, healthyKidney, unhealthyKidney });
});

app.use(express.json());

app.post("/", (req, res) => {
  users[0].kidneys.push(req.body);
  res.send("Done sir 👍 ");
});

app.put("/", (req, res) => {
  let oneUnhealthyKidney = false;
  users[0].kidneys.forEach((x) => {
    if (x.isHealthy == false) {
      oneUnhealthyKidney = true;
    }
  });

  if (oneUnhealthyKidney) {
    let userKidney = users[0].kidneys;
    userKidney.map((x) => {
      if (x.isHealthy == false) {
        x.isHealthy = true;
      }
    });
    res.send("updated 👍");
  } else {
    res.status(411).json({ msg: "you have no bad kidneys" });
  }
});

app.delete("/", (req, res) => {
  let oneUnhealthyKidney = false;
  users[0].kidneys.forEach((x) => {
    if (x.isHealthy == false) {
      oneUnhealthyKidney = true;
    }
  });

  if (oneUnhealthyKidney) {
    let healthyArr = users[0].kidneys.filter((x) => {
      if (x.isHealthy == true) {
        return true;
      }
    });
    users[0].kidneys = healthyArr;
    res.send("unhealthy kidneys have been removed");
  } else {
    res.sendStatus(411).send("there are no unhealthy kidneys");
  }
});

app.listen(port);
