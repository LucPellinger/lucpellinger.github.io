/** "2018-09" → "09-2018" */
export const formatMonthYear = (isoMonth: string): string => {
	const [year, month] = isoMonth.split('-');
	return `${month}-${year}`;
};

/** Period label like "09-2018 to 08-2023", "since 01-2025", or null. */
export const formatPeriod = (
	from?: string,
	to?: string,
	current = false
): string | null => {
	if (!from) return null;
	const start = formatMonthYear(from);
	if (to) return `${start} to ${formatMonthYear(to)}`;
	return current ? `since ${start}` : start;
};
