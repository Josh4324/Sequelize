const router = require("express").Router();
const asyncWrapper = require("../utilities/async-wrapper").AsyncWrapper;
const SubscriptionService = require("../services/subscription-service");
const subscriptionService = new SubscriptionService();

//GET api/subscriptions
router.get("/", asyncWrapper( async(req, res) => {
    let userId = null;
    let subscriptions = await subscriptionService.findAll(userId);
    res.send(subscriptions);
}));

//GET api/subscriptions/:id
router.get("/:id", asyncWrapper( async(req, res) => {
    let id = req.params.id;
    let subscription = await subscriptionService.findOne(id);
    res.send(subscription);
}));

//POST api/subscriptions
router.post("/", asyncWrapper( async(req, res) => {
    let subscription = await subscriptionService.create(req.body);
    res.send(subscription);
}));

//DELETE api/subscriptions/:id
router.delete("/:id", asyncWrapper( async(req, res) => {
    let id = req.params.id;
    await subscriptionService.deleteOne(id);
    res.sendStatus(200);
}));

module.exports = router