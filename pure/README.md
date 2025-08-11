# Giving App - Pure HTML/CSS/JavaScript Version

This is a pure HTML, CSS, and JavaScript version of the Giving app, located in the `/pure` folder. It provides the same functionality as the Next.js version but without any build dependencies.

## Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **PWA Support**: Progressive Web App capabilities with install prompts
- **FundraisingBox Integration**: Direct integration with the FundraisingBox payment system
- **Cookie Management**: GDPR-compliant cookie consent overlay
- **Toast Notifications**: User-friendly notification system
- **Accessibility**: WCAG compliant with skip links and ARIA landmarks
- **Offline Support**: Service worker registration for offline functionality
- **Enhanced PWA**: Dedicated installation handler and offline page
- **PWA Testing**: Built-in testing page for PWA functionality

## File Structure

```
pure/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── pwa-install.js      # PWA installation handler
├── sw.js               # Service worker for offline support
├── manifest.json       # PWA manifest file
├── offline.html        # Offline fallback page
├── pwa-test.html       # PWA functionality testing page
├── verify-pwa.html     # Asset verification page
├── icons/              # PWA icons and favicons
├── images/             # App images and logos
├── screenshots/        # PWA screenshots
└── README.md           # This file
```

## How to Use

### 1. Open the App
Simply open `index.html` in any modern web browser. No build process or server required.

### 2. FundraisingBox Integration
The FundraisingBox payment script is directly embedded in the HTML:

```html
<!-- FundraisingBox Payment Script -->
<div class="payment-widget">
    <script type="text/javascript"
        src="https://secure.fundraisingbox.com/app/paymentJS?hash=0s4qe4vszf7y7jfh"></script>
    <noscript>Please enable JavaScript</noscript>
    <a target="_blank" href="https://www.fundraisingbox.com/?utm_source=donation_form">
        <img border="0" style="border: 0 !important"
            src="https://secure.fundraisingbox.com/images/FundraisingBox-Logo-Widget.png"
            alt="FundraisingBox Logo" />
    </a>
</div>
```

### 3. PWA Installation
- The app will show an install prompt when available
- Users can install it as a native app on their device
- Works on both mobile and desktop
- Enhanced PWA installation with dedicated handler
- Offline support with service worker caching
- Custom offline page for better user experience

### 4. Cookie Consent
- GDPR-compliant cookie consent overlay
- User choices are stored in localStorage
- Can be customized for different regions

### 5. PWA Testing
- Visit `pwa-test.html` to test PWA functionality
- Verify service worker registration
- Test offline capabilities
- Check manifest loading
- Validate installation prompts

## Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **PWA Features**: Chrome, Edge, Firefox (desktop), Safari (iOS)

## Customization

### Colors
Main colors are defined in CSS variables at the top of `styles.css`:

```css
:root {
    --primary-color: #448989;
    --secondary-color: #1f2937;
    --background-color: #f9fafb;
    --text-color: #333;
}
```

### FundraisingBox Hash
To change the FundraisingBox integration, update the hash in `index.html`:

```html
<script type="text/javascript"
    src="https://secure.fundraisingbox.com/app/paymentJS?hash=YOUR_HASH_HERE"></script>
```

### Content
All content is in the HTML file and can be easily modified:
- Hero section text and images
- Mission cards content
- Footer links and information
- Cookie consent text

## Performance

- **Lighthouse Score**: Optimized for 90+ performance
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Minimal JavaScript (no frameworks)
- **Caching**: Service worker for offline support

## Security

- **HTTPS Only**: FundraisingBox requires HTTPS in production
- **Content Security Policy**: Can be added for additional security
- **XSS Protection**: Input sanitization and safe DOM manipulation
- **Cookie Security**: Secure cookie handling with proper flags

## Deployment

### Local Development
1. Clone the repository
2. Navigate to the `/pure` folder
3. Open `index.html` in a browser

### Production Deployment
1. Upload all files to your web server
2. Ensure HTTPS is enabled (required for PWA and FundraisingBox)
3. Update any absolute paths if needed
4. Test PWA installation and offline functionality

### CDN Deployment
- Upload to services like Netlify, Vercel, or AWS S3
- Enable HTTPS and compression
- Set proper cache headers for static assets

## Troubleshooting

### FundraisingBox Not Loading
- Check if JavaScript is enabled
- Verify the hash is correct
- Ensure HTTPS is enabled (required)
- Check browser console for errors

### PWA Not Installing
- Verify HTTPS is enabled
- Check if service worker is registered
- Ensure manifest.json is accessible
- Test on supported browsers

### Styling Issues
- Clear browser cache
- Check CSS file path
- Verify all CSS classes are applied
- Test in different browsers

## Browser Compatibility Notes

- **Internet Explorer**: Not supported
- **Safari < 13**: Limited PWA support
- **Mobile Browsers**: Full support for modern versions
- **Desktop**: Full support for Chrome, Firefox, Edge, Safari

## License

Same license as the main project. See `../LICENSE` for details.

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all file paths are correct
3. Test in different browsers
4. Check network tab for failed requests

## Future Enhancements

- Add more payment gateways
- Implement analytics tracking
- Add multi-language support
- Enhanced offline functionality
- Advanced form validation
