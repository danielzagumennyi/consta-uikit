import './CalendarSlider.css';

import React from 'react';
// import { useDrag, useDrop } from 'react-dnd';
import { addMonths, addYears, format, getYear, Locale } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { IconForward } from '../../../icons/IconForward/IconForward';
import { range } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

type CalendarMountLabelProps = PropsWithHTMLAttributes<
  {
    currentVisibleDate: Date;
    onChange?: (date: Date) => void;
    children?: never;
  },
  HTMLDivElement
>;

const cnCalendarSlider = cn('CalendarSlider');

const getMonthsData = (date: Date, locale: Locale = ruLocale) =>
  range(12).map((mount) => {
    const mountDate = addMonths(date, mount);
    return {
      date: mountDate,
      label: format(mountDate, 'MMM', { locale }),
    };
  });

const getSliderData = (date: Date, locale: Locale = ruLocale) => {
  const currentYear = new Date(getYear(date), 0, 1, 0, 0, 0, 0);
  const prevYear = addYears(currentYear, -1);
  const nextYear = addYears(currentYear, 1);
  return [prevYear, currentYear, nextYear].map((year) => ({
    label: format(year, 'yyyy', { locale }),
    date: year,
    mounths: getMonthsData(year, locale),
  }));
};

export const CalendarSlider: React.FC<CalendarMountLabelProps> = (props) => {
  const { currentVisibleDate, className, onChange, ...otherProps } = props;

  const data = getSliderData(currentVisibleDate);
  console.log(data);

  return (
    <div {...otherProps} className={cnCalendarSlider(null, [className])}>
      <Button
        className={cnCalendarSlider('Button', { direction: 'prev' })}
        view="ghost"
        iconLeft={IconForward}
      />
      <div className={cnCalendarSlider('Slider')}>
        <div className={cnCalendarSlider('SliderBody')}>
          {data.map((year) => (
            <div className={cnCalendarSlider('Year')}>
              {/* <Text className={cnCalendarSlider('YearLabel')}>{year.label}</Text> */}
              {year.mounths.map((mounth) => (
                <Text className={cnCalendarSlider('Mounth')} size="2xs" view="ghost" align="center">
                  {mounth.label}
                </Text>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Button
        className={cnCalendarSlider('Button', { direction: 'next' })}
        view="ghost"
        iconLeft={IconForward}
      />
    </div>
  );
};
