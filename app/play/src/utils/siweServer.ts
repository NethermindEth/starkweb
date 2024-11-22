import { configureServerSideSIWE } from 'starkwebkit-next-siwe';

export const siweServer = configureServerSideSIWE({
  session: {
    cookieName: 'connectkit-next-siwe',
    password: process.env.SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});
