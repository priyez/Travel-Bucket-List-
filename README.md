## Travel Bucket List 
A web-based application to manage and organize your travel destinations. Users can add destinations, categorize them, and share their travel plans via a link. The app also supports drag-and-drop reordering of destinations and uses Next.js, React, and DnD kit to provide an interactive experience.

## Features
Add and categorize destinations: Add a destination by providing its name, coordinates, and category (Dream, Planned, Completed).

Drag-and-drop reordering: Reorder destinations in the list using drag-and-drop functionality.

Shareable link: Generate a shareable link containing your trip data, which can be copied to the clipboard.

Map interaction: Click on the map to add a destination and view a default image based on the destination name.

## Tech Stack
Frontend: Next.js, React, Tailwind CSS, DnD Kit (for drag-and-drop functionality)

State Management: Zustand (for managing destinations)

Styling: Tailwind CSS, UI components

## Installation
Prerequisites
Make sure you have the following installed:

Node.js (version 16 or higher)

Yarn or npm

Steps to Run Locally
Clone the Repository

```bash
git clone https://github.com/your-username/destination-tracker.git
cd destination-tracker
Install Dependencies
```

Using npm:

```bash
npm install
```

Start the Next.js development server:

Using npm:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000.

## Usage
Add a Destination: Click on the map or use the input form to add a destination to your list.

Categorize Destinations: Each destination can be categorized as "Dream", "Planned", or "Completed" using the dropdown in the form.

Reorder Destinations: Drag-and-drop the destinations to reorder the list.

Generate Shareable Link: After adding destinations, you can generate a shareable link containing all your destinations by clicking the "Generate Shareable Link" button. This will copy the link to your clipboard.

## Components
1. MapView
Displays a map where users can click to add a new destination with coordinates.

2. DestinationList
Displays the list of destinations, allowing users to reorder them and delete any destination from the list.

3. AddDestinationForm
Form to add a new destination, with input fields for name, category, and automatic image fetching based on the name.

## Environment Variables
If you need to use a custom API to fetch images for the destinations, make sure to add the appropriate environment variable:

NEXT_PUBLIC_API_BASE_URL: Set this to the base URL for your image-fetching API (optional).

Notes
This application uses client-side rendering for map interactions, so it might not work properly if JavaScript is disabled.

The drag-and-drop functionality is handled by the DnD Kit library.

For sharing links, the trip data is encoded using Base64.

## Contributing
Feel free to fork the repository, make changes, and submit pull requests. We welcome contributions that improve the functionality and user experience!

## License

This project is licensed under the MIT License - see the LICENSE file for details.