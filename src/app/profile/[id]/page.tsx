import React from 'react'

function ProfileParams({params}:any) {
  return (
    <div>
        <h1>
            ProfileParams
        </h1>
        <div>
            {params.id}
        </div>
    </div>

  )
}

export default ProfileParams