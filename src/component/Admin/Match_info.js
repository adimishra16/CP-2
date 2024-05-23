import React, { useState } from 'react';
import './Match_info.css';
import { useNavigate } from 'react-router-dom';

const MatchForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    team1: '',
    team2: '',
    venue: '',
    time_s: '',
    match_description: '',
    date: '',
    overs:''
  });
  const [formError, setFormError] = useState('');
  const [createdId, setCreatedId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyField = Object.entries(formData)
      .some(([, value]) => value.trim() === '');

    if (hasEmptyField) {
      setFormError('Please fill out all fields.');
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(formData.date);
      const selectedTime = new Date(`01/01/1970 ${formData.time_s}`);

      if (selectedDate < currentDate) {
        setFormError('Please select a date in the future.');
        return;
      }

      if (
        selectedDate.getTime() === currentDate.getTime() &&
        selectedTime <= currentDate
      ) {
        setFormError('Please select a time in the future.');
        return;
      }

      setFormError('');

      try {
        const response = await fetch('http://localhost:8000/api/match_info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Form data submitted successfully');
          setCreatedId(data.id);
          setFormData({
            team1: '',
            team2: '',
            venue: '',
            time_s: '',
            match_description: '',
            date: '',
            overs:''
          });
          navigate('/Squad_info', {
            state: {
              team1: formData.team1,
              team2: formData.team2,
              mID: data.id,
              overs: formData.overs
            }
          });
          console.log(data.id);
        } else {
          console.error('Failed to submit form data');
        }
      } catch (error) {
        console.error('Error occurred while submitting form data:', error);
      }
    }
  };

  return (
    <div className="match-form-container">
      <h2>Match Form</h2>
      {formError && <p className="error-message">{formError}</p>}
      <form onSubmit={handleSubmit} className="match-form">
        <div className="form-group">
          <label htmlFor="team1">Team 1:</label>
          <input
            type="text"
            id="team1"
            name="team1"
            value={formData.team1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team2">Team 2:</label>
          <input
            type="text"
            id="team2"
            name="team2"
            value={formData.team2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="venue">Overs:</label>
          <input
            type="number"
            id="overs"
            name="overs"
            value={formData.overs}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time_s">Time:</label>
          <input
            type="time"
            id="time_s"
            name="time_s"
            value={formData.time_s}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="match_description">Match Description:</label>
          <input
            type="text"
            id="match_description"
            name="match_description"
            value={formData.match_description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]} // Set min to today's date
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MatchForm;



