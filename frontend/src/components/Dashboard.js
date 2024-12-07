import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../styles/calendar.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Chart.css'
import profileImage from '../assets/profile.png';
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement,LineElement, Title, Tooltip, Legend);

const Dashboard = ({email}) => {
  const [activeTab, setActiveTab] = useState('1Y'); // Default to '1Y'
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors
  const [newEvent, setNewEvent] = useState({ name: '', date: '' }); // State for new event form


  const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState([]);
  const [lastMonthIncome, setLastMonthIncome] = useState(null);
  const [last6MonthsIncome, setLast6MonthsIncome] = useState(null);
  const [lastYearIncome, setLastYearIncome] = useState(null);
  const [lastMonthExpense, setLastMonthExpense] = useState(null);
  const [last6MonthsExpense, setLast6MonthsExpense] = useState(null);
  const [lastYearExpense, setLastYearExpense] = useState(null);

  const [weeklyData, setWeeklyData] = useState({});

  const barChartData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], // Weekdays (abbreviated)
    datasets: [
      {
        label:'Expense',
        data: [
          weeklyData.MONDAY || 0, 
          weeklyData.TUESDAY || 0, 
          weeklyData.WEDNESDAY || 0, 
          weeklyData.THURSDAY || 0, 
          weeklyData.FRIDAY || 0, 
          weeklyData.SATURDAY || 0, 
          weeklyData.SUNDAY || 0,
        ],
        backgroundColor: 'rgba(2, 90, 132, 0.6)',
      },
    ],
  };


  useEffect(() => {
    const email = localStorage.getItem('userEmail');


      // Fetch the weekly expense data from the backend
    axios.get(`http://localhost:8080/expense/weekly?email=${email}`)
    .then((response) => {
      setWeeklyData(response.data); // Set weekly expenses data
      setLoading(false); // Stop loading once data is fetched
    })
    .catch((error) => {
      console.error("Error fetching weekly expenses", error);
      setLoading(false);
    });


      // Fetch income data
      axios.get(`http://localhost:8080/income/1M?email=${email}`)
          .then(response => setLastMonthIncome(response.data.totalIncomeLast1M))
          .catch(error => console.error('Error fetching total income for last month:', error));

      axios.get(`http://localhost:8080/income/6M?email=${email}`)
          .then(response => setLast6MonthsIncome(response.data.totalIncomeLast6M))
          .catch(error => console.error('Error fetching total income for last 6 months:', error));

      axios.get(`http://localhost:8080/income/1Y?email=${email}`)
          .then(response => setLastYearIncome(response.data.totalIncomeLast1Y))
          .catch(error => console.error('Error fetching total income for last year:', error));

      // Fetch expense data
      axios.get(`http://localhost:8080/expense/1M?email=${email}`)
          .then(response => setLastMonthExpense(response.data.totalExpenseLast1M))
          .catch(error => console.error('Error fetching total expense for last month:', error));

      axios.get(`http://localhost:8080/expense/6M?email=${email}`)
          .then(response => setLast6MonthsExpense(response.data.totalExpenseLast6M))
          .catch(error => console.error('Error fetching total expense for last 6 months:', error));

      axios.get(`http://localhost:8080/expense/1Y?email=${email}`)
          .then(response => setLastYearExpense(response.data.totalExpenseLast1Y))
          .catch(error => console.error('Error fetching total expense for last year:', error))



    //for username accessing
   fetch(`http://localhost:8080/auth/user-info?email=${encodeURIComponent(email)}`)
     .then((response) => response.json())
     .then((data) => setUser(data)) // Set the user info to state
     .catch((error) => console.error('Error fetching user info:', error));

  // Fetch income and expenses in parallel
  Promise.allSettled([
    fetch(`http://localhost:8080/income/total?email=${encodeURIComponent(email)}`),
    fetch(`http://localhost:8080/expense/total?email=${encodeURIComponent(email)}`),
  ])
    .then((results) => {
      // Handle income response
      const incomeResult = results[0];
      if (incomeResult.status === 'fulfilled' && incomeResult.value.ok) {
        incomeResult.value.json().then((data) => setIncomeData(data));
      } else {
        console.error('Error fetching income data:', incomeResult.reason || 'Request failed');
      }

      // Handle expense response
      const expenseResult = results[1];
      if (expenseResult.status === 'fulfilled' && expenseResult.value.ok) {
        expenseResult.value.json().then((data) => setExpenseData(data));
      } else {
        console.error('Error fetching expense data:', expenseResult.reason || 'Request failed');
      }
    })
    .catch((error) => {
      console.error('Unexpected error:', error);
    });

  // Fetch events separately
  fetch('http://localhost:8080/api/events')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return response.json();
    })
    .then((data) => {
      setEvents(Array.isArray(data) ? data : []); // Ensure data is an array
    })
    .catch((error) => {
      console.error('Error fetching events:', error);
    });
    
 }, [email]);


 // Chart data for both income and expense
 const data = {
  labels: ['1 Month', '6 Months', '1 Year'],
  datasets: [
    {
      label: 'Income',
      data: [lastMonthIncome, last6MonthsIncome, lastYearIncome],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(75, 192, 192)', // Bar color for income
      tension: 0.1
    },
    {
      label: 'Expense',
      data: [lastMonthExpense, last6MonthsExpense, lastYearExpense],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)', // Bar color for expense
      tension: 0.1
    }
  ]
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
       display:false, // Custom color for X-axis grid lines
      },
    },
    y: {
      beginAtZero: true,
      
      grid: {
        display:false, // Custom color for Y-axis grid lines
      },
    },
  },
};
  // Add new event
  const handleAddEvent = (event) => {
    event.preventDefault();

    if (newEvent.name && newEvent.date) {
      const updatedEvents = [...events, { id: events.length + 1, ...newEvent }];
      setEvents(updatedEvents);

      // Reset the form
      setNewEvent({ name: '', date: '' });
    }
  };


  return (
    <div>
      <div className="top-container">
        <div className="nav">
          <div className="logo">
            <i className="bx bx-wallet-alt"></i>
            <a href="#">Welcome to YOUR EXPENSES!</a>
          </div>

          <div className="nav-links">
            <Link to="/expense">Expenses</Link>
            <Link to="/income">Income</Link>
            <Link to="/report">Report</Link>
            <Link to="/settings">Settings</Link>
          </div>

          <div className="right-section">

            <div className="profile">
              <div className="info">
              <img src={profileImage} alt="Profile" />
                <div>
                  <a href="#">{user ? user.username : 'Loading...'}</a>
                </div>
              </div>
              <i className="bx bx-chevron-down"></i>
            </div>
          </div>
        </div>

        <div className="status">
          <div className="header">
            <h4 id="big">Account Overview</h4>
            <h4 id="big" className="right">Weekly Expenses</h4>
          </div>
          

          <div className="items-list">
            <div className="item">
              <Link to='/total-income'>
                <div className="info">
                  <div>
                    <h5>Total Income This Month</h5>
                  </div>
                  <i className="bx bx-money"></i>
                </div>
                <div className="progress">
                <div className="bar"  ></div>
                  {/* Display dynamic total income */}
                  <div className="dynamic-income"></div>
                </div>
              </Link>
            </div>

            <div className="item">
              <Link to='/total-expenses'>
                <div className="info">
                  <div>
                    <h5>Total Expenses This Month</h5>
                  </div>
                  <i className="bx bx-money-withdraw"></i>
                </div>
                <div className="progress">
                  <div className="bar"></div>
                </div>
              </Link>
            </div>

            <div className="item">
              <div className="info">
                <div>
                  <h5>Cash Flow</h5>
                </div>
                <i className="bx bxs-dollar-circle"></i>
              </div>
              <div className="progress">
                <div className="bar"></div>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <i className="bx bx-bar-chart"></i>
              </div>
              <div className="chart">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bottom-container">
        <div className="prog-status">
          
          
          <div className="header">
            <div className="tabs" role="tablist">
            {['1Y', '6M', '1M'].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
          {tab}
        </button>
      ))}
    </div>
          </div>

          <div className="details">
            <div className="item">
              <h2>Expense</h2>
              <p>Chart</p>
            </div>
            <div className="separator"></div>
            <div className="item">
              <h2>Income</h2>
              <p>Chart</p>
            </div>
          </div>
           
          <div className="chart-container">
            <h2>Income and Expense Summary</h2>
            {lastMonthIncome !== null && last6MonthsIncome !== null && lastYearIncome !== null && 
            lastMonthExpense !== null && last6MonthsExpense !== null && lastYearExpense !== null ? (
              <Bar data={data} options={barChartOptions} />
            ) : (
                <div className="loading-message">
                    <p>Loading data...</p>
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
            
        </div>

        <div className="popular">
          <div className="header">
            <h4>Goal</h4>
            <a href="#"># Target</a>
          </div>

          <div className="Goal">
            <i className="bx bx-target-lock"></i>
            <b>Achieve Your Goal</b>
          </div>
          <p>Set the goal and SAVE!</p>
          <div className="listen">
            <div className="author">
              <div>
                <a href="#">Smart Refrigerator</a>
              </div>
            </div>
            <button>
              SAVE<i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
          
        </div>

        <div className="upcoming">
          <div className="header">
            <h4>Schedule Expenses</h4>
            <a href="#">
              {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
            </a>
          </div>

          <div className="tabs">
            <Calendar
              onChange={setDate}
              value={date}
              next2Label={null}
              prev2Label={null}
            />
          </div>

          <div className="events">
            <div className="event-list">
              <h3>Upcoming Events</h3>
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id}>
                    <div className="event">
                      <p>{event.name}</p>
                      <p>{event.date}</p>
                    </div>
                    <div className="line"></div>
                  </div>
                ))
              ) : (
                <p>No upcoming events</p>
              )}
            </div>
          </div>
          <form onSubmit={handleAddEvent}>
            <input
              type="text"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              placeholder="Event Name"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              placeholder="Event Date"
            />
            <button type="submit">Add Event</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
