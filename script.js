// Function to fetch detailed user information
async function fetchDetails() {
    try {
      // Fetch IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;
  
      // Fetch location details using IP
      const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await locationResponse.json();
  
      // Fetch additional user details
      const userAgent = navigator.userAgent;
      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      const os = navigator.platform;
      const browser = navigator.appName;
      const language = navigator.language;
  
      // Prepare the data to send to the logging server
      const logData = {
        ip,
        city: locationData.city,
        region: locationData.region,
        country: locationData.country_name,
        isp: locationData.org,
        timezone: locationData.timezone,
        userAgent,
        screenResolution,
        os,
        browser,
        language,
        timestamp: new Date().toISOString(),
      };
  
      // Send data to the logging server
      await fetch('https://loggingmain.netlify.app/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  }
  
  // Call the function when the page loads
  fetchDetails();
