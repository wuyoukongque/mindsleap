const DEFAULT_SITE_URL = "https://mindsleap.ai";
const DEFAULT_CONTACT_EMAIL = "contact@mindsleap.ai";

export function getSiteUrl() {
  return (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export function getContactEmail() {
  return process.env.CONTACT_PUBLIC_EMAIL || DEFAULT_CONTACT_EMAIL;
}
