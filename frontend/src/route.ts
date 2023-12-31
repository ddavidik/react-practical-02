import { Practical01Page, Practical02Page } from 'src/modules/static-pages';

export const route = {
  home: () => `/`,
  practical: (id: string) => `/practical/${id}`,
  about: () => `/about`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  userDetail: (userName: string) => `/${userName}`,
};

export const PRACTICALS = [
  // Practical pages
  { id: '01', PageComponent: Practical01Page },
  { id: '02', PageComponent: Practical02Page },
];
