/**
 * Clock.js - Real-time clock for Calgary time (Mountain Time)
 * Displays current time and date, updating every second
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    
    // Calgary timezone (Mountain Time)
    const calgaryTimeZone = 'America/Edmonton'; // Edmonton uses the same timezone as Calgary
    
    // Update the clock and date
    function updateClock() {
        // Create a date object with the current time
        const now = new Date();
        
        // Format the date for Calgary timezone
        const options = {
            timeZone: calgaryTimeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Use 24-hour format
        };
        
        // Get the time string in Calgary timezone
        const timeString = now.toLocaleTimeString(navigator.language, options);
        
        // Format date options
        const dateOptions = {
            timeZone: calgaryTimeZone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        // Get the date string in Calgary timezone
        const dateString = now.toLocaleDateString(navigator.language, dateOptions);
        
        // Update the DOM elements
        clockElement.textContent = timeString;
        dateElement.textContent = dateString;
        
        // Also update the theme and page title based on Calgary time
        updateTheme(now, calgaryTimeZone);
        updatePageTitle(now, calgaryTimeZone);
    }
    
    // Set theme based on time of day
    function updateTheme(date, timezone) {
        const options = {
            timeZone: timezone,
            hour: 'numeric',
            hour12: false
        };
        
        // Get current hour in Calgary
        const hour = parseInt(date.toLocaleString(navigator.language, options).split(':')[0], 10);
        
        // Remove all theme classes
        document.body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');
        
        // Set appropriate theme based on time of day
        if (hour >= 6 && hour < 12) {
            document.body.classList.add('theme-morning');
        } else if (hour >= 12 && hour < 18) {
            document.body.classList.add('theme-afternoon');
        } else if (hour >= 18 && hour < 22) {
            document.body.classList.add('theme-evening');
        } else {
            document.body.classList.add('theme-night');
        }
    }
    
    // Update page title based on time of day
    function updatePageTitle(date, timezone) {
        const options = {
            timeZone: timezone,
            hour: 'numeric',
            hour12: false
        };
        
        // Get current hour in Calgary
        const hour = parseInt(date.toLocaleString(navigator.language, options).split(':')[0], 10);
        
        // Set appropriate emoticon based on time of day
        let titleEmoticon = "";
        if (hour >= 6 && hour < 12) {
            titleEmoticon = "🌅 dashboard"; // Morning
        } else if (hour >= 12 && hour < 18) {
            titleEmoticon = "☀️ dashboard"; // Afternoon
        } else if (hour >= 18 && hour < 22) {
            titleEmoticon = "🌆 dashboard"; // Evening
        } else {
            titleEmoticon = "🌙 dashboard"; // Night
        }
        
        // Update the page title
        document.title = titleEmoticon;
    }
    
    // Initial call to set clock and theme
    updateClock();
    
    // Update the clock every second
    setInterval(updateClock, 1000);
    
    // Update greeting based on time of day
    function updateGreeting() {
        const greetingText = document.getElementById('greeting-text');
        const now = new Date();
        const options = {
            timeZone: calgaryTimeZone,
            hour: 'numeric',
            hour12: false
        };
        
        // Get current hour in Calgary
        const hour = parseInt(now.toLocaleString(navigator.language, options).split(':')[0], 10);
        
        // Set appropriate greeting based on time of day
        if (hour >= 5 && hour < 12) {
            greetingText.textContent = 'wakey wakey eggs and bakey...';
        } else if (hour >= 12 && hour < 18) {
            greetingText.textContent = 'good afternoon semi';
        } else if (hour >= 18 && hour < 22) {
            greetingText.textContent = 'good evening, hope you had a good day';
        } else {
            greetingText.textContent = 'you should go to bed, good night';
        }
    }
    
    // Initialize greeting
    updateGreeting();
    
    // Update greeting every minute (less frequent than clock)
    setInterval(updateGreeting, 60000);
});

