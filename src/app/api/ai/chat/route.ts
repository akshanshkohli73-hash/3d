import { NextRequest, NextResponse } from 'next/server';
import { MockAIProvider } from '@/services/ai/providers/mockProvider';
import { INITIAL_USER_ACCOUNT } from '@/services/mockAccount';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, account, mode } = body;

    const userAccount = account || INITIAL_USER_ACCOUNT;
    const provider = new MockAIProvider();

    const response = await provider.chat(prompt || 'What should I do today?', {
      account: userAccount,
      mode: mode || 'GENERAL'
    });

    return NextResponse.json({ success: true, ...response });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal AI service error' },
      { status: 500 }
    );
  }
}
