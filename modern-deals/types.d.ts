import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      role?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
