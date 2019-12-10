import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import SmallPlayer from './smallPlayer';
import theme from '../../../styles/styled-components/theme';
import { AudioProvider } from '../../../context/audioContext';

describe('Small Player', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('No audio plays when audio src is empty', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AudioProvider>
          <SmallPlayer moods={['hello', 'test']} />
        </AudioProvider>
      </ThemeProvider>
    );
    wrapper.find({ id: 'trackThumbnail' }).at(0).simulate('click');
    wrapper.find({ id: 'trackThumbnail' }).at(0).simulate('mouseenter');
    console.log(wrapper.find({ id: 'playIcon' }).html());
  });
});
