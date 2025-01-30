# Portfolio Analytics Dashboard

## Overview
The **Portfolio Analytics Dashboard** is a web application designed to track and visualize investment portfolio performance. It provides key metrics, strategy comparisons, and recent trade analysis using interactive charts and tables.

## Features
- **Portfolio Growth Chart**: Visual representation of portfolio performance over time.
- **Performance Metrics**: Displays key financial statistics.
- **Strategy Comparison**: Side-by-side analysis of different investment strategies.
- **Recent Trades**: List of the most recent trades with profit/loss status.
- **Interactive Pie Charts**: Profit vs. Loss visualization.
- **Smooth Scrolling Navigation**: Quick access to different sections of the dashboard.
- **Dark Mode**: Modern UI with a dark theme.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Hooks
- **API Requests**: Axios

## Installation
### Prerequisites
- Node.js installed
- MongoDB set up locally or via MongoDB Atlas

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-analytics-dashboard.git
   cd portfolio-analytics-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

4. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

## Usage
- Open `http://localhost:3000` in your browser.
- Click on the navigation buttons to scroll to different sections.
- View strategy performance comparisons and trade analytics.

## Project Structure
```
portfolio-analytics-dashboard/
│── backend/               # Express.js server
│── frontend/              # React.js application
│── src/
│   ├── components/        # Reusable components
│   ├── pages/             # Application pages
│   ├── styles/            # Global styles (dark theme applied)
│   ├── App.js             # Main React component
│   ├── index.js           # Entry point
│── README.md              # Project documentation
│── package.json           # Dependencies and scripts
```

## API Endpoints
- `GET /api/data` - Fetches portfolio data, strategies, and recent trades.

## Contributors
- **Sahil Kumar** - Developer

## License
This project is licensed under the MIT License.

