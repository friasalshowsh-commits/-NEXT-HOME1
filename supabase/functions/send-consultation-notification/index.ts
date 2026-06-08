// Supabase Edge Function: send-consultation-notification
// Deploy this file to Supabase Functions to process email notifications securely
// Command: supabase functions deploy send-consultation-notification

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const ADMIN_NOTIFICATION_EMAIL = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') || 'info@nexthome-group.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse the payload. Supabase Database Webhooks send payload with "record" containing the new row.
    const body = await req.json()
    const record = body.record || body

    const full_name = record.full_name || record.fullName;
    const email = record.email;
    const phone = record.phone;
    const company = record.company;
    const message = record.message;
    const created_at = record.created_at || record.createdAt;

    if (!record || !full_name) {
      return new Response(JSON.stringify({ error: 'Missing row data in payload', received: body }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY environment variable is not defined on Supabase Secrets.')
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'No secret key defined for Resend, skipping email sending. Set Supabase secrets first.' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Call Resend API via Fetch
    // We use "onboarding@resend.dev" temporarily for unverified Resend account testing. 
    // If you verify your domain, you can change this to "notifications@nexthome-group.com".
    const senderEmail = Deno.env.get('SENDER_EMAIL') || 'onboarding@resend.dev';
    
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `NEXT HOME <${senderEmail}>`,
        to: [ADMIN_NOTIFICATION_EMAIL],
        subject: `Strategic Consultation Inquiry: ${full_name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #eee; border-radius: 8px; color: #333; line-height: 1.6;">
            <div style="background-color: #060606; padding: 20px; text-align: center; border-radius: 6px 6px 0 0;">
              <h1 style="color: #C5A059; margin: 0; font-size: 24px; font-weight: normal; letter-spacing: 2px;">NEXT HOME</h1>
              <p style="color: #888; margin: 5px 0 0 0; font-size: 11px; letter-spacing: 3px; uppercase">EXECUTIVE OFFICE DIRECT ALERT</p>
            </div>
            
            <div style="padding: 20px 0;">
              <p style="font-size: 15px; margin-top: 0;">A new high-end business consultation has been dispatched from the portal:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="border-bottom: 1px solid #f3f3f3;">
                  <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #555;">Representative</td>
                  <td style="padding: 10px 0; color: #111;">${full_name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f3f3;">
                  <td style="padding: 10px 0; font-weight: bold; color: #555;">Email Hub</td>
                  <td style="padding: 10px 0; color: #111;"><a href="mailto:${email}" style="color: #C5A059; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f3f3;">
                  <td style="padding: 10px 0; font-weight: bold; color: #555;">Mobile Hub</td>
                  <td style="padding: 10px 0; color: #111;"><a href="tel:${phone}" style="color: #C5A059; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f3f3;">
                  <td style="padding: 10px 0; font-weight: bold; color: #555;">Company / Brand</td>
                  <td style="padding: 10px 0; color: #111;">${company || 'Independent Investor / Aligned Partner'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f3f3;">
                  <td style="padding: 10px 0; font-weight: bold; color: #555;">Submission Date</td>
                  <td style="padding: 10px 0; color: #111;">${new Date(created_at || new Date()).toUTCString()}</td>
                </tr>
              </table>
              
              <div style="margin-top: 25px; padding: 15px 20px; background-color: #fbfbfb; border-left: 4px solid #C5A059; border-radius: 4px;">
                <h4 style="margin: 0 0 8px 0; color: #111; font-size: 14px;">Strategic Cooperation Goals:</h4>
                <p style="margin: 0; font-size: 14px; white-space: pre-wrap; color: #444;">${message}</p>
              </div>
            </div>
            
            <div style="text-align: center; font-size: 11px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; letter-spacing: 0.5px;">
              NEXT HOME Portfolio Administration Group. All rights reserved.
            </div>
          </div>
        `
      })
    })

    const resendData = await resendResponse.json()

    return new Response(JSON.stringify({ success: true, resend: resendData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
