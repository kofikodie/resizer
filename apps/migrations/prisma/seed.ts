import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const users: Prisma.UserCreateInput[] = [
    {
        username: 'alice_wonderland',
        email: 'alice@risizer.com',
        password: 'alice-password',
        first_name: 'Alice',
        last_name: 'Wonderland',
        date_of_birth: new Date('1990-01-01'),
    },
    {
        username: 'bob_marley',
        email: 'bobmarley@resizer.com',
        password: 'bob-password',
        first_name: 'Bob',
        last_name: 'Marley',
        date_of_birth: new Date('1991-01-01'),
    },
]

const images: Prisma.PictureCreateInput[] = [
    {
        url: 'https://images.unsplash.com/photo-1612835362597-4b0b2b0b0b0b',
        user: {
            connect: {
                username: 'alice_wonderland',
            },
        },
    },
    {
        url: 'https://images.unsplash.com/photo-1612835362598-4b0b2b0b0b0b',
        user: {
            connect: {
                username: 'bob_marley',
            },
        },
    },
    {
        url: 'https://images.unsplash.com/photo-1612835362599-4b0b2b0b0b0b',
        user: {
            connect: {
                username: 'alice_wonderland',
            },
        },
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of users) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
    for (const i of images) {
        const image = await prisma.picture.create({
            data: i,
        })
        console.log(`Created image with id: ${image.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
