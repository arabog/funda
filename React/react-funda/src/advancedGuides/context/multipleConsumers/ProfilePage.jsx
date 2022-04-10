import React from 'react'


const ProfilePage = (props) => {


          return (
                    <div style= {{backgroundColor: 'purple', cursor: 'pointer', width: '80%', color: 'white'}} >
                              <div style={{width: '30%', display: 'inline-block'}}>{props.theme}</div>

                              <div style={{width: '30%', display: 'inline-block'}}>{props.user}</div>
                    </div>
          )
}


export default ProfilePage