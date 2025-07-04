import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {prisma} from '@/prisma/client';

const authOptions: AuthOptions = {
        adapter: PrismaAdapter(prisma),
        providers: [
            GoogleProvider(
                {
                    clientId: process.env.GOOGLE_CLIENT_ID!,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
                }
            )
        ],
        session: {strategy: 'jwt'},
        callbacks: {
            async redirect({ url, baseUrl }) {
                return baseUrl;
            }
        }                         
    
    }

export default authOptions;
