module.exports = {
  Query: {
      // initial value, arguments, context obj, ast of incoming query
      getUser(_, __, {models}){
        models.User.findOne({})
      },
      getPets(_, {input}, {models}){
         return models.Pet.findMany(input)
      },
      getPet(_, {input}, {models}){
        return models.Pet.findOne(input)
      }
  },
  Mutation: {
    newPet(_, {input}, ctx){
      const pet = ctx.models.Pet.create(input)
      return pet
    }
  },
  // Pet: {
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   }
  // },
  // User: {
    
  // }
}
