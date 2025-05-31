'use server';

import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { ActivitiesLayout } from '@/widgets/activities/ui/activities-layout';
import { getActivitiesDates } from '@/widgets/activities/lib/dates-helpers';
import { getUpcominglActivities } from '@/widgets/activities/services/get-upcomingl-activities';
import { ActivityCard } from '@/entities/activity/server';

import styles from '../assets/styles.module.scss';
import { Months } from '@/widgets/activities/ui/months';

const cnUpcomingActivities = cn('UpcomingActivities');

export const UpcomingActivities: FC = async () => {
  const upcomingActivities = await getUpcominglActivities();
  const activitiesDates = getActivitiesDates(upcomingActivities);

  return (
    <ActivitiesLayout
      className={cnUpcomingActivities({ type: 'server' }, [
        styles.UpcomingActivities
      ])}
      title='Ближайшие туры'
      content={
        <div className={cnUpcomingActivities('Content', 'p-1')}>
          <div
            className={cnUpcomingActivities('Description', [
              'mt-3',
              'leading-4'
            ])}
          >
            <span
              className={cnUpcomingActivities('DescriptionText', [
                styles.UpcomingActivities_DescriptionText,
                'text-xl'
              ])}
            >
              выбирай свои даты на <Months dates={activitiesDates} />
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
