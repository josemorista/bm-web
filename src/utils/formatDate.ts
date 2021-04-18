const dateFormatter = new Intl.DateTimeFormat('en-Us', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric'
});

export const formatDate = (date: string | Date): string => {
	if (typeof date === 'string') {
		return dateFormatter.format(new Date(date));
	}
	return dateFormatter.format(date);
};