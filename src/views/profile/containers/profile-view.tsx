import { FC } from 'react';
import { ProfileLayout } from '@/views/profile/ui/profile-view-layout';
import { UserDomain } from '@/entities/user';

type ProfileViewProps = {
  user: UserDomain.UserEntity;
};

export const ProfileView: FC<ProfileViewProps> = ({ user }) => {
  return <ProfileLayout id={user.id} role={user.role} />;
};
