const express = require("express");
const port = 3333;
const app = express();

function calculateSum(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum = sum + i;
  }
  return sum;
}

app.get("/", (req, res) => {
  const number = req.query.n;
  const result = calculateSum(number);
  res.send(result.toString());
});

// app.post'

// app.put

app.listen(port, () => {
  console.log(`your server is listening on port ${port}`);
});

console.log("kaisa hai rey billu");
