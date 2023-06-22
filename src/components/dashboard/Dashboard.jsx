import React, { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { storage, auth, db } from '../../firebase';
import './dashboard.css';
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const location = useLocation();
  const userDetails = location.state?.userDetails;

  useEffect(() => {
    const usersCollectionRef = collection(db, 'students');
    const usersQuery = query(usersCollectionRef);

    const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        const userData = { uid: doc.id, ...doc.data() };
        usersData.push(userData);
      });
      setUsers(usersData);
    });

    return () => unsubscribe(); // Clean up the snapshot listener when component unmounts
  }, []);

  const handleEdit = (userId) => {
    const user = users.find((user) => user.uid === userId);
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleUpdate = async (userId, data) => {
    try {
      const userDocRef = doc(db, 'students', userId);
      const userData = {
        ...data,
        // Update the user's details here
      };
      await updateDoc(userDocRef, userData);
      console.log(`User with ID ${userId} updated successfully`);
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const userDocRef = doc(db, 'students', userId);
      const userAuth = auth.currentUser;
  
      // Delete user from Firebase Authentication
      await userAuth.delete();
  
      // Delete user from Firestore
      await deleteDoc(userDocRef);
  
      console.log(`User with ID ${userId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  

  const handleAddPreviousEvent = () => {
    setSelectedUser({
      ...selectedUser,
      previousEvents: [
        ...selectedUser.previousEvents,
        {
          eventName: '',
          dateOfEvent: '',
          timeOfEvent: '',
          venue: '',
          coOrdinator: '',
          coOrdinatorNumber: '',
        },
      ],
    });
  };

  const handleDeletePreviousEvent = (eventIndex) => {
    const updatedPreviousEvents = selectedUser.previousEvents.filter(
      (event, index) => index !== eventIndex
    );
    setSelectedUser({
      ...selectedUser,
      previousEvents: updatedPreviousEvents,
    });
  };

  const handleUpdatePreviousEvent = (eventIndex, eventField, value) => {
    const updatedPreviousEvents = [...selectedUser.previousEvents];
    updatedPreviousEvents[eventIndex] = {
      ...updatedPreviousEvents[eventIndex],
      [eventField]: value,
    };
    setSelectedUser({
      ...selectedUser,
      previousEvents: updatedPreviousEvents,
    });
  };

  const handleAddUpcomingEvent = () => {
    setSelectedUser({
      ...selectedUser,
      upcomingEvents: [
        ...selectedUser.upcomingEvents,
        {
          eventName: '',
          dateOfEvent: '',
          timeOfEvent: '',
          venue: '',
          coOrdinator: '',
          coOrdinatorNumber: '',
        },
      ],
    });
  };

  const handleDeleteUpcomingEvent = (eventIndex) => {
    const updatedUpcomingEvents = selectedUser.upcomingEvents.filter(
      (event, index) => index !== eventIndex
    );
    setSelectedUser({
      ...selectedUser,
      upcomingEvents: updatedUpcomingEvents,
    });
  };

  const handleUpdateUpcomingEvent = (eventIndex, eventField, value) => {
    const updatedUpcomingEvents = [...selectedUser.upcomingEvents];
    updatedUpcomingEvents[eventIndex] = {
      ...updatedUpcomingEvents[eventIndex],
      [eventField]: value,
    };
    setSelectedUser({
      ...selectedUser,
      upcomingEvents: updatedUpcomingEvents,
    });
  };

  return (
    <>
   
    <div className="dashboard">
    <Navbar type="pnavbar" />
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.uid}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.uid)}>Edit</button>
                <button
                  onClick={() =>
                    handleUpdate(user.uid, {
                      ...user,
                      // Update the user's details here
                    })
                  }
                >
                  Update
                </button>
                <button onClick={() => handleDelete(user.uid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editModalOpen && selectedUser && (
        <div className ="edit-user-modal">
          <h3>Edit User</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(selectedUser.uid, selectedUser);
            }}
          >
            <label>
              Full Name:
              <input
                type="text"
                value={selectedUser.fullname}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    fullname: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                value={selectedUser.phoneNumber}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Year:
              <input
                type="text"
                value={selectedUser.year}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, year: e.target.value })
                }
              />
            </label>
            <label>
              Branch:
              <input
                type="text"
                value={selectedUser.branch}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, branch: e.target.value })
                }
              />
            </label>
            <label>
              Date of Joining:
              <input
                type="text"
                value={selectedUser.dateOfJoining}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    dateOfJoining: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Camera Status:
              <input
                type="text"
                value={selectedUser.cameraStatus}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    cameraStatus: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Camera Model:
              <input
                type="text"
                value={selectedUser.cameraModel}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    cameraModel: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Interested Role:
              <input
                type="text"
                value={selectedUser.interestedRole}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    interestedRole: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={selectedUser.password}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    password: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Image:
              <input
                type="text"
                value={selectedUser.image}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    image: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                value={selectedUser.confirmPassword}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Is Admin:
              <input
                type="checkbox"
                checked={selectedUser.isAdmin}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    isAdmin: e.target.checked,
                  })
                }
              />
            </label>
           
            <label className='previous-event-field' >
  Previous Events:
  {selectedUser.previousEvents.map((event, eventIndex) => (
    <div key={eventIndex}>
        EVENT NAME :-
      <input
        type="text"
        value={event.eventName}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'eventName',
            e.target.value
          )
        }
      />
      DATE OF EVENT :- 
      <input
        type="text"
        value={event.dateOfEvent}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'dateOfEvent',
            e.target.value
          )
        }
      />
      TIME OF EVENT :-
      <input
        type="text"
        value={event.timeOfEvent}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'timeOfEvent',
            e.target.value
          )
        }
      />
      VENUE :-
      <input
        type="text"
        value={event.venue}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'venue',
            e.target.value
          )
        }
      />
      CO-ORDINATOR NAME :-
      <input
        type="text"
        value={event.coOrdinator}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'coOrdinator',
            e.target.value
          )
        }
      />
      CO-ORDINATOR NUMBER :-
      <input
        type="text"
        value={event.coOrdinatorNumber}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'coOrdinatorNumber',
            e.target.value
          )
        }
      />
      <button
        onClick={() => handleDeletePreviousEvent(eventIndex)}
      >
        Delete
      </button>
    </div>
  ))}
  <button onClick={handleAddPreviousEvent}>Add Event</button>
</label>


<label className="upcoming-event-field" >

  Upcoming Events:
  {selectedUser.upcomingEvents.map((event, eventIndex) => (
    <div key={eventIndex}>
      EVENT NAME :-
      <input
        type="text"
        value={event.eventName}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'eventName',
            e.target.value
          )
        }
      />
      DATE OF EVENT :- 
      <input
        type="text"
        value={event.dateOfEvent}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'dateOfEvent',
            e.target.value
          )
        }
      />
      TIME OF EVENT :-
      <input
        type="text"
        value={event.timeOfEvent}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'timeOfEvent',
            e.target.value
          )
        }
      />
      VENUE :-
      <input
        type="text"
        value={event.venue}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'venue',
            e.target.value
          )
        }
      />
      CO-ORDINATOR NAME :-
      <input
        type="text"
        value={event.coOrdinator}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'coOrdinator',
            e.target.value
          )
        }
      />
      CO-ORDINATOR NUMBER :-
      <input
        type="text"
        value={event.coOrdinatorNumber}
        onChange={(e) =>
          handleUpdatePreviousEvent(
            eventIndex,
            'coOrdinatorNumber',
            e.target.value
          )
        }
      />
      <button onClick={() => handleDeleteUpcomingEvent(eventIndex)}>
        Delete
      </button>
    </div>
  ))}
  <button onClick={handleAddUpcomingEvent}>Add Event</button>
</label>



            <button type="submit">Update User</button>
            <button onClick={() => setEditModalOpen(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
    </>
  );
};

export default Dashboard;
