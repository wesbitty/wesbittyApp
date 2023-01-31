import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { hashPassword } from '@components/auth/passwords'
import prisma from 'wesbitty/database'

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const admin = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        role: 'admin',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return res.status(200).json({
      message: 'Admin created.',
      data: admin,
    })
  } catch (error) {
    console.error('[api] auth/administrator/create', error)
    return res.status(500).json({ statusCode: 500, message: error.message })
  }
}

export default nc().post(post)
