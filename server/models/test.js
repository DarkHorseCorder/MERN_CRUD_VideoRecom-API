module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        number: Number,
        name: String,
        gender: String,
        age: Number,
        description: String
      },
    );
    const Test = mongoose.model("test", schema);
    return Test;
};