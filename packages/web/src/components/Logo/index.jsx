import * as React from 'react';

import CustomLogo from 'components/CustomLogo/index.ee';
import DefaultLogo from 'components/DefaultLogo';
import useautomatischConfig from 'hooks/useautomatischConfig';

const Logo = () => {
  const { data: configData, isLoading } = useautomatischConfig();
  const config = configData?.data;
  const logoSvgData = config?.logoSvgData;

  if (isLoading && !logoSvgData) return <React.Fragment />;

  if (logoSvgData) return <CustomLogo />;

  return <DefaultLogo />;
};

export default Logo;
