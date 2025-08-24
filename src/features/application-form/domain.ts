export type ApplicationData = {
  entityName: string;
  entityId: string;
  entityType: 'tour' | 'activity';
};

export type Props = {
  appData?: ApplicationData;
};
