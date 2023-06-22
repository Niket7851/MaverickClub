import React, { useEffect, useState } from 'react';
import './profile.css';
import Navbar from '../../components/navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, collectionGroup } from 'firebase/firestore';
import { firestore } from '../../firebase';

const Profile = () => {
  const location = useLocation();
  const userDetails = location.state?.userDetails;
  const [previousEvents, setPreviousEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [previousEventsOpen, setPreviousEventsOpen] = useState(false);
  const [upcomingEventsOpen, setUpcomingEventsOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const db = getFirestore();
        const userRef = collection(db, 'students');
        const querySnapshot = await getDocs(userRef);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        const currentUser = userData.find((user) => user.fullname === userDetails?.fullname);

        if (currentUser) {
          setPreviousEvents(currentUser.previousEvents || []);
          setUpcomingEvents(currentUser.upcomingEvents || []);
        }
      } catch (error) {
        console.log('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [userDetails]);

  const togglePreviousEvents = () => {
    setPreviousEventsOpen(!previousEventsOpen);
  };

  const toggleUpcomingEvents = () => {
    setUpcomingEventsOpen(!upcomingEventsOpen);
  };
  

  return (
    <>
      <div className="profile">
        <Navbar type="pnavbar" />
        <div className="wrapper">
          <div className="head">
            <h1>{userDetails?.fullname}</h1>
            <p>{userDetails?.interestedRole}</p>
          </div>
          <hr />
          <div className="info">
            <img src={userDetails?.image} alt="image" className="image" />
            <div className="data">
              <ul>
                <li>
                  name
                  <br />
                  {userDetails?.fullname}
                  <b></b>
                </li>
              </ul>
              <ul>
                <li>
                  Date Joining
                  <br />
                  <b>{userDetails?.dateOfJoining}</b>
                </li>
              </ul>
              <ul>
                <li>
                  Email
                  <br />
                  <b>{userDetails?.email}</b>
                </li>
              </ul>
            </div>
            <div className="data">
              <ul>
                <li>
                  YEAR
                  <br />
                  {userDetails?.year}
                </li>
              </ul>
              <ul>
              <li>
                  BRANCH
                  <br />
                  {userDetails?.course}
                </li>
                </ul>
                <ul> 
                <li>
                  BRANCH
                  <br />
                  {userDetails?.branch}
                </li>
                </ul>
              <ul>
                <li>
                  MOBILE NUMBER
                  <br />
                  <b>{userDetails?.phoneNumber}</b>
                </li>
              </ul>
            </div>
            <div className="data">
              <ul>
                <li>
                  HOSTLLER
                  <br />
                  <b>{userDetails.hostler}</b>
                </li>
              </ul>
              <ul>
                <li>
                  CAMERA STATUS
                  <br />
                  <b>{userDetails?.cameraStatus}</b>
                </li>
              </ul>
              <ul>
                <li>
                  EVENTS COVER
                  <br />
                  <b>{previousEvents.length}</b>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="aboutEvents">
            <div className="preEvent">
              <div className="section-header" onClick={togglePreviousEvents}>
                <h2>Events Covered <i className={`fas fa-chevron-down ${previousEventsOpen ? 'open' : ''}`}></i></h2>
                
              </div>
              {previousEventsOpen && (
                <>
                  {previousEvents.length === 0 ? (
                    <p>No previous events found.</p>
                  ) : (
                    previousEvents.map((event, index) => (
                      <div className="events" key={index}>
                        <p>EVENT NAME: {event.eventName}</p>
                        <p>DATE OF EVENT: {event.dateOfEvent}</p>
                        <p>Venue: {event.venue}</p>
                        <p>Time: {event.timeOfEvent}</p>
                        <p>Event Coordinator: {event.coOrdinator}</p>
                        <p>Event Coordinator Mobile Number: {event.coOrdinatorNumber}</p>
                      </div>
                    ))
                  )}
                </>
              )}
              <hr />
            </div>
            <div className="upComeEvent">
              <div className="section-header" onClick={toggleUpcomingEvents}>
                <h2>Upcoming Event  <i className={`fas fa-chevron-down ${upcomingEventsOpen ? 'open' : ''}`}></i></h2>
               
              </div>
              {upcomingEventsOpen && (
                <>
                  {upcomingEvents.length === 0 ? (
                    <p>No upcoming events found.</p>
                  ) : (
                    upcomingEvents.map((event, index) => (
                      <div className="events" key={index}>
                        <p>EVENT NAME: {event.eventName}</p>
                        <p>DATE OF EVENT: {event.dateOfEvent}</p>
                        <p>Venue: {event.venue}</p>
                        <p>Time: {event.timeOfEvent}</p>
                        <p>Event Coordinator: {event.coOrdinator}</p>
                        <p>Event Coordinator Mobile Number: {event.coOrdinatorNumber}</p>
                      </div>
                    ))
                  )}
                </>
              )}
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
