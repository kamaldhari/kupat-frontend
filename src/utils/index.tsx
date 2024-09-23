import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const Debounce = (func: (...args: any[]) => void, delay: number) => {
	let debounceTimer: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			func(...args);
		}, delay);
	};
};


export const GetTimeDifference = (dateString: string) => {
	const startDate = dayjs(dateString);
	const currentDate = dayjs();
	const diff = dayjs.duration(currentDate.diff(startDate));

	const days = Math.floor(diff.asDays());
	const hours = Math.abs(Math.floor(diff.asHours() % 24)).toString().padStart(2, '0');
	const minutes = Math.abs(Math.floor(diff.minutes())).toString().padStart(2, '0');
	const seconds = Math.abs(Math.floor(diff.seconds())).toString().padStart(2, '0');

	if (days > 0) {
		return `${days} ימים ו ${hours}:${minutes}:${seconds}`;
	} else {
		return `${hours}:${minutes}:${seconds}`;
	}
};
