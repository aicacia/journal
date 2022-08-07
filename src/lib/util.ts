import { hashOf } from '@aicacia/hash';
import { XorShiftRng } from '@aicacia/rand';
import type { IJournalEntry } from './state/journal';

export function createInsecureID() {
	return Math.random().toString(36).substring(2);
}

export function getYearMonth(date: Date) {
	return date.toISOString().substring(0, 7);
}

export function getDaysInMonth(date: Date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getDateSortName(locale: string, date: Date) {
	return date.toLocaleDateString(locale, { month: 'short', weekday: 'short', day: 'numeric' });
}

export function getMonthSortName(locale: string, date: Date) {
	return date.toLocaleDateString(locale, { month: 'short' });
}

export function getMonthLongName(locale: string, date: Date) {
	return date.toLocaleDateString(locale, { month: 'long' });
}

export function getDaySortName(locale: string, date: Date) {
	return date.toLocaleDateString(locale, { weekday: 'short' });
}

export function getDayName(locale: string, date: Date) {
	return date.toLocaleDateString(locale, { weekday: 'long' });
}

export function isSameDay(a: Date, b: Date) {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

const COLOR_OF_RNG = new XorShiftRng();

export function colorOf(value: any): string {
	COLOR_OF_RNG.setSeed(hashOf(value));
	return `rgb(${COLOR_OF_RNG.nextFloatInRange(0, 192)}, ${COLOR_OF_RNG.nextFloatInRange(
		0,
		192
	)}, ${COLOR_OF_RNG.nextFloatInRange(0, 192)})`;
}

export function getLocation(): Promise<GeolocationCoordinates> {
	return new Promise((resolve, reject) =>
		navigator.geolocation.getCurrentPosition((location) => resolve(location.coords), reject)
	);
}

export async function getLocationName(coords: GeolocationCoordinates): Promise<string> {
	const res = await fetch(
		`https://nominatim.openstreetmap.org/reverse.php?lat=${coords.latitude}&lon=${coords.longitude}&zoom=18&format=jsonv2`
	);
	if (!res.ok) {
		throw new Error(await res.text());
	}
	const result = await res.json();
	return result.display_name;
}

export function sortByDate(a: IJournalEntry, b: IJournalEntry) {
	return b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds();
}
