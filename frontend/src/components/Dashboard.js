import React from 'react';
import '../styles/dashboard.css';  // Import the CSS file
import { Line } from 'react-chartjs-2'; // Assuming you're using Line chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Income',
        data: [1000, 2000, 1500, 2200, 2500, 3000],
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: [500, 1500, 1000, 1800, 1700, 2300],
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
    ],
  };

  return (
    <div > 
      <div className="top-container">
        <div className="nav">
          <div className="logo">
            <i className="bx bx-wallet-alt"></i>
            <a href="#">Welcome to YOUR EXPENSES!</a>
          </div>

          <div className="nav-links">
            <a href="./Expense.js">Expenses</a>
            <a href="./Income.js">Income</a>
            <a href="./Report.js">Report</a>
            <a href="#">Settings</a>
          </div>

          <div className="right-section">
            <i className="bx bx-bell"></i>
            <i className="bx bx-search"></i>

            <div className="profile">
              <div className="info">
                <img src="../assets/profile.png" alt="Profile" />
                <div>
                  <a href="#">Alex Johnson</a>
                </div>
              </div>
              <i className="bx bx-chevron-down"></i>
            </div>
          </div>
        </div>

        <div className="status">
          <div className="header">
            <h4 id="big">Account Overview</h4>
            <h4 id="small">Weekly Expenses</h4>
          </div>

          <div className="items-list">
            <div className="item">
              <div className="info">
                <div>
                  <h5>Total Income This Month</h5>
                </div>
                <i className="bx bx-money"></i>
              </div>
              <div className="progress">
                <div className="bar"></div>
              </div>
            </div>
            <div className="item">
              <div className="info">
                <div>
                  <h5>Total Expenses This Month</h5>
                </div>
                <i className="bx bx-money-withdraw"></i>
              </div>
              <div className="progress">
                <div className="bar"></div>
              </div>
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
              <Line data={data} />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-container">
        <div className="prog-status">
          <div className="header">
            <h4>Category</h4>
            <div className="category">
              <i className="bx bx-plus"></i>
              <h4>Add Category</h4>
            </div>
            <div className="tabs">
              <a href="#" className="active">
                1Y
              </a>
              <a href="#">6M</a>
              <a href="#">3M</a>
            </div>
          </div>

          <div className="details">
            <div className="item">
              <h2>$1,10,000</h2>
              <p>Food & Drinks</p>
            </div>
            <div className="separator"></div>
            <div className="item">
              <h2>$65,000</h2>
              <p>Shopping</p>
            </div>
          </div>

          <canvas className="prog-chart"></canvas>
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
              July <i className="bx bx-chevron-down"></i>
            </a>
          </div>

          <div className="dates">
            <div className="item">
              <h5>Mo</h5>
              <a href="#">12</a>
            </div>
            <div className="item active">
              <h5>Tu</h5>
              <a href="#">13</a>
            </div>
            <div className="item">
              <h5>We</h5>
              <a href="#">14</a>
            </div>
            <div className="item">
              <h5>Th</h5>
              <a href="#">15</a>
            </div>
            <div className="item">
              <h5>Fr</h5>
              <a href="#">16</a>
            </div>
            <div className="item">
              <h5>Sa</h5>
              <a href="#">17</a>
            </div>
            <div className="item">
              <h5>Su</h5>
              <a href="#">18</a>
            </div>
          </div>

          <div className="events">
            <div className="item">
              <div>
                <i className="bx bx-time"></i>
                <div className="event-info">
                  <a href="#">Car EMI</a>
                  <p>10:00-11:30</p>
                </div>
              </div>
              <i className="bx bx-dots-horizontal-rounded"></i>
            </div>
            <div className="item">
              <div>
                <i className="bx bx-time"></i>
                <div className="event-info">
                  <a href="#">Electricity Bills</a>
                  <p>13:30-15:00</p>
                </div>
              </div>
              <i className="bx bx-dots-horizontal-rounded"></i>
            </div>
            <div className="item">
              <div>
                <i className="bx bx-time"></i>
                <div className="event-info">
                  <a href="#">House Rents</a>
                  <p>11:30-13:00</p>
                </div>
              </div>
              <i className="bx bx-dots-horizontal-rounded"></i>
            </div>
            <div className="item">
              <div>
                <i className="bx bx-time"></i>
                <div className="event-info">
                  <a href="#">Phone Recharge</a>
                  <p>10:00-11:30</p>
                </div>
              </div>
              <i className="bx bx-dots-horizontal-rounded"></i>
            </div>
            <div className="item">
              <div>
                <i className="bx bx-time"></i>
                <div className="event-info">
                  <a href="#">Add Expenses</a>
                  <p>Add time</p>
                </div>
              </div>
              <i className="bx bx-dots-horizontal-rounded"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
