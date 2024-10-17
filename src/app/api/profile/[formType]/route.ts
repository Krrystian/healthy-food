import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { profileSchemas } from '@/app/lib/zod';
import { auth } from '@/app/auth';

export async function POST(req: Request, {params}: {params: {formType: string}}) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const formType = params.formType;
  
  if (!formType) {
    return NextResponse.json({ message: 'Invalid form type' }, { status: 400 });
  }

const data = await req.json();
  try {
    let updatedUser;
    let validationResult;

    try {
      validationResult = profileSchemas[formType as keyof typeof profileSchemas].parse(data);
    } catch (error: any) {
      return NextResponse.json({ message: error.errors }, { status: 400 });
    }


    switch (formType) {
      case 'image':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { image: (validationResult as { imageUrl: string }).imageUrl },
        });
        break;

      case 'name':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { name: (validationResult as { name: string }).name },
        });
        break;

      case 'description':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { description: (validationResult as unknown as { description: string }).description },
        });
        break;

      case 'email':
        const emailExists = await prisma.user.findUnique({
          where: { email: (validationResult as { email: string }).email },
        });
        if (emailExists && emailExists.id !== userId) {
          return NextResponse.json({ message: 'Podany e-mail już istnieje' }, { status: 400 });
        }

        const account = await prisma.account.findFirst({
          where: { userId: userId },
        });

        if (account && account.provider !== 'credentials') {
          return NextResponse.json({ message: 'Nie można zmienić e-maila.' }, { status: 400 });
        }

        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { email: (validationResult as { email: string }).email },
        });
        break;

      case 'password':
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user || user.password === null) {
          return NextResponse.json({ message: 'Nie można zaktualizować hasła' }, { status: 400 });
        }
        if ((validationResult as { password: string; confirmPassword: string }).password !== (validationResult as { password: string; confirmPassword: string }).confirmPassword) {
          return NextResponse.json({ message: 'Hasła nie są takie same' }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash((validationResult as { password: string; confirmPassword: string }).password, 10);
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });
        break;

      case 'notifications':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            notifications: (validationResult as { notifications: boolean }).notifications,
            ads: (validationResult as { ads: boolean }).ads,
          },
        });
        break;

      default:
        return NextResponse.json({ message: 'Nieprawidłowy typ formularza' }, { status: 400 });
    }

    const { emailVerified, password, createdAt, updatedAt, id, ...filteredUser } = updatedUser;
    return NextResponse.json({ message: 'Profil zaktualizowany pomyślnie', user: filteredUser });
  } catch (error) {
    console.error('Błąd podczas aktualizacji profilu:', error);
    return NextResponse.json({ message: 'Wewnętrzny błąd serwera' }, { status: 500 });
  }
}
