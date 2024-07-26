import { getISOWeek } from 'date-fns';

const HOURS_OFFSET_FOR_WORKWEEK = -11;

export const getCurrentWorkWeek = () => getISOWeek(new Date().getTime() - HOURS_OFFSET_FOR_WORKWEEK * 3600 * 1000);
