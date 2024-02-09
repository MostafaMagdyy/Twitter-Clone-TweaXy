import { createAction } from '@reduxjs/toolkit';

export const setUser = createAction('user/setUser');
export const setToken = createAction('user/setToken');
export const setWebToken = createAction('user/setWebToken');
export const clearUser = createAction('user/clearUser');
export const setSocket = createAction('user/socket');
