# hackIllinois
Inspiration
We often see that people with low incomes are unable to afford the costly home surveillance system necessary to keep their homes protected. They leave their homes vulnerable when they are not at home or go on a vacation. This is a major issue in all countries, developed and developing.

We came up with a solution to turn your old, cheap, unused smartphones into an effective smart home surveillance system. We used artificial intelligence and numerous web apis to make the surveillance system convenient and effective. The product is very intuitive and was designed so people without technological knowledge can use it to its full potential.

What it does
Free-Watch is a web application which turns an old smartphone or webcam into a smart security camera. The surveillance system detects the intruder in the home as well as identify weapons he is carrying. The system sends an image with a description of the intruder to the user with the help of Computer Vision, Neural Networks, Google Geolocation and Twilio messaging services. The user also has the option to automatically alert the police providing the exact house location of the user.

Once enabled, Free-Watch takes a picture every few seconds, slicing the real time video, when the user is not at home. This image is processed and when an intruder is detected using computer vision, the application sends a descriptive multimedia message to the user phone number as well as to the police if selected. The user can also alert the police and the web-app sends the geolocation of the house where the robbery is taking place by pressing the alert button.

How we built it
The backend was written in Node.JS. We used Webcam.js to snap pictures every few seconds. We used socket.io to allow for remote activation of the surveillance system. We used Microsoft's Computer Vision API and Azure functions to detect the intruder in the house and developed/trained a convolutional neural network with thousands of images to determine the danger level of the intruder and whether he is carrying a Knife or a Gun.

The database we used for this application for login and user registration is Dynamo DB.

We used the Twilio Messaging service to send SMS messages to the police and the user. We used the Google Maps Geolocation API to detect the location of the phone, which is sent to the police.

We developed the front-end of the application using Angular JS.

Challenges we ran into
We ran into numerous issues accessing the camera and with delivering the image to the user regarding hosting and formatting of the image.

It was difficult to make the smartphone camera a surveillance device that can be activated remotely as well as interpreting the images through computer vision.

Additionally, extracting the real-time geolocation and sending it as an alert was challenging. We also faced problems developing our own neural network models to correctly detect the description of the intruder.

It was really hard to develop a free and fully functional smart home surveillance system web application within the span of 36 hours.

Accomplishments that we're proud of
We created a cheap and smart home surveillance system in 36 hours.

We learned working with a lot of new technologies.

What we learned
Microsoft Azure, Node JS, Angular Js

What's next for Free-Watch
We are thinking of making our application more secure, scalable and including more functionalities to improve user accessibility. We would really like to publish it in the app-store and play-store in the future.

