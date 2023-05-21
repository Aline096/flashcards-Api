import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany()
    },
    user: async (parent: any, args: { id: number }) => {
      const { id } = args
      return prisma.user.findUnique({ where: { id: Number(id) } })
    },
    flashcards: async () => {
      return prisma.flashcard.findMany()
    },
    flashcard: async (parent: any, args: { id: number }) => {
      const { id } = args
      return prisma.flashcard.findUnique({ where: { id: Number(id) } })
    },
  },
  Mutation: {
    registerUser: async (
      parent: any,
      args: { email: string; name: string; password: string }   ) => {
      const { email, name, password } = args
       const hashedPassword = await bcrypt.hash(password, 10)
       const user = await prisma.user.create({
         data: { name, email, password: hashedPassword },
       })
       return user
    },

     loginUser: async (parent: any,args: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user.id }, 'your-secret-key');
      return {
        token,
        user,
      }
    },
     
    createFlashcard: async (
      parent: any,
      args: { question: string; answer: string;context: any }
    ) => {
      const { question, answer, context} = args
      const { userId } = context
      if (!userId) {
        throw new Error('Unauthorized')
      }
      return prisma.flashcard.create({
        data: {
          question,
          answer,
          userId: parseInt(userId),
        } 
      })
    },
    updateFlashcard: async (
      parent: any,
      args: { id: number; question?: string; answer?: string; isDone?: boolean }
    ) => {
      const { id, question, answer, isDone } = args
      return prisma.flashcard.update({
        where: { id: Number(id) },
        data: {
          question,
          answer,
        },
      })
    },
    deleteFlashcard: async (parent: any, args: { id: number }) => {
      const { id } = args
      return prisma.flashcard.delete({ where: { id: Number(id) } })
    },
  },
  User: {
    flashcards: async (parent: any) => {
      const { id } = parent
      return prisma.user.findUnique({ where: { id } }).flashcards()
    },
  },
  Flashcard: {
    user: async (parent: any) => {
      const { userId } = parent
      return prisma.flashcard.findUnique({ where: { id: userId } }).user()
    },
  },
}

export default resolvers;
