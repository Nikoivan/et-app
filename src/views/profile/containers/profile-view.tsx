import { FC } from 'react';

import { SessionEntity } from '@/entities/user/domain';
import { ProfileLayout } from '@/views/profile/ui/profile-view-layout';

type ProfileViewProps = {
  session: SessionEntity;
};

export const ProfileView: FC<ProfileViewProps> = ({ session }) => {
  return <ProfileLayout id={session.id} role={session.role} />;
};
