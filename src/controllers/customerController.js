const Customer = require('../models/Customer');
const { validateCustomer } = require('../validators/customerValidator');

const DUPLICATE = '23505'; // postgres unique violation

exports.list = async (req, res) => {
  res.json(await Customer.findAll());
};

exports.create = async (req, res) => {
  const msg = validateCustomer(req.body);
  if (msg) return res.status(400).json({ message: msg });
  try {
    res.status(201).json(await Customer.create(req.body));
  } catch (err) {
    if (err.code === DUPLICATE) return res.status(409).json({ message: 'Mobile number already exists' });
    throw err;
  }
};

exports.update = async (req, res) => {
  const msg = validateCustomer(req.body);
  if (msg) return res.status(400).json({ message: msg });
  try {
    const row = await Customer.update(req.params.id, req.body);
    if (!row) return res.status(404).json({ message: 'Customer not found' });
    res.json(row);
  } catch (err) {
    if (err.code === DUPLICATE) return res.status(409).json({ message: 'Mobile number already exists' });
    throw err;
  }
};

exports.remove = async (req, res) => {
  await Customer.remove(req.params.id);
  res.json({ message: 'Deleted' });
};
