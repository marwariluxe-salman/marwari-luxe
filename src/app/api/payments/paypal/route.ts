import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'USD', orderId } = await request.json();

    // PayPal API configuration
    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
    const PAYPAL_BASE_URL = process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === 'production' 
      ? 'https://api.paypal.com' 
      : 'https://api.sandbox.paypal.com';

    // Get PayPal access token
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    
    const tokenResponse = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      throw new Error('Failed to get PayPal access token');
    }

    // Create PayPal order
    const orderResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: orderId,
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: `Marwari Luxe Order #${orderId}`,
        }],
        application_context: {
          brand_name: 'Marwari Luxe',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?provider=paypal`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel?provider=paypal`,
        },
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      throw new Error(`PayPal order creation failed: ${orderData.message}`);
    }

    const approvalUrl = Array.isArray(orderData.links)
      ? orderData.links.find((link: { rel?: string; href?: string }) => link.rel === 'approve')?.href
      : undefined;

    return NextResponse.json({
      success: true,
      paypalOrderId: orderData.id,
      approvalUrl,
    });

  } catch (error) {
    console.error('PayPal payment creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}