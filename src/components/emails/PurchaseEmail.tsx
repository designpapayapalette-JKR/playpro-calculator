import * as React from 'react';

interface PurchaseEmailProps {
  customerName: string;
  downloadUrl: string;
  orderId: string;
  amount: string;
}

export const PurchaseEmail: React.FC<Readonly<PurchaseEmailProps>> = ({
  customerName,
  downloadUrl,
  orderId,
  amount,
}) => (
  <div style={{
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#0B0F0E',
    color: '#ffffff',
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '12px'
  }}>
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <h1 style={{ color: '#4ADE80', fontSize: '28px', margin: '0' }}>🏓 PlayPro</h1>
      <p style={{ color: '#9ca3af', fontSize: '16px' }}>Your Business Calculator is Ready!</p>
    </div>

    <div style={{ backgroundColor: '#1a1f1e', padding: '30px', borderRadius: '8px', marginBottom: '30px' }}>
      <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Hi {customerName}, 🎉</h2>
      <p style={{ lineHeight: '1.6', color: '#d1d5db', marginBottom: '25px' }}>
        Thank you for choosing the PlayPro Pickleball Court Business Calculator. 
        You're just one click away from building your financial model with confidence.
      </p>

      <a href={downloadUrl} style={{
        display: 'block',
        backgroundColor: '#4ADE80',
        color: '#0B0F0E',
        padding: '16px 24px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '18px'
      }}>
        ⬇ Download Your Calculator
      </a>

      <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '15px', textAlign: 'center' }}>
        Note: This download link will expire in 7 days.
      </p>
    </div>

    <div style={{ border: '1px solid #2d3130', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
      <h3 style={{ fontSize: '16px', color: '#4ADE80', marginBottom: '15px', borderBottom: '1px solid #2d3130', paddingBottom: '10px' }}>
        Order Details
      </h3>
      <table style={{ width: '100%', fontSize: '14px', color: '#d1d5db' }}>
        <tr>
          <td style={{ padding: '5px 0' }}>Order ID:</td>
          <td style={{ textAlign: 'right' }}>{orderId}</td>
        </tr>
        <tr>
          <td style={{ padding: '5px 0' }}>Amount:</td>
          <td style={{ textAlign: 'right' }}>{amount}</td>
        </tr>
      </table>
    </div>

    <div style={{ backgroundColor: '#1a1f1e', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
      <h3 style={{ fontSize: '16px', color: '#4ADE80', marginBottom: '10px' }}>Quick Start Guide</h3>
      <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#d1d5db' }}>
        <li>Open in <strong>Microsoft Excel</strong> or <strong>Google Sheets</strong></li>
        <li>Start with the <strong>Dashboard</strong> tab</li>
        <li>Only edit the <strong>BLUE</strong> cells</li>
        <li>Check your 5-year ROI in the last tab</li>
      </ul>
    </div>

    <div style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
      <p>© {new Date().getFullYear()} PlayPro | Reply to this email for support</p>
    </div>
  </div>
);
