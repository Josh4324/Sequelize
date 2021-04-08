const express = require("express");
const Middleware = require("./middleware/middleware");
const ErrorHandlingMiddleware = require("./middleware/error-handling")


const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


const PlansController = require("./controllers/plans-controller")
const SubscriptionController = require("./controllers/subscription-controller")

Middleware(app);
app.use("/api/plans", PlansController )
app.use("api/subscription", SubscriptionController)

//Handling unhandle routes
app.all("*", (req, res) => {
  return res.status(404).json({
      status: "Error 404",
      message: `Route not found. Can't find ${req.originalUrl} on this server`,
  });
});


// Error middleware mst be defined after other middlewares
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});