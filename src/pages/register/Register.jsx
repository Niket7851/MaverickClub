import React, { useEffect, useState } from 'react';
import './register.css';
import { getFirestore, doc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { storage, auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    year: '',
    hostler:'',
    branch: '',
    dateOfJoining: '',
    cameraStatus: '',
    cameramodel: '',
    interestedRole: '',
    coveredEvents: '',
    password: '',
    image: '',
    course :'',
    confirmPassword: '',
    isAdmin: false,
    previousEvents: [
      {
        eventName: '',
        dateOfEvent: '',
        timeOfEvent: '',
        venue: '',
        coOrdinator: '',
        coOrdinatorNumber: ''
      },
      // Additional previous events...
    ],
    upcomingEvents: [
      {
        eventName: '',
        dateOfEvent: '',
        timeOfEvent: '',
        venue: '',
        coOrdinator: '',
        coOrdinatorNumber: ''
      },
      // Additional upcoming events...
    ]
  });

  const [file, setFile] = useState('');
  const [per, setPer] = useState(null);

  
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPer(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match!');
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(res.user);

      const userDocRef = doc(db, 'students', res.user.uid);
      await setDoc(userDocRef, {
        ...formData,
        timeStamp: serverTimestamp(),
      });

      alert('You have successfully registered. Please check your email for verification.');

      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };  
  return (
    <div className="registration-page">
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span className="email-validation">
            {formData.email && !formData.email.endsWith('jecrcu.edu.in') && 'Email must end with jecrcu.edu.in'}
          </span>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Branch</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hostler</label>
          <select
            name="hostler"
            value={formData.hostler}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Camera Status</label>
          <select
            name="cameraStatus"
            value={formData.cameraStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      { formData.cameraStatus === 'yes' && <div className="form-group">
          <label>Camera Model</label>
          <input
            type="text"
            name="cameramodel"
            value={formData.cameramodel}
            onChange={handleChange}
            required
          />
        </div>}
        <div className="form-group">
          <label>Interested Role</label>
          <select
            name="interestedRole"
            value={formData.interestedRole}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="photographer">Photographer</option>
            <option value="videographer">Videographer</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <div className="form-group">
          <label>Upload Photo</label>
          <input
            type="file"
            name="image"
            value={formData.file}
            onChange={(e)=>setFile(e.target.files[0])}
            required
          />
        </div>
        <button disabled={per === null && per <= 100 } type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;

