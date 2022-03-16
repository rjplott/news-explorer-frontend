import React from 'react';
import { User } from '../shared/types';

export const CurrentUserContext = React.createContext<null | User>(null);
