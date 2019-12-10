import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { mount, MountRendererProps, shallow } from 'enzyme';
import theme from '../styles/styled-components/theme';
import { AudioContext } from '../context/audioContext';
import { BrowserRouter } from 'react-router-dom';
