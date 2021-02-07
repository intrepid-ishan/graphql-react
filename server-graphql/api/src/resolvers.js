module.exports = {
  Query: {
      // initial value, arguments, context obj, ast of incoming query
      getUser(_, __, {models}){
        models.User.findOne({})
      },
      getPets(_, __, {models}){
         return models.Pet.findMany()
      }
  }
  // Mutation: {
    
  // },
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
