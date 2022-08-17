import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ProfilePicture = (props: SvgProps) => (
  <Svg width={140} height={140} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M96.25 52.5a26.25 26.25 0 1 1-52.5 0 26.25 26.25 0 0 1 52.5 0Z" fill="#4090EF" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 70a70 70 0 1 1 140 0A70 70 0 0 1 0 70ZM70 8.75a61.25 61.25 0 0 0-47.845 99.487C28.367 98.227 42.044 87.5 70 87.5s41.624 10.719 47.845 20.737a61.242 61.242 0 0 0 7.35-64.783A61.247 61.247 0 0 0 70 8.75Z"
      fill="#4090EF"
    />
  </Svg>
);

export default ProfilePicture;
