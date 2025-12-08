import { MainLayout } from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';

import { UsersList } from '../components/users-list';

export const UsersRoute = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">Manage your users</p>
          </div>
          <Button>Add User</Button>
        </div>
        <UsersList />
      </div>
    </MainLayout>
  );
};

