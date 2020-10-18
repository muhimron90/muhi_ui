import React from 'react';
import { Button } from '../lib/m-button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Button',
  component: Button,
  
};

export const Basic = ({ label, onPress }) => (
         <Button onPress={onPress}>{label} </Button>
);

export const Secondary = ({ label, onPress }) => (
         <div style={{ background: '#f1c40f', padding: 10 }}>
           <Button onPress={onPress} variant="secondary">
             {label}{' '}
           </Button>
         </div>
       );
Basic.args = {
  label: 'My Button',
  onPress: action('basic')
};
Secondary.args = {
  label: 'Secondary Button',
  onPress: action('secondary'),
};