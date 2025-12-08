import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUsers } from '../api/get-users';
import { UsersTable } from './users-table';

export const UsersList = () => {
  const { data, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">No users found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          A list of all users in your system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable data={data.data} />
      </CardContent>
    </Card>
  );
};

