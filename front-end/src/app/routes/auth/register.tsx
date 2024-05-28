import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Layout } from '@/components/layouts/auth-layout';
import { RegisterForm } from '@/features/auth/components/register-form';

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const [chooseTeam, setChooseTeam] = useState(false);

  return (
    <Layout title="Register your account">
      <RegisterForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : '/app'}`, {
            replace: true,
          })
        }
        chooseTeam={chooseTeam}
        setChooseTeam={() => setChooseTeam(!chooseTeam)}
      />
    </Layout>
  );
};
