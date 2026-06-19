import { SupportArticle, ProductCardData, FAQItem } from '../types';

export const PRIMARY_HELP_CARDS: ProductCardData[] = [
  {
    id: 'download-install',
    title: 'Download & Install',
    iconName: 'FileCheck',
    description: 'Get instructions to download, install, and reactivate Norton security on your computer, tablet, or smartphone.',
    actionType: 'download'
  },
  {
    id: 'buy-renew',
    title: 'Buy & Renew',
    iconName: 'RefreshCw',
    description: 'Manage subscriptions, renew protection, review billing statements, and update your automatic renewal preferences.',
    actionType: 'renew'
  },
  {
    id: 'account-help',
    title: 'Account Help',
    iconName: 'CircleUser',
    description: 'Update your email, profile details, payment methods, security permissions, and recover your password.',
    actionType: 'account'
  }
];

export const GENERAL_PRODUCT_CARDS: ProductCardData[] = [
  {
    id: 'password-manager',
    title: 'Norton Password Manager',
    iconName: 'KeyRound',
    description: 'Securely store and manage your passwords, credit cards, credentials, and notes in your encrypted vault.',
    actionType: 'password'
  },
  {
    id: 'online-backup',
    title: 'Norton Online Backup',
    iconName: 'CloudUpload',
    description: 'Configure automated cloud backups to secure your critical files, worksheets, photos, and documents.',
    actionType: 'backup'
  },
  {
    id: 'vpn-standard',
    title: 'Norton VPN Standard',
    iconName: 'Lock',
    description: 'Secure your online privacy when using public Wi-Fi networks with bank-grade encryption and anonymous browsing.',
    actionType: 'vpn'
  },
  {
    id: 'family-safety',
    title: 'Norton Family',
    iconName: 'Users',
    description: 'Provide a safe environment for your children to explore, learn, and grow online with smart web controls.',
    actionType: 'family'
  },
  {
    id: 'small-business',
    title: 'Norton Small Business',
    iconName: 'Laptop',
    description: 'Deliver robust enterprise-level cloud security tailored specifically to protect your business and devices.',
    actionType: 'business'
  },
  {
    id: 'threat-removal',
    title: 'Threat Removal',
    iconName: 'ShieldCheck',
    description: 'Run our on-demand threat removal engine to detect, quarantine, and eradicate stubborn viruses and browser hijackers.',
    actionType: 'threat'
  }
];

export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    id: 'art-1',
    title: 'How to download and install Norton 360 on your computer',
    category: 'Download & Install',
    content: `To download and install your Norton product, please follow these simple steps:

1. Sign in to your Norton Support account.
2. If you are not signed in already, enter your email address and password, then click Sign In.
3. In the portal dashboard, click **Download**.
4. If you are registering a brand-new subscription, click **Enter a New Product Key** and type your 25-digit activation key first.
5. Click **Agree & Download** to save the Norton Installer file to your system.
6. Open the downloaded installer file (e.g., \`NortonSetup.exe\` or \`NortonSetup.pkg\`).
7. Follow the on-screen prompts to complete the background system inspection and software configuration.
8. Once complete, your computer will be fully registered and safeguarded immediately.`,
    readingTime: '3 min read',
    tags: ['install', 'download', 'norton 360', 'pc', 'mac']
  },
  {
    id: 'art-2',
    title: 'Renew your Norton subscription or enter an activation code',
    category: 'Buy & Renew',
    content: `Keep your devices continuously protected by renewing your subscription. Here is how:

1. Access your Norton Dashboard and navigate to **My Subscriptions**.
2. Find the product subscription that is expired or nearing its end date.
3. Click the **Renew Now** button to checkout securely, or select your preferred protection package.
4. If you purchased Norton from a retail store or external merchant, click **Enter Activation Key** in your portal.
5. Enter your 25-digit activation key. The key format looks like: \`XXXXX-XXXXX-XXXXX-XXXXX-XXXXX\`.
6. Click **Submit** to sync your license and instantly update your remaining protection days in the client software.`,
    readingTime: '2 min read',
    tags: ['renew', 'activation', 'billing', 'license', 'payment']
  },
  {
    id: 'art-3',
    title: 'How to recover or reset your forgotten Norton Account password',
    category: 'Account Help',
    content: `If you forgot your Norton password or are locked out of your account, you can quickly reset it:

1. Navigate to the **Norton Sign-In** portal.
2. Click **Forgot Password?** right under the password input field.
3. Enter the email address associated with your purchase and active account.
4. Click **Continue**. An email containing password recovery guidelines will be sent to you in less than 2 minutes.
5. Check your Spam or junk folder if the mail is not in your Inbox.
6. Click the secure **Reset Password** link inside the email and choose a strong new password containing at least 8 characters, an upper-case letter, a number, and a special character.
7. Return to the portal and log in to manage your protection suite.`,
    readingTime: '2 min read',
    tags: ['password', 'account', 'login', 'reset', 'profile']
  },
  {
    id: 'art-4',
    title: 'Enable or update Your automatic renewal settings to prevent protection drops',
    category: 'Buy & Renew',
    content: `Automatic renewal ensures uninterrupted virus definitions, secure VPN access, and file back-ups.

To edit your Automatic Renewal settings:
1. Log in to your Norton online profile.
2. Click on the **My Account** icon and go to the **Billing Information** section.
3. Move the slider adjacent to the active subscription to **ON** (to enable) or **OFF** (to disable automatic billing).
4. Save your changes. You will receive an email confirmation reflecting your subscription updates. Note that disabling automatic renewal may invalidate promotional prices for successive cycles.`,
    readingTime: '3 min read',
    tags: ['auto-renewal', 'billing', 'credit card', 'subscription']
  },
  {
    id: 'art-5',
    title: 'How to transfer virus security and add protection to another device',
    category: 'Device Protection',
    content: `Your Norton subscription allows you to protect multiple computers, phones, or tablets. To add a new device:

1. On the device you want to protect, open a browser and sign in to your Norton Support Portal.
2. Click **Protect Another Device** on the home view.
3. Select whether you're adding another Computer or a Smartphone/Tablet.
4. Choose **Send a Download Link** via email, text message, or scan the on-screen QR Code.
5. Open the link on the secondary device, click install, and the software will automatically self-configure under your account credentials.`,
    readingTime: '4 min read',
    tags: ['device', 'transfer', 'phone', 'install', 'tablet', 'mac']
  },
  {
    id: 'art-6',
    title: 'Norton Secure VPN Frequently Asked Questions & Connection Troubleshooting',
    category: 'Norton VPN Standard',
    content: `Norton Secure VPN secures all outgoing traffic on public web connections. If you face connection issues:

- **Check Network Compatibility:** Ensure your router permits VPN IPsec/L2TP protocols.
- **Enable Split-Tunneling:** If specific websites or streaming apps are blocking connections, go to VPN settings, select **Split Tunneling**, and exclude those apps from encryption.
- **Reset Network adapters:** Try disconnecting from Wi-Fi, turning on VPN, or toggling Airplane mode to establish clean routes.
- **Change Virtual Location:** If the connection drops frequently, open client VPN settings and choose the optimal location nearest to your country.`,
    readingTime: '4 min read',
    tags: ['vpn', 'network', 'connection', 'slow internet', 'split-tunnel']
  },
  {
    id: 'art-7',
    title: 'Accessing and updating your Norton Password Manager Cloud Vault',
    category: 'Norton Password Manager',
    content: `Your credentials are protected with a Master Password only you know. To restore your vault:

1. Open your browser and tap the **Norton Password Manager extension**.
2. Enter your account login credentials first.
3. When prompted, enter your secret **Vault Master Password** to unlock credentials.
4. To modify settings: Click **Settings** in the extension popup to change Vault lockout times, configure biometric logins, or run a **Password Health Report** to find weak or duplicated passwords.
5. *Note:* Because your Master Password is fully encrypted locally before reaching servers, Norton is unable to recover or reset an entirely forgotten vault password. We suggest configuring biometric unlock to prevent permanent lockouts.`,
    readingTime: '3 min read',
    tags: ['password manager', 'vault', 'credentials', 'security extension']
  }
];

export const PRE_DEFINED_SITES = [
  'C:/Windows/System32/drivers/etc/hosts',
  'C:/Users/LocalUser/AppData/Local/Temp/updater.exe',
  'C:/Users/LocalUser/Documents/Financials.xlsx',
  'C:/Windows/SysWOW64/winsock.dll',
  'System/Library/CoreServices/Finder.app',
  '/private/var/root/Library/Preferences',
  'C:/Users/LocalUser/Downloads/suspicious_installer.msi',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Norton Security/Engine/navw32.dll',
  'C:/Windows/System32/cmd.exe'
];

export const MALICIOUS_FILES_SAMPLES = [
  { path: 'C:/Users/LocalUser/AppData/Local/Temp/updater.exe', threat: 'Trojan.Gen.2' },
  { path: 'C:/Users/LocalUser/Downloads/suspicious_installer.msi', threat: 'Adware.Helper' }
];

export const FOOTER_LINKS_DATA = {
  products: [
    'Norton Antivirus Plus',
    'Norton 360 Deluxe',
    'Norton 360 for Gamers',
    'Norton 360 with LifeLock Select',
    'Norton 360 with LifeLock Ultimate Plus',
    'Norton VPN',
    'Norton AntiTrack',
    'Norton Family',
    'Norton Mobile Security for Android',
    'Norton Mobile Security for iOS',
    'Norton Utilities Premium',
    'Norton Utilities Ultimate',
    'Norton Small Business'
  ],
  features: [
    'Antivirus',
    'Virus Removal',
    'Malware Protection',
    'Cloud Backup',
    'Safe Web',
    'Safe Search',
    'Smart Firewall',
    'Password Manager',
    'Parental Control',
    'Secure VPN',
    'Privacy Monitor',
    'SafeCam',
    'Dark Web Monitoring',
    'Identity Lock'
  ],
  services: [
    'Norton Services',
    'Norton Computer Tune Up',
    'Norton Ultimate Help Desk',
    'Spyware and Virus Removal',
    'Norton Device Care',
    'Norton Student Discounts',
    'Norton Support',
    'Norton Update Center',
    'How to Renew'
  ],
  about: [
    'About Norton',
    'Internet Security Center',
    'Community',
    'Free Trials',
    'Sign In',
    'LifeLock Identity Protection',
    'GenDigital'
  ]
};
