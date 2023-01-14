module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        subtitle: String,
        owner: String,
      },
    );
    const Video = mongoose.model("mern_crud_video", schema);
    return Video;
};