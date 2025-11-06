import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, timestamp, userAgent } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Log the subscription (in a real app, you would send this to your email service)
    console.log('Newsletter subscription:', {
      email,
      timestamp,
      userAgent,
      ip: request.headers.get('x-forwarded-for')
    });

    // For now, we'll just log and return success
    // In production, you would send an email to marwariluxe@gmail.com here

    return NextResponse.json({ 
      success: true, 
      message: 'Subscription successful' 
    });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}