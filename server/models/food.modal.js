module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        subtitle: String,
        owner: String,
      },
    );
    const Food = mongoose.model("mern_crud_food", schema);
    return Food;
};