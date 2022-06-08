
const user = (()=>{
    const getCurrentUser = async (req,res) =>{
      res.json({message:'getCurrentUser'});

    };
    const updateCurrentUser = async (req, res) => {
      res.json({message:'updateCurrentUser'});
   };

  return {
    getCurrentUser,
    updateCurrentUser
  }
})();

module.exports = user;