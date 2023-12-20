import React from 'react'

const UserProfile = ({ params }: any) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-semibold mb-5">UserProfile</h1>
            <p>User Profile description {params.id}</p>
        </div>
    )
}

export default UserProfile