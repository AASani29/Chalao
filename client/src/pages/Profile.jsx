import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { app } from '../firebase';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector(state => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async image => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      error => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>
          setFormData({ ...formData, profilePicture: downloadURL }),
        );
      },
    );
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="bg-cream min-h-screen px-4"
      style={{ backgroundColor: '#ffffff' }}
    >
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto py-8">
        {/* Left Section with Profile Picture and Info */}
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md p-8">
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-32 w-32 mb-4 cursor-pointer rounded-full object-cover"
            onClick={() => fileRef.current.click()}
          />
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
          />
          <p className="text-sm text-center mb-4">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ''
            )}
          </p>
        </div>

        {/* Right Section with Form */}
        <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-7 text-red-800">
            Profile
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              defaultValue={currentUser.username}
              type="text"
              id="username"
              placeholder="Username"
              className="bg-cream p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={handleChange}
            />
            <input
              defaultValue={currentUser.email}
              type="email"
              id="email"
              placeholder="Email"
              className="bg-cream p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-cream p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={handleChange}
            />
            <button className="bg-red-800 text-white font-semibold p-3 rounded-lg uppercase hover:bg-red-600">
              {loading ? 'Loading...' : 'Update'}
            </button>
          </form>
          <div className="flex justify-between mt-5">
            <span
              onClick={handleDeleteAccount}
              className="text-red-500 cursor-pointer font-semibold hover:text-red-600"
            >
              Delete Account
            </span>
            <span
              onClick={handleSignOut}
              className="text-gray-500 font-semibold hover:text-gray-700 cursor-pointer"
            >
              Sign out
            </span>
          </div>
          <p className="text-red-700 mt-5 font-semibold text-center">
            {error && 'Something went wrong!'}
          </p>
          <p className="text-green-700 mt-5 font-semibold text-center">
            {updateSuccess && 'User is updated successfully!'}
          </p>
        </div>
      </div>
    </div>
  );
}
