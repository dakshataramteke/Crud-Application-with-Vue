const userService = require('../service/UserService');

/* === Registration Form === */

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const createdUser = await userService.createUserData(userData)
    
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: createdUser
    });
  } catch (error) {
    console.error("Error in user creation:", error);
    res.status(500).json({
      success: false,
      message: error.message 
    });
  }
};

/* ==== Get All Users Data ==== */ 

const getUsers = async(req,res)=>{
    try{
        const getUser = await userService.getUsersData()

        res.status(200).json({
            success:true,
            message:"Get User Successfully",
            data : getUser
        });
    }catch(error){
        console.error("Error in getting Data:", error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

/* === Get Edit USers ===  */

const getEditUser = async(req,res)=>{
    try{
           let { id } = req.params;

        const getUser = await userService.getEditUser( id)
        res.status(200).json({
            success:true,
            message:"Get User SUccessfully",
            data: getUser
        })
    }catch(error){
        console.error("Error in Getting Data :", error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

/* === Edit User === */ 

const editUser = async(req,res) =>{
    try{
        let { id } = req.params;
        const userData = req.body;
        const editUser = await userService.editUser(id, userData)

        res.status(200).json({
            success:true,
            message:"Edit USer Successfully",
            data : editUser
        })
    }catch(error){
        console.error("Error in Editing Data : ", error);
        res.status(500). json({
            success:false,
            message:error.message
        })
    }
}

/* === Delete the Data === */

const deleteUser = async(req,res)=>{
    try{
          const { id } = req.params;
        const getUser = await userService.deleteUser(id)
        res.status(200).json({
            success:true,
            message:"Delete User Successfully",
            data: getUser
        })
    }catch(error){
        console.error("Error in Deleting User:", error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

module.exports = {
  createUser,
   getUsers,
   getEditUser, 
   editUser, 
   deleteUser
};

