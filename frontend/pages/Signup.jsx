import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    username: "demo",
    email: "demo@email.com",
    password: "demo",
    gender: "male",
    profilePhoto: null
  })
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    if (e.target.name === "profilePhoto") {
      setDetails({ ...details, profilePhoto: e.target.files[0] })
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setDetails({ ...details, [e.target.name]: e.target.value })
    }
  }
  console.log(details)

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true)
    const formData = new FormData();

    formData.append('username', details.username);
    formData.append('email', details.email);
    formData.append('password', details.password);
    formData.append('gender', details.gender);
    formData.append('profilePhoto', details.profilePhoto);

    try {

      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        credentials: "include",
        body: formData
      });

      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        navigate('/chat')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error?.message);
    }
    setLoading(false)
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-white">

        <h2 className="text-2xl font-bold text-center pb-6">
          Create your Fluxa account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex flex-col items-center">
            {
              image && <img
                src={image}
                alt="preview"
                className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover mb-3"
              />
            }
            <label className="text-sm text-indigo-400 cursor-pointer">
              Upload Profile Photo
              <input
                type="file"
                accept="image/*"
                name="profilePhoto"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={details.username}
            name="username"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={details.email}
            name="email"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={details.password}
            name="password"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Gender Selection */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Gender</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={details.gender}
                  onChange={() => setDetails({ ...details, gender: 'male' })}
                />
                Male
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={details.gender}
                  onChange={() => setDetails({ ...details, gender: 'female' })}
                />
                Female
              </label>
            </div>
          </div>

          <button className={`w-full bg-indigo-500 py-2 rounded-lg hover:bg-indigo-600 transition`} disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center pt-4">
          Already have an account?
          <Link to={'/login'} className="text-indigo-400 cursor-pointer"> Login</Link>
        </p>
      </div>
    </div>
  );
}