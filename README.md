# 🍽️ Delish Restaurant Website

A modern, responsive restaurant website built with HTML, CSS, and JavaScript. This project showcases a luxury dining experience with elegant design, interactive features, and seamless user experience.

![Delish Restaurant](./IMAGES/logo.png)

## ✨ Features

### 🏠 **Homepage**
- **Hero Slider** - Eye-catching image carousel with call-to-action buttons
- **About Section** - Restaurant introduction with contact information
- **Services Showcase** - Wedding, Buffet, and Party services
- **Interactive Food Menu** - Categorized menu with filtering (Breakfast, Lunch, Dinner)
- **Photo Gallery** - Navigable food gallery with carousel functionality
- **Customer Testimonials** - Client feedback section
- **Reservation System** - Inline booking form with date/time selection

### 📱 **Responsive Design**
- Mobile-first approach
- Hamburger menu for mobile devices
- Optimized layouts for all screen sizes
- Touch-friendly interactive elements

### 🧭 **Navigation Pages**
- **About Us** (`aboutus.html`) - Detailed restaurant story and mission
- **Team** (`team.html`) - Meet our professional staff
- **Team Details** (`team-details.html`) - Individual team member profiles
- **Gallery** (`gallerypage.html`) - Complete photo collection
- **Shop** (`shop.html`) - Online store interface
- **Shop Details** (`shopdetails.html`) - Product detail pages
- **Contact** (`contactus.html`) - Contact form and location information
- **Reservations** (`resevation.html`) - Dedicated booking page

### 🎨 **Design Elements**
- Modern typography using Google Fonts (Jost, Kumbh Sans)
- Bootstrap Icons for consistent iconography
- Smooth animations and transitions
- Professional color scheme
- Custom CSS components

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yrlwijesekara/delish.git
   cd delish
   ```

2. **Open the website**
   - Double-click `home.html` to open in your default browser
   - Or serve using a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**
   - Direct file: Open `home.html` in your browser
   - Local server: Navigate to `http://localhost:8000`

## 📁 Project Structure

```
delish/
├── 📄 home.html                 # Main homepage
├── 📄 aboutus.html             # About us page
├── 📄 contactus.html           # Contact page
├── 📄 gallerypage.html         # Gallery page
├── 📄 resevation.html          # Reservation page
├── 📄 shop.html                # Shop page
├── 📄 shopdetails.html         # Shop details page
├── 📄 team.html                # Team page
├── 📄 team-details.html        # Team details page
├── 🎨 style.css                # Main stylesheet
├── 🎨 aboutus.css              # About page styles
├── 🎨 contactus.css            # Contact page styles
├── 🎨 footer-styles.css        # Footer styles
├── 🎨 reservation.css          # Reservation styles
├── 🎨 shop.css                 # Shop styles
├── 🎨 shopdetails.css          # Shop details styles
├── 🎨 team.css                 # Team styles
├── 🎨 team-details.css         # Team details styles
├── ⚡ script.js                # Main JavaScript file
└── 📁 IMAGES/                  # Image assets
    ├── 🖼️ logo.png
    ├── 🖼️ food.png
    ├── 📁 aboutus/
    ├── 📁 contactus/
    ├── 📁 gallerypage/
    ├── 📁 reservation/
    ├── 📁 shop/
    ├── 📁 shopdetails/
    ├── 📁 team/
    └── 📁 team-details/
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and dynamic content

### External Libraries
- **Google Fonts** - Typography (Jost, Kumbh Sans)
- **Bootstrap Icons** - Icon library for UI elements

### Design Features
- **Flexbox & CSS Grid** - Modern layout techniques
- **CSS Custom Properties** - Maintainable styling
- **Smooth Scrolling** - Enhanced user experience
- **CSS Animations** - Engaging visual effects

## 🎯 Key Functionality

### Interactive Menu System
```javascript
// Menu filtering by category
const foodTabs = document.querySelectorAll('.food-tab-btn');
const foodCards = document.querySelectorAll('.food-card');
```

### Mobile Navigation
```javascript
// Responsive hamburger menu
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
```

### Gallery Carousel
```javascript
// Image gallery with navigation
const galleryNavBtns = document.querySelectorAll('.gallery-nav-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
```

### Reservation System
```javascript
// Form validation and booking functionality
const reservationForm = document.querySelector('.reservation-form');
const reservationInputs = document.querySelectorAll('.reservation-input');
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Colors
Edit the CSS custom properties in `style.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

### Typography
Modify font families in the CSS or update Google Fonts imports:
```css
body {
    font-family: 'YourFont', sans-serif;
}
```

### Images
Home page
<img width="1901" height="909" alt="image" src="https://github.com/user-attachments/assets/4dc0a90b-ea82-49bb-b0a8-41d2dc99957c" />
<img width="1898" height="909" alt="image" src="https://github.com/user-attachments/assets/26f8fdf3-f095-401a-a9d8-e837a072727e" />
About Us
<img width="1899" height="910" alt="image" src="https://github.com/user-attachments/assets/cd0ae67c-8dc6-443f-8c07-31a637c80093" />
Team Details
<img width="1904" height="902" alt="image" src="https://github.com/user-attachments/assets/40f2b2d7-42bb-4951-bf09-c526938c5cc0" />
Shop
<img width="1904" height="907" alt="image" src="https://github.com/user-attachments/assets/6684b762-9f2b-4b12-bba7-1d8f95aaeda4" />
Book a table
<img width="1900" height="910" alt="image" src="https://github.com/user-attachments/assets/f7dd81a7-27b3-4fc0-b5de-c69e8fd45dde" />







## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/delish`

### Other Hosting
Upload all files to your web hosting provider's public directory (usually `public_html` or `www`).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**YRL Wijesekara**
- GitHub: [@yrlwijesekara](https://github.com/yrlwijesekara)

## 🎉 Acknowledgments

- Design inspiration from modern restaurant websites
- Icons provided by Bootstrap Icons
- Fonts provided by Google Fonts
- Images and graphics created specifically for this project

---

### 📞 Restaurant Contact Information
- **Email**: reservations@delish.com
- **Phone**: 123 456 7899
- **Address**: 296 Ridao Avenie Mor Berlin 251584
- **Hours**: 
  - Mon-Wed: 11a-9p
  - Thurs-Sat: 11a-10p

---

⭐ **If you found this project helpful, please give it a star!** ⭐
