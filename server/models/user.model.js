module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstname : String, 
        lastname : String,
        address : String,
        tel : String,
        email : String,
        username: String,
        password: String,
        video: Boolean,
        music: Boolean,
        food : Boolean,
      },
    );
    const Login = mongoose.model("mern_crud_user", schema);
    return Login;
};