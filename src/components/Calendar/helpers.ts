import {
  addDays,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  Locale,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import ruLocale from 'date-fns/locale/ru';

import { range } from '../../utils/array';
import { isDateRange, isOnlyOneDateInRange } from '../../utils/date';
import { isDefined, isNotNil } from '../../utils/type-guards';
import { DateRange } from '../../utils/types/Date';

export const dateComparer = (a?: Date, b?: Date): number =>
  (a?.getTime() ?? 0) - (b?.getTime() ?? 0);

export const getStartAndEndDate = (date1: Date, date2: Date): { start: Date; end: Date } => {
  const [start, end] = [date1, date2].sort(dateComparer);

  return { start, end };
};

export const isDateHighlighted = ({
  date,
  value,
  hoveredDate,
}: {
  date: Date;
  hoveredDate?: Date;
  value?: Date | DateRange;
}): boolean => {
  if (!hoveredDate || !isDateRange(value) || !isOnlyOneDateInRange(value)) {
    return false;
  }

  const [startDate, endDate] = value;

  if (isDefined(startDate)) {
    return isWithinInterval(date, getStartAndEndDate(startDate, hoveredDate));
  }

  if (isDefined(endDate)) {
    return isWithinInterval(date, getStartAndEndDate(endDate, hoveredDate));
  }

  return false;
};

export const isDateSelected = ({ date, value }: { date: Date; value?: Date }): boolean => {
  return value ? isSameDay(value, date) : false;
};

export const isValueSelected = ({
  date,
  value,
}: {
  date: Date;
  value?: Date | DateRange;
}): boolean => {
  if (isDateRange(value)) {
    if (value[0] && value[1]) {
      const { start, end } = getStartAndEndDate(value[0], value[1]);
      return isWithinInterval(date, { start, end });
    }

    return isDateSelected({ date, value: value[0] || value[1] });
  }
  return isDateSelected({ date, value });
};

export const isValueSelectedBackwards = ({
  value,
  hoveredDate,
}: {
  value?: Date | DateRange;
  hoveredDate?: Date;
}): boolean | undefined => {
  return (
    hoveredDate &&
    isDateRange(value) &&
    isOnlyOneDateInRange(value) &&
    ((isDefined(value[0]) && isBefore(hoveredDate, value[0])) ||
      (isDefined(value[1]) && isBefore(hoveredDate, value[1])))
  );
};

const isSelected = ({ date, value }: { date: Date; value?: Date | DateRange }): boolean => {
  if (!value) {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.find((item) => (item ? date.getTime() === item.getTime() : false));
  }

  return date.getTime() === value.getTime();
};

/**
 * формирование дней месяца
 * @param {Props} Props
 * @param {Date} Props.date дата месяца
 * @param {Locale} Props.locale локализация
 * @param {(value: Date) => void} Props.handleDayClick событие которое попадет в onClick каждого дня
 */

export const getMonthDays = (props: {
  date: Date;
  locale?: Locale;
  handleDayClick?: (value: Date) => void;
  value?: Date | DateRange;
}): {
  date: Date;
  disabled?: boolean;
  onClick?: () => void;
  number: string;
  selected?: boolean;
}[] => {
  const { date, locale = ruLocale, handleDayClick, value } = props;
  const currentMonth = date.getMonth();
  const startDate = startOfWeek(startOfMonth(date), {
    locale,
    weekStartsOn: locale.options?.weekStartsOn,
  });
  const endDate = endOfWeek(endOfMonth(date), {
    locale,
    weekStartsOn: locale.options?.weekStartsOn,
  });
  const diffDays = differenceInDays(endDate, startDate) + 1;

  return range(diffDays).map((index) => {
    const date = addDays(startDate, index);
    const number = format(date, 'd');

    if (date.getMonth() === currentMonth) {
      return {
        date,
        number,
        onClick: handleDayClick ? () => handleDayClick(date) : undefined,
        selected: isSelected({ date, value }),
      };
    }

    return {
      date,
      number,
      disabled: true,
    };
  });
};

export type TypeProp = 'date' | 'date-range';

export type ValueByType<TYPE extends TypeProp> = TYPE extends 'date' ? Date : DateRange;

type getHandleSelectDateProps<TYPE extends TypeProp> = {
  type: TypeProp;
  value?: ValueByType<TYPE>;
  onChange?: (value: ValueByType<TYPE>) => void;
  minDate?: Date;
  maxDate?: Date;
};

type getHandleSelectDate = <TYPE extends TypeProp>(
  props: getHandleSelectDateProps<TYPE>,
) => (value: Date) => void;

export const getHandleSelectDate: getHandleSelectDate = ({
  type,
  value: valueProp,
  minDate,
  maxDate,
  onChange: onChangeProp,
}) => {
  let handleSelectDate: (date: Date) => void;
  if (type === 'date-range') {
    handleSelectDate = (date: Date): void => {
      // Привел к типам так как TS не понимает что при указанном `type`
      // календаря всегда будет падать определенный тип `value`
      const onChange = onChangeProp as (value: ValueByType<'date-range'>) => void;
      const value = (valueProp || []) as ValueByType<'date-range'>;

      if (minDate && maxDate) {
        if (!isWithinInterval(date, { start: minDate, end: maxDate }) || !isNotNil(value)) {
          return;
        }
      }

      if (!isOnlyOneDateInRange(value)) {
        return onChange([date, undefined]);
      }

      const [startDate, endDate] = value;

      if (isDefined(startDate)) {
        return onChange(startDate > date ? [date, startDate] : [startDate, date]);
      }

      if (isDefined(endDate)) {
        return onChange(endDate > date ? [date, endDate] : [endDate, date]);
      }
    };
  } else {
    const onChange = onChangeProp as (value: ValueByType<'date'>) => void;

    handleSelectDate = (date: Date): void => {
      if (minDate && maxDate) {
        if (!isWithinInterval(date, { start: minDate, end: maxDate })) {
          return;
        }
      }

      return onChange(date);
    };
  }

  return handleSelectDate;
};

export const getMonthTitle = (date: Date): string => {
  return format(date, 'LLLL', { locale: ruLocale });
};

export const getMouthLabelWithYear = (date: Date): string => {
  return `${getMonthTitle(date)} ${date.getFullYear()}`;
};

export const getdaysOfWeek = (locale: Locale = ruLocale): string[] => {
  const now = new Date();
  return eachDayOfInterval({
    start: startOfWeek(now, { locale }),
    end: endOfWeek(now, { locale }),
  }).map((date) => format(date, 'EEEEEE', { locale }));
};
