import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PetsList from '../components/PetsList';
import NewPetModal from '../components/NewPetModal';
import Loader from '../components/Loader';

const ALL_PETS = gql`
  query AllPets {
    pets{
      id
      name
      type
      img
    }
  }
`;

const CREATE_PET = gql`
  mutation CreateAPet($newPet:NewPetInput!) {
    xxAddPet: addPet(input: $newPet){
      id,
      name,
      type,
      img
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { data, loading, error } = useQuery(ALL_PETS);
  const [createPet, { data: d, loading: l, error: e }] = useMutation(
    CREATE_PET,
    {
      update(cache, { data: { xxAddPet } }) {
        const data = cache.readQuery({ query: ALL_PETS });
        cache.writeQuery({
          query: ALL_PETS,
          data: { pets: [xxAddPet, ...data.pets] }
        });
      },
      // optimisticResponse: {
      //   __typename: "Mutation",
      //   xxAddPet: {
      //     __typename: "Pet",
      //     id: Math.floor(Math.random() * 10000) + '',
      //     name: 'from mutations',
      //     type: 'CAT',
      //     img: 'https://via.placeholder.com/300'
      //   }
      // }
    }
  );

  if (loading) {
    return <Loader />;
  }

  if (error || e) {
    return <p>Something went wrong!</p>;
  }

  const onSubmit = input => {
    setModal(false);
    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: "Mutation",
        xxAddPet: {
          id: Math.round(Math.random() * 1000000) + '',
          __typename: 'Pet',
          type: input.type,
          name: input.name,
          img: 'https://via.placeholder.com/300'
        }
      }
    });
  };

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        {console.log(data)}
        <PetsList pets={data.pets} />
      </section>
    </div>
  );
}
