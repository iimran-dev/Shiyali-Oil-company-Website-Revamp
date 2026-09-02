import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, country, requirement } = body;

    if (!name || !company || !country || !requirement) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log('New requirement submission:', { name, company, country, requirement });

    return NextResponse.json({
      success: true,
      message: 'Your requirement has been submitted successfully. Our team will contact you within 24 hours.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
