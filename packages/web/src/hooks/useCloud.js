import { useNavigate } from 'react-router-dom';

import useautomatischInfo from './useautomatischInfo';

export default function useCloud(options) {
  const redirect = options?.redirect || false;
  const navigate = useNavigate();
  const { data: automatischInfo } = useautomatischInfo();

  const isCloud = automatischInfo?.data.isCloud;

  if (isCloud === false && redirect) {
    navigate('/');
  }

  return isCloud;
}
