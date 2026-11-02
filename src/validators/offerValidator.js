const OFFER_TYPES = ['Percentage discount', 'Flat amount off', 'Fixed price item', 'Buy 1 Get 1', 'Free item', 'Combo offer'];
const VALUE_TYPES = ['Percentage discount', 'Flat amount off', 'Fixed price item'];
const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

exports.VALUE_TYPES = VALUE_TYPES;

exports.validateOffer = (b) => {
  if (!b.name || !b.name.trim()) return 'Offer name is required';
  if (!OFFER_TYPES.includes(b.type)) return 'Select a valid offer type';
  if (VALUE_TYPES.includes(b.type)) {
    const v = Number(b.value);
    if (!v || v <= 0) return 'Enter a value';
    if (b.type === 'Percentage discount' && v > 100) return 'Cannot be more than 100%';
  }
  if (b.from && b.to && b.to < b.from) return 'End date must be after start date';
  if (!b.tFrom !== !b.tTo) return 'Fill both times, or leave both empty';
  if (b.tFrom && b.tTo && b.tTo <= b.tFrom) return 'End time must be after start time';
  if (b.days && !Array.isArray(b.days)) return 'Invalid days';
  if ((b.days || []).some((d) => !DAY_NAMES.includes(d))) return 'Invalid days';
  if (b.status && !['active', 'inactive'].includes(b.status)) return 'Invalid status';
  return null;
};
