import { gql, useMutation } from "@apollo/client";
import { clientMutation } from "./Query";
import styled from "styled-components";
import toast from "react-hot-toast";

const AnimeCardButton = styled.button`
  border: 1px solid #ddd;
  outline: none;
  cursor: pointer;
  padding: 0.3rem;
`;

const ADD_TO_CURRENTLY_WATCHING = gql`
  mutation AddAnime($mediaId: Int) {
    SaveMediaListEntry(mediaId: $mediaId, status: CURRENT) {
      id
    }
  }
`;

export function AddAnime({ id, userPreferred }) {
  // eslint-disable-next-line no-unused-vars
  const [addAnime, { data }] = useMutation(ADD_TO_CURRENTLY_WATCHING, {
    client: clientMutation,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addAnime({ variables: { mediaId: id } });
        toast(`Added ${userPreferred} to watch list`);
      }}
    >
      <AnimeCardButton type="submit">Add to watch list</AnimeCardButton>
    </form>
  );
}
