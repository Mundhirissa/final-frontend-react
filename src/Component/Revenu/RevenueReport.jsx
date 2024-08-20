import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';

const RevenueReport = () => {
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [revenueDetails, setRevenueDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalAmountResponse = await axios.get('http://localhost:8080/api/payments/total-amount-per-year');
        setTotalRevenue(totalAmountResponse.data);

        const amountPerStadiumResponse = await axios.get('http://localhost:8080/api/payments/amount-per-year-per-stadium');
        setRevenueDetails(amountPerStadiumResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const report = document.getElementById('report');
    html2canvas(report).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('revenue_report.pdf');
    });
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger" role="alert">Error fetching data: {error.message}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Revenue Report</h1>

      <div id="report">
        <section className="mb-5">
          <h2>Total Revenue</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Year</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {totalRevenue.map((item, index) => (
                <tr key={index}>
                  <td>{item.year}</td>
                  <td>{item.totalAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Revenue Details by Stadium</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Stadium Name</th>
                <th>Year</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {revenueDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.stadiumName}</td>
                  <td>{item.year}</td>
                  <td>{item.totalAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <button className="btn btn-primary mt-4" onClick={downloadPDF}>
        Download Report as PDF
      </button>
    </div>
  );
};

export default RevenueReport;
