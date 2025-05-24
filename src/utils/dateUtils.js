export function isOverdue(dueDate) {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  // Check if due date is before today (ignore time)
  return due.setHours(0,0,0,0) < today.setHours(0,0,0,0);
}
