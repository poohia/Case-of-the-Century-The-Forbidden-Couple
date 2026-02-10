import styled from "styled-components";

export const NotesInspecteurWithImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    --swiper-pagination-color: ${({ theme }) => theme.colors.secondary};
    &:nth-child(1) {
      width: 600px;
      max-width: 100%;
      height: 338px;
      max-height: 67vh;
      align-self: center;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: contain;
        object-position: center;
      }
    }
  }
`;
