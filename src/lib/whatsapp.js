/**
 * Helper to construct clean WhatsApp API URLs (https://wa.me/<number>?text=...)
 * Number formatting handles stripping +, spaces, dashes, leading zeroes if country code present.
 */

export function formatWhatsAppNumber(phoneStr) {
  if (!phoneStr) return '918155050343'; // Authorized WhatsApp number
  // Remove non-digit characters
  let clean = phoneStr.replace(/\D/g, '');
  // If 10 digits (typical India number), prepend 91
  if (clean.length === 10) {
    clean = '91' + clean;
  }
  return clean;
}

export function openWhatsApp({ phone = '918155050343', message = 'Hello Pabari\'s Real Estate! I am looking for property assistance in Jamnagar.' }) {
  const cleanNum = formatWhatsAppNumber(phone);
  const encodedMsg = encodeURIComponent(message);
  const url = `https://wa.me/${cleanNum}?text=${encodedMsg}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function buildPropertyInquiryMessage(property, clientDetails = {}) {
  let text = `Hello Pabari's Real Estate,\n\nI am interested in the following property listing on your website:\n`;
  text += `📌 *${property.title}*\n`;
  text += `💰 Price: ${property.price}\n`;
  text += `📍 Location: ${property.location}, Jamnagar\n`;
  text += `🏷️ Type: ${property.property_type} (${property.listing_type})\n`;
  if (property.reference_code) {
    text += `🔢 Ref Code: ${property.reference_code}\n`;
  }
  text += `\n`;

  if (clientDetails.name) {
    text += `👤 *My Name:* ${clientDetails.name}\n`;
  }
  if (clientDetails.phone) {
    text += `📞 *My Contact:* ${clientDetails.phone}\n`;
  }
  if (clientDetails.message) {
    text += `💬 *Note:* ${clientDetails.message}\n`;
  } else {
    text += `Please share more details, photos, and schedule a site visit for me.\n`;
  }
  text += `\nThank you!`;
  return text;
}
