
// Fetch Weather Data from OpenWeatherMap
async function fetchWeatherData() {
    const apiKey = '6cb31db9df519039c69a8a03041a9e35'; // Replace with your API key
    const city = 'Tirana'; // Default city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            displayWeatherData(data);
        } else {
            document.getElementById('weather-data').innerHTML = `
                <div class="weather-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Weather data not available. Please try again later.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-data').innerHTML = `
            <div class="weather-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load weather data. Please check your connection.</p>
            </div>
        `;
    }
}

// Display Weather Data
function displayWeatherData(data) {
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    const date = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('weather-data').innerHTML = `
        <div class="weather-header">
            <h3>${data.name}, Albania</h3>
            <p>${date}</p>
        </div>
        <div class="weather-main">
            <div class="weather-icon">
                <i class="fas ${weatherIcon}"></i>
            </div>
            <div class="weather-temp">
                ${Math.round(data.main.temp)}°C
            </div>
            <div class="weather-desc">
                ${data.weather[0].description}
            </div>
        </div>
        <div class="weather-details">
            <div class="weather-detail">
                <i class="fas fa-temperature-high"></i>
                <span>High: ${Math.round(data.main.temp_max)}°C</span>
            </div>
            <div class="weather-detail">
                <i class="fas fa-temperature-low"></i>
                <span>Low: ${Math.round(data.main.temp_min)}°C</span>
            </div>
            <div class="weather-detail">
                <i class="fas fa-tint"></i>
                <span>Humidity: ${data.main.humidity}%</span>
            </div>
            <div class="weather-detail">
                <i class="fas fa-wind"></i>
                <span>Wind: ${Math.round(data.wind.speed * 3.6)} km/h</span>
            </div>
        </div>
    `;
}

// Get appropriate weather icon
function getWeatherIcon(weatherCondition) {
    const weatherIcons = {
        'Clear': 'fa-sun',
        'Clouds': 'fa-cloud',
        'Rain': 'fa-cloud-rain',
        'Drizzle': 'fa-cloud-rain',
        'Thunderstorm': 'fa-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Smoke': 'fa-smog',
        'Haze': 'fa-smog',
        'Dust': 'fa-smog',
        'Fog': 'fa-smog',
        'Sand': 'fa-smog',
        'Ash': 'fa-smog',
        'Squall': 'fa-wind',
        'Tornado': 'fa-tornado'
    };
    
    return weatherIcons[weatherCondition] || 'fa-cloud';
}

// Fetch Currency Exchange Rates
async function fetchExchangeRate() {
    const apiKey = 'da2a5277f51022bcc37b734c'; // Replace with your API key
    const baseCurrency = document.getElementById('from-currency').value;
    const targetCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value || 1;
    
    // For demonstration, we'll use a free API (this might have limitations)
    const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.rates) {
            const rate = data.rates[targetCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            
            document.getElementById('conversion-result').innerHTML = `
                ${amount} ${baseCurrency} = ${convertedAmount} ${targetCurrency}
                <small>(Rate: 1 ${baseCurrency} = ${rate.toFixed(4)} ${targetCurrency})</small>
            `;
        } else {
            document.getElementById('conversion-result').innerHTML = `
                <div class="currency-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Currency data not available. Please try again later.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // Fallback to hardcoded rates if API fails
        const fallbackRates = {
            'EUR': { 'ALL': 120.5, 'USD': 1.18 },
            'USD': { 'ALL': 102.3, 'EUR': 0.85 },
            'GBP': { 'ALL': 140.2, 'EUR': 1.16, 'USD': 1.38 }
        };
        
        if (fallbackRates[baseCurrency] && fallbackRates[baseCurrency][targetCurrency]) {
            const rate = fallbackRates[baseCurrency][targetCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            
            document.getElementById('conversion-result').innerHTML = `
                ${amount} ${baseCurrency} = ${convertedAmount} ${targetCurrency}
                <small>(Using approximate rates - API unavailable)</small>
            `;
        } else {
            document.getElementById('conversion-result').innerHTML = `
                <div class="currency-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load currency data. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Fetch Images from Unsplash
async function fetchUnsplashImages() {
    const apiKey = 'f7_DHul9PgodQyLe2FkjXrJ2db71jSvpy3PDXuvw7bE'; // Replace with your API key
    const query = 'Albania travel';
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            displayUnsplashImages(data.results);
        } else {
            document.getElementById('unsplash-gallery').innerHTML = `
                <div class="gallery-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>No images found. Please try again later.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching Unsplash images:', error);
        document.getElementById('unsplash-gallery').innerHTML = `
            <div class="gallery-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load images. Please check your connection.</p>
            </div>
        `;
    }
}

// Display Unsplash Images
function displayUnsplashImages(images) {
    const galleryContainer = document.getElementById('unsplash-gallery');
    galleryContainer.innerHTML = '';
    
    images.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.className = 'gallery-item';
        imgElement.innerHTML = `
            <img src="${image.urls.regular}" alt="${image.alt_description || 'Albania travel image'}" loading="lazy">
        `;
        galleryContainer.appendChild(imgElement);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Fetch all API data when page loads
    fetchWeatherData();
    fetchExchangeRate();
    fetchUnsplashImages();
    
    // Currency converter button
    document.getElementById('convert-btn').addEventListener('click', fetchExchangeRate);
    
    // Currency dropdown changes
    document.getElementById('from-currency').addEventListener('change', fetchExchangeRate);
    document.getElementById('to-currency').addEventListener('change', fetchExchangeRate);
    
    // Amount input changes
    document.getElementById('amount').addEventListener('input', fetchExchangeRate);
});
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
  