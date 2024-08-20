import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bookingperyear = () => {
    const [chartData, setChartData] = useState(null);  // Start with null to handle loading state
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        fetch('http://localhost:8080/api/bookings/count-per-year')
            .then(response => response.json())
            .then(data => {
                const years = Object.keys(data);
                const counts = Object.values(data);

                setChartData({
                    labels: years,
                    datasets: [
                        {
                            label: 'Bookings per Year',
                            data: counts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
                setLoading(false);  // Set loading to false when data is ready
            })
            .catch(error => {
                console.error('Error fetching bookings per year:', error);
                setLoading(false);  // Even on error, stop loading
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Display a loading message while data is being fetched
    }

    return (
        <div>
            <h2>Bookings Per Year</h2>
            {chartData ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Number of Bookings Per Year',
                            },
                        },
                    }}
                />
            ) : (
                <div>No data available</div>  // Handle the case where no data is returned
            )}
        </div>
    );
};

export default Bookingperyear;
