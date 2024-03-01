# Development Team Coding Challenge 24S
Using the provided starter code, implement a shopping catalog app with Flask and Next.js. There is a set of required features you must implement to be considered for the next round of the recruitment process, and a set of optional features that give you the ability to stand out from other applicants. This challenge assumes you have a working knowledge of JavaScript/html and Python. It may be very difficult and time consuming for those who don't already know Flask and Next.js, so we strongly encourage you to **start as early as you can**. 

You must submit your code in the form of a .zip file
- You should make a new README.md with your name, details about any additional features, and instructions on how to install & run it.
- Please do not include the `/.next` , `/node_modules` or `/.venv` directories
- Make sure to update your python package requirements with `pip freeze > requirements.txt`

### Collaboration policy:
* You may not collaborate with any other applicants on this challenge or use code from other submissions. We use this challenge to gauge your coding style, attention to detail, ability to quickly pick up new frameworks, and proficiency with the frameworks we use. We cannot do this accurately if you do not do the challenge by yourself.
* You may use stackOverflow & chatGPT to guide you and help troubleshoot problems, but you may not copy-paste code directly.

## Backend 
The backend will maintain a catalog of items that are currently available, serve product names & prices to the front end, and host api endpoints that will be used to add/remove items in the catalog.

If you are not already, it may be a good idea to familiarize yourself with the following:
* [Flask](https://flask.palletsprojects.com/en/3.0.x/quickstart/)
* [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) 
* [Configuring CORS for Flask](https://flask-cors.readthedocs.io/en/latest/) 

### Requirements:
* Must have endpoints for adding and removing items, and getting the current catalog
* Code must be legible and well commented

### Some ideas for additional features:
* Make the catalog database persistent between sessions
* Implement a PUT method for updating items
* Add support for serving a link to an image in addition to item name and price
  -  It would also be possible to use aws S3 or some other service to allow the user to upload their own images
     <!-- (can you even submit something like this? idk) -->
* Implement a postgresql database for storing catalog items
     <!-- (can you even submit something like this? idk) -->
* Add the ability to send the current catalog as a .csv file so the user can download it

### Notes:
* Make sure you have python3 and pip installed
  - If you are using a VM/WSL to develop the backend, be aware that you must also enable virtual environment support on Debian/Ubuntu systems by installing the `python3.xx-venv` package.
  - Your IDE may give a couple warnings about package manangment, but as long as launch.sh runs without any errors, your code will run fine
* Run `./launch.sh` to set up a virtual environment, install all necessary packages, and run the backend
* Take a look at the README.md file in the backend folder for further instruction
  
## Frontend
The frontend will display a dynamic catolog of products and their corresponding prices, appear appealing to potential customers, and provide an intuitive portal for adding/removing items from the catalog with your api.

If you are not already, it may be a good idea to familiarize yourself with the following:
* [Next.js](https://nextjs.org/docs)
  - [Rendering](https://nextjs.org/docs/app/building-your-application/rendering) (server & client components)
  - [Pages & Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
  - [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
  - [Styling with TailwindCSS](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)
* [TailwindCSS](https://tailwindcss.com/docs)

### Requirements:
* Front end should make full use of any additional features that were added to the Backend
* Try to separate your pages into components when it makes sense to do so
  - If you need a stateful component, use React
  - Try to stick to 1 component definition per file, and group related files into folders
* The main page must be a server compenent
  - You may use client components, but they must be defined in a separate file
* Must use TailwindCSS for styling (not CSS)
  - Try to style as much of your components as possible with Tailwind classes, and try to avoid creating your own styling classes
* Code must be legible and well commented (where applicable)

### Some ideas for additional features:
* Deployment on vercel or the platform of your choice
* Implement some form of response caching
* Multiple routes for different selections of products
* Implement a search bar
* Dynamic styling for different screen resolutions
* Styling that follows the [Stevens branding guidelines](https://www.stevens.edu/brandguide)

### Notes:
* run `npm i` to install dependencies
* run `npm run dev` to start the development server
* if you are running into issues with CORS, check that:
  - you have `mode: 'cors'` in your request header
  - CORS is configured in your backend
  - your request url is correct (a request to a nonexistent endpoint shows as a problem with CORS in the developer tools console)
