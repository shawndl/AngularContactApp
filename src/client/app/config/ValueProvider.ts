import { ValueProviderInterface } from './ValueProviderInterface';
import {InjectionToken} from '@angular/core';

export const APP_CONFIG = new InjectionToken<ValueProviderInterface>('config');

export const CONFIG: ValueProviderInterface = {
  // apiEndPoint: 'http://localhost:3000/api/'
  apiEndPoint: 'https://pure-stream-24765.herokuapp.com/api/'
};
