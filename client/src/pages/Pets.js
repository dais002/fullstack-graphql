import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import PetsList from "../components/PetsList";
import NewPetModal from "../components/NewPetModal";
import Loader from "../components/Loader";

const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
`;

const NEW_PET = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  // useQuery takes a graphQL query returning 3 properties
  const { data, loading, error } = useQuery(ALL_PETS);

  // useMutation returns an array with 2 properties, the mutation query and an object of 3 properties (data, loading, error)
  // mutation happens when you execute the function (1st arg in the array)
  const [createPet, newPet] = useMutation(NEW_PET);

  // submit button to create pet
  const onSubmit = input => {
    setModal(false);
    createPet({
      variables: {newPet: input}
    });
  };

  if (loading || newPet.loading) {
    return <Loader />;
  }

  if (error || newPet.error) {
    return <p>Error</p>;
  }

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
        <PetsList pets={data.pets} />
      </section>
    </div>
  );
}
