module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            id: Number,
            url:String,
            name: String,
            type: String,
            language: String,
            genres: Array,
            status: String,
            runtime: Number,
            averageRuntime: Number,
            premiered: String,
            officialSite: String,
            schedule: Object,
            rating: Object,
            weight: Number,
            network: Object,
            webChannel: Object,
            dvdCountry: String,
            externals: Object,
            image: Object,
            summary:String,
            updated: Number,
            _links: Object
        },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const movies = mongoose.model("movies", schema);
    return movies;
  };