import React from 'react';

export default async function PrivateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className='flex flex-col grow'>{children}</div>;
}
