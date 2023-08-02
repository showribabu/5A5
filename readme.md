*
Register your company with the John Doe Railway Server by sending a POST request to http://20.244.56.144/train/register with the required company details.

*

Obtain the authorization token for your company by sending a POST request to http://20.244.56.144/train/auth with your clientID and clientSecret obtained during registration.

Create a publicly accessible GET REST API "/trains" on your server.

Within the "/trains" API, make a GET request to http://20.244.56.144:80/train/trains to get details of all trains from the John Doe Railway Server. Remember to include the authorization token in the header.

Process the response to filter out trains departing in the next 12 hours, ignore trains departing in the next 30 minutes, and sort the remaining trains based on price, seat availability, and departure time.

Return the processed data to the user as the API response.

************************************************************************