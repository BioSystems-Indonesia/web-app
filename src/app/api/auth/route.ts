import { NextResponse } from 'next/server';
import { login } from '@/usecases/authUseCase';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username) {
      throw new Error("username required")
    }
    const user = await login(username, password);

    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message },
      { status: 401 }
    );
  }
}
