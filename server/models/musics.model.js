module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        subtitle: String,
        owner: String,
      },
    );
    const Music = mongoose.model("mern_crud_music", schema);
    return Music;
};