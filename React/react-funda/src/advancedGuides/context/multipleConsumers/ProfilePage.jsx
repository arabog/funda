import React from 'react'


const ProfilePage = (props) => {


          return (
                    <div style= {{backgroundColor: 'purple', cursor: 'pointer'}} >
                              {props.user}
                    </div>
          )
}


export default ProfilePage