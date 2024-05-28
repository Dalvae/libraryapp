import { ContentLayout } from '@/components/layouts';
import { useUser } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';

export const DashboardRoute = () => {
  const user = useUser();
  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl">
        Welcome <b>{`${user.data?.firstname} ${user.data?.lastname}`}</b>
      </h1>
      <h4 className="my-3">
        Your role is : <b>{user.data?.role}</b>
      </h4>
      <p className="font-medium">En esta aplicacion:</p>
      {user.data?.role === ROLES.user && (
        <ul className="my-4 list-inside list-disc">
          <li>Crear Libros</li>
          <li>Editar tus propios items</li>
        </ul>
      )}
      {user.data?.role === ROLES.admin && (
        <ul className="my-4 list-inside list-disc">
          <li>Crear Libros</li>
          <li>Editar tus propios items</li>
          <li>Borrar usuarios</li>
          <li>Editar todos los items</li>
          <li>Borrar items</li>
        </ul>
      )}
    </ContentLayout>
  );
};
