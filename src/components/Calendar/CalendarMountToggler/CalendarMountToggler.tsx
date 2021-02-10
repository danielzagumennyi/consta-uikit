import './CalendarMountToggler.css';

import React from 'react';

import { IconForward } from '../../../icons/IconForward/IconForward';
import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

type CalendarMountTogglerProps = PropsWithJsxAttributes<
  {
    prevOnClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    nextOnClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    label: string;
    children?: never;
  },
  'div'
>;

const cnCalendarMountToggler = cn('CalendarMountToggler');

export const CalendarMountToggler: React.FC<CalendarMountTogglerProps> = (props) => {
  const { label, className, prevOnClick, nextOnClick, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={cnCalendarMountToggler(
        { withPrevButton: Boolean(prevOnClick), withNextButton: Boolean(nextOnClick) },
        [className],
      )}
    >
      {prevOnClick && (
        <Button
          className={cnCalendarMountToggler('Button', { direction: 'prev' })}
          onClick={prevOnClick}
          iconLeft={IconForward}
          size="s"
          view="clear"
          iconSize="s"
        />
      )}
      <Text
        className={cnCalendarMountToggler('Label')}
        as="span"
        size="s"
        align="center"
        weight="bold"
      >
        {label}
      </Text>
      {nextOnClick && (
        <Button
          className={cnCalendarMountToggler('Button', { direction: 'next' })}
          onClick={nextOnClick}
          iconLeft={IconForward}
          size="s"
          view="clear"
          iconSize="s"
        />
      )}
    </div>
  );
};
