const express = require("express");
const app = express();

app.use(express.json());

const users = [
  {
    name: "jonathan",
    kidneys: [
      {
        isHealthy: false,
      },
    ],
  },
];

app.get("/", (req, res) => {
  let userKidneys = users[0].kidneys;
  let totalKidneys = userKidneys.length;
  let arr = userKidneys.filter((x) => {
    if (x.isHealthy == true) {
      return true;
    }
  });
  let healthyKidneys = arr.length;
  let unHealthyKidneys = totalKidneys - healthyKidneys;
  res.json({ totalKidneys, healthyKidneys, unHealthyKidneys });
});

app.post("/", (req, res) => {
  users[0].kidneys.push(req.body);
  res.send("Done sir 👍");
});

app.put("/", (req, res) => {
  let unhealthyFlag = false;
  users[0].kidneys.forEach((x) => {
    if (x.isHealthy == false) {
      unhealthyFlag = true;
    }
  });

  if (unhealthyFlag) {
    let userKidneys = users[0].kidneys;
    users[0].kidneys = userKidneys.map((x) => {
      if (x.isHealthy == false) {
        x.isHealthy = true;
      }
      return x;
    });
    res.send("kidneys have been successfully replaced");
  } else {
    res.status(411).json({
      msg: "there were no unhealthy kidneys",
    });
  }
});

app.delete("/", (req, res) => {
  let unhealthyFlag = false;
  users[0].kidneys.forEach((x) => {
    if (x.isHealthy == false) {
      unhealthyFlag = true;
    }
  });

  if (unhealthyFlag) {
    users[0].kidneys = users[0].kidneys.filter((x) => {
      if (x.isHealthy == true) {
        return true;
      }
    });
    res.send("unhealthy kidneys have been removed");
  } else {
    res.status(411).send("there were no unhealthy kidneys");
  }
});

app.listen(1234);
