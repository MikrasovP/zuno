import { PrismaClient } from '../../generated/prisma'

export const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)
  }
}

testConnection()

process.on('beforeExit', async () => {
  await prisma.$disconnect()
})