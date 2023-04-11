const Bid = require("../models/bid");

exports.createBid = async (req, res) => {
  try {
    const bid = new Bid(req.body);
    await bid.save();
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ message: "Failed to create bid" });
  }
};
exports.getBidsByProject = async (req, res) => {
    try {
      const bids = await Bid.find({ projectId: req.params.projectId });
      res.status(200).json(bids);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch bids" });
    }
  };
  
