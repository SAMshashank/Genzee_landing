import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const bcrypt = require('bcryptjs');
import  Admin  from '../schema/Admin.model'; // Import your Admin model

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        const admin = await Admin.findOne({ email }); // Fetch admin from database
        if (!admin) throw new Error('No user found with this email');

        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) throw new Error('Invalid credentials');

        return { id: admin.id, name: admin.name, email: admin.email };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  secret: 'jkwdhkwhjdhjkhdjw', // Ensure this is set in your .env file
  session: {
    strategy: 'jwt',
  },
});
