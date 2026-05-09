import React from 'react'

const Profile = () => {
    return (
        <div class="min-h-screen bg-gray-900 text-white p-6">
            <div class="max-w-4xl mx-auto">

                <div class="flex items-center justify-between mb-8">
                    <h1 class="text-3xl font-bold">My Profile</h1>
                    <button class="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600">
                        Edit Profile
                    </button>
                </div>

                <div class="bg-gray-800 rounded-2xl shadow-lg p-6">

                    <div class="flex items-center gap-6">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="profile"
                            class="w-24 h-24 rounded-full border-4 border-indigo-500"
                        />

                        <div>
                            <h2 class="text-2xl font-semibold">Mauli Kashid</h2>
                            <p class="text-gray-400">@mauli_fluxa</p>
                            <p class="mt-2 text-sm text-gray-300">
                                Building modern chat experiences 🚀
                            </p>
                        </div>
                    </div>

                    <div class="mt-8 grid md:grid-cols-2 gap-6">

                        <div>
                            <p class="text-gray-400 text-sm">Email</p>
                            <p class="mt-1">mauli@example.com</p>
                        </div>

                        <div>
                            <p class="text-gray-400 text-sm">Phone</p>
                            <p class="mt-1">+91 9876543210</p>
                        </div>

                        <div>
                            <p class="text-gray-400 text-sm">Location</p>
                            <p class="mt-1">Pune, India</p>
                        </div>

                        <div>
                            <p class="text-gray-400 text-sm">Joined</p>
                            <p class="mt-1">January 2026</p>
                        </div>

                    </div>
                </div>

                <div class="mt-8 flex gap-4">
                    <button class="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600">
                        Logout
                    </button>
                    <button class="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600">
                        Delete Account
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Profile