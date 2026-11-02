const Offer = require('../models/Offer');
const { validateOffer } = require('../validators/offerValidator');

exports.list = async (req, res) => {
  res.json(await Offer.findAll());
};

exports.create = async (req, res) => {
  const msg = validateOffer(req.body);
  if (msg) return res.status(400).json({ message: msg });
  res.status(201).json(await Offer.create(req.body));
};

exports.update = async (req, res) => {
  const msg = validateOffer(req.body);
  if (msg) return res.status(400).json({ message: msg });
  const row = await Offer.update(req.params.id, req.body);
  if (!row) return res.status(404).json({ message: 'Offer not found' });
  res.json(row);
};

exports.remove = async (req, res) => {
  await Offer.remove(req.params.id);
  res.json({ message: 'Deleted' });
};
