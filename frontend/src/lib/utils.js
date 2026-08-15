import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatMessageTime = (date) => {
  return format(new Date(date), 'HH:mm');
};

export const formatMessageDate = (date) => {
  const d = new Date(date);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return format(d, 'dd/MM/yyyy');
};

export const formatLastSeen = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const truncateText = (text, maxLength = 30) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
