// Import necessary modules
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000; // You can use any desired port number

// Middleware to parse JSON requests
app.use(express.json());
// Registration
async function registerCompany() {
    const companyData = {
      companyName: 'Train Central',
      ownerEmail: 'rahul@abs.edu',
      rollNumber: '1',
      accessCode: 'FROL'
    };
  
    try {
      console.log('Registering company with John Doe Railway Server...');
      const response = await axios.post('http://20.244.56.144/train/register', companyData);
      const credentials = response.data;
      console.log('Company registered successfully:', credentials);
      return credentials;
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error('Failed to register company with John Doe Railway Server');
    }
  }
  
  

  async function getAuthorizationToken(clientID, clientSecret) {
    const authData = {
      clientID: clientID,
      clientSecret: clientSecret
    };
  
    try {
      const response = await axios.post('http://20.244.56.144/train/auth', authData);
      const token = response.data.token;
      return token;
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error('Failed to obtain authorization token from John Doe Railway Server');
    }
  }
  


async function fetchTrainData(token) {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get('http://20.244.56.144:80/train/trains', { headers });
  return response.data;
}
function processTrainData(trainData) {
  // Implement the filtering and sorting logic here
  const currentTime = new Date();
  const twelveHoursLater = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);

  const filteredTrains = trainData.filter(train => {
    const departureTime = new Date(train.departureTime);
    return departureTime > currentTime && departureTime <= twelveHoursLater;
  });

  const processedData = filteredTrains.map(train => {
    return {
      trainName: train.trainName,
      trainNumber: train.trainNumber,
      departureTime: train.departureTime,
      seatsAvailable: {
        sleeper: train.seatsAvailable.sleeper,
        AC: train.seatsAvailable.AC
      },
      price: {
        sleeper: train.price.sleeper,
        AC: train.price.AC
      },
      delayedBy: train.delayedily
    };
  });

  processedData.sort((a, b) => {
    if (a.price.AC !== b.price.AC) {
      return a.price.AC - b.price.AC;
    }

    if (a.seatsAvailable.AC !== b.seatsAvailable.AC) {
      return b.seatsAvailable.AC - a.seatsAvailable.AC;
    }

    return new Date(a.departureTime) - new Date(b.departureTime);
  });

  return processedData;
}

app.get('/trains', async (req, res) => {
    try {
      const credentials = await registerCompany();
  
      const token = await getAuthorizationToken(credentials.clientID, credentials.clientSecret);
  
      const trainData = await fetchTrainData(token);
  
      const processedTrains = processTrainData(trainData);
  
      res.json(processedTrains);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  


