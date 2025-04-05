import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as BaseThemeProvider } from '@mui/material/styles';
import clone from 'lodash/clone';
import set from 'lodash/set';
import * as React from 'react';

import useautomatischInfo from 'hooks/useautomatischInfo';
import useautomatischConfig from 'hooks/useautomatischConfig';
import { defaultTheme, mationTheme } from 'styles/theme';

const overrideIfGiven = (theme, key, value) => {
  if (value) {
    set(theme, key, value);
  }
};

const customizeTheme = (theme, config) => {
  // `clone` is needed so that the new theme reference triggers re-render
  const shallowDefaultTheme = clone(theme);

  overrideIfGiven(
    shallowDefaultTheme,
    'palette.primary.main',
    config.palettePrimaryMain,
  );

  overrideIfGiven(
    shallowDefaultTheme,
    'palette.primary.light',
    config.palettePrimaryLight,
  );

  overrideIfGiven(
    shallowDefaultTheme,
    'palette.primary.dark',
    config.palettePrimaryDark,
  );

  overrideIfGiven(
    shallowDefaultTheme,
    'palette.footer.main',
    config.footerBackgroundColor,
  );

  overrideIfGiven(
    shallowDefaultTheme,
    'palette.footer.text',
    config.footerTextColor,
  );

  return shallowDefaultTheme;
};

const ThemeProvider = ({ children, ...props }) => {
  const { data: automatischInfo, isPending: isautomatischInfoPending } =
    useautomatischInfo();
  const isMation = automatischInfo?.data.isMation;
  const { data: configData, isLoading: configLoading } = useautomatischConfig();
  const config = configData?.data;

  const customTheme = React.useMemo(() => {
    const installationTheme = isMation ? mationTheme : defaultTheme;

    if (configLoading || isautomatischInfoPending) return installationTheme;

    const customTheme = customizeTheme(installationTheme, config || {});

    return customTheme;
  }, [configLoading, config, isMation, isautomatischInfoPending]);

  // TODO: maybe a global loading state for the custom theme?
  if (isautomatischInfoPending || configLoading) return <></>;

  return (
    <BaseThemeProvider theme={customTheme} {...props}>
      <CssBaseline />

      {children}
    </BaseThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
