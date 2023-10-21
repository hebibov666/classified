import { useState } from 'react';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';

function Register() {
  const [User, setUser] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  const CreateUser = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Usercreate = async () => {
    setPending(true);
    setError(null);

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Adınızı daxil edin'),
      email: Yup.string().email('Düzgün epoçt ünvanı daxil edin').required('Zəhmət olmasa epoçt ünvanı daxil edin'),
      password: Yup.string().min(8, 'Şifrə ən az 8 simvol olmalıdır').required('Şifrə daxil edin'),
    });

    try {
      await validationSchema.validate(User, { abortEarly: false });

      const response = await fetch('https://project1-3q4c.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(User),
      });

      if (!response.ok) {
        throw new Error('HTTP Xətası: ' + response.status);
      }

      const responseData = await response.json();
      localStorage.setItem('user', JSON.stringify(responseData.token));
      setPending(false);
      router.push('/');
    } catch (err) {
      if (Yup.ValidationError.isError(err)) {
        const yupErrors = {};
        err.inner.forEach((error) => {
          yupErrors[error.path] = error.message;
        });
        setValidationErrors(yupErrors);
      } else {
        console.error('Xəta:', err);
        setError('Qeydiyyat zamanı xəta baş verdi', err);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className='flex flex-col items-center gap-[10px] w-full'>
      <TextField
        id="outlined-password-input"
        label="Ad"
        name='name'
        value={User.name || ''}
        type='text'
        autoComplete='current-password'
        size='small'
        required
        className='w-full'
        onChange={CreateUser}
      />
      {validationErrors.name && (
        <p className='text-red-600 text-start mt-[-5px] w-full pl-[2px]'>{validationErrors.name}</p>
      )}
      <TextField
        id="outlined-password-input"
        label="Email"
        type='text'
        name='email'
        value={User.email || ''}
        autoComplete='current-password'
        size='small'
        required
        className='w-full'
        onChange={CreateUser}
      />
      {validationErrors.email && (
        <p className='text-red-600 text-start w-full pl-[2px]'>{validationErrors.email}</p>
      )}
      <TextField
        id="outlined-password-input"
        label="Şifrə"
        type='password'
        name='password'
        value={User.password || ''}
        size='small'
        required
        className='w-full'
        onChange={CreateUser}
      />
      {validationErrors.password && (
        <p className='text-red-600 text-start w-full pl-[2px]'>{validationErrors.password}</p>
      )}
      {error != null ? (
        <p className='text-red-600 text-start w-full pl-[2px]'>{error}</p>
      ) : null}
      <button
        onClick={Usercreate}
        className='outline-none bg-blue-500 rounded-[5px] w-full h-[40px] flex items-center justify-center p-[5px] text-white'
      >
        {pending === true ? 'Qeydiyyat tamamlanır...' : 'Tamamla'}
      </button>
    </div>
  );
}

export default Register;
