import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'USD', orderId, customerEmail } = await request.json();

    // Wise API configuration
    const WISE_API_TOKEN = process.env.WISE_API_TOKEN;
    const WISE_BASE_URL = process.env.NEXT_PUBLIC_WISE_ENVIRONMENT === 'live' 
      ? 'https://api.wise.com' 
      : 'https://api.sandbox.transferwise.tech';

    // Create Wise quote
    const quoteResponse = await fetch(`${WISE_BASE_URL}/v2/quotes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WISE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceCurrency: currency,
        targetCurrency: currency,
        sourceAmount: amount,
        profile: process.env.WISE_PROFILE_ID, // You'll need to set this
      }),
    });

    const quoteData = await quoteResponse.json();

    if (!quoteResponse.ok) {
      throw new Error('Failed to create Wise quote');
    }

    // Create Wise recipient
    const recipientResponse = await fetch(`${WISE_BASE_URL}/v1/accounts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WISE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: currency,
        type: 'email',
        profile: process.env.WISE_PROFILE_ID,
        accountHolderName: 'Marwari Luxe',
        details: {
          email: process.env.WISE_RECIPIENT_EMAIL || 'payments@marwariluxe.com',
        },
      }),
    });

    const recipientData = await recipientResponse.json();

    // Create Wise transfer
    const transferResponse = await fetch(`${WISE_BASE_URL}/v1/transfers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WISE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetAccount: recipientData.id,
        quoteUuid: quoteData.id,
        customerTransactionId: orderId,
        details: {
          reference: `Marwari Luxe Order #${orderId}`,
          transferPurpose: 'verification.transfers.purpose.pay.bills',
          sourceOfFunds: 'verification.source.of.funds.other',
        },
      }),
    });

    const transferData = await transferResponse.json();

    if (!transferResponse.ok) {
      throw new Error('Failed to create Wise transfer');
    }

    return NextResponse.json({
      success: true,
      transferId: transferData.id,
      paymentUrl: `${WISE_BASE_URL}/transfers/${transferData.id}/payments`,
      reference: transferData.reference,
    });

  } catch (error) {
    console.error('Wise payment creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Wise integration requires business account setup' 
      },
      { status: 500 }
    );
  }
}