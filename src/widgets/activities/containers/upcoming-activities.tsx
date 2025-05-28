'use server';

import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { ActivitiesLayout } from '@/widgets/activities/ui/activities-layout';
import { getMonthesTitle } from '@/widgets/activities/lib/dates-helpers';
import { getUpcominglActivities } from '@/widgets/activities/services/get-upcomingl-activities';
import { ActivityCard } from '@/entities/activity/server';

import styles from '../assets/styles.module.scss';

const cnUpcomingActivities = cn('UpcomingActivities');

export const UpcomingActivities: FC = async () => {
  const upcomingActivities = await getUpcominglActivities();

  const monthsTitle = getMonthesTitle();

  return (
    <ActivitiesLayout
      className={cnUpcomingActivities({ type: 'server' }, [
        styles.UpcomingActivities
      ])}
      title='Ближайшие туры'
      content={
        <div className={cnUpcomingActivities('Content')}>
          <div className={cnUpcomingActivities('Description')}>
            <span className={cnUpcomingActivities('DescriptionText')}>
              Выбирай свои даты на {monthsTitle}
            </span>
          </div>
          <ul>
            {upcomingActivities.map(
              ({
                id,
                title,
                places,
                personPrice,
                startTime,
                finishTime,
                participants
              }) => (
                <li key={id}>
                  <ActivityCard
                    id={id}
                    title={title}
                    price={personPrice}
                    freePlaces={places - participants.length}
                    startTime={startTime}
                    finishTime={finishTime}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      }
    />
  );
};
