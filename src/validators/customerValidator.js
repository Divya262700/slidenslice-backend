exports.validateCustomer = (b) => {
  if (!b.name || !b.name.trim()) return 'Name is required';
  if (!/^[6-9]\d{9}$/.test(b.mobile || '')) return 'Enter a valid 10-digit mobile number';
  if (!b.dob) return 'Date of birth is required';
  return null;
};
