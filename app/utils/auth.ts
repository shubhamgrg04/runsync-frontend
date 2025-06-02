import type { LoginResponse } from '../types/auth';

export const AUTH_EVENT = 'auth-state-changed';

export const dispatchAuthEvent = (user: LoginResponse['user'] | null) => {
  const event = new CustomEvent(AUTH_EVENT, { detail: user });
  window.dispatchEvent(event);
}; 