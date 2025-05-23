import styled from "styled-components";

export const SavesContainer = styled.div`
  padding: 10px;
  margin: 0 auto;
  overflow-y: auto;
  padding-top: clamp(15px, var(--sat), var(--sat));
  padding-right: clamp(15px, var(--sar), var(--sar));
  padding-bottom: clamp(5px, var(--sab), var(--sab));
  padding-left: clamp(15px, var(--sal), var(--sal));

  background-color: #2b2b2b;
  color: white;
  height: calc(100% - 10px);
  width: calc(100% - clamp(30px, var(--sal), var(--sal)));
  button {
    display: inline-block;
    outline: 0;
    cursor: pointer;
    text-align: center;
    /* border: 1px solid #a9a9a9; */
    padding: 9px 6px;
    color: white;
    background: #2b2b2b;
    border-radius: 4px;
    font-weight: 500;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
    border: none;
  }
`;

export const SavesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  > div {
    &:last-child {
      padding-right: 15px;
    }
  }
`;

export const SectionCreateSave = styled.div`
  border: 1px solid #a9a9a9;
  border-radius: 10px;
  width: calc(100% - clamp(15px, var(--sal), var(--sal)));
  padding: 10px;
  position: relative;
  margin-bottom: 20px;
  > div {
    &:nth-child(1) {
      position: absolute;
      background-color: #2b2b2b;
      top: -9px;
      left: 14px;
    }
    &:nth-child(2) {
      display: flex;
      padding: 10px 0;
      > div {
        flex: 1;
        margin: 0 4px;
        &:nth-child(1) {
          flex: 4;
        }
        input,
        button {
          width: 100%;
          height: 36px;
          font-size: 16px;
          box-shadow:
    /* ombre principale */
            0 4px 10px rgba(0, 0, 0, 0.6),
            /* légère lumière interne pour relever les bords */ inset 0 1px 3px
              rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          border: none;
        }
        input {
          padding-left: 20px;
        }
        form {
          margin: 0;
        }
      }
    }
    &:nth-child(3) {
      label {
        font-size: 0.9rem;
      }
    }
  }
`;

export const AllSaveContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 4px;
  > div {
    flex-basis: calc(50% - 60px);
    margin: 10px;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    box-shadow:
    /* ombre principale */
      0 4px 10px rgba(0, 0, 0, 0.6),
      /* légère lumière interne pour relever les bords */ inset 0 1px 3px
        rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 4px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    > div {
      &:nth-child(1) {
        flex: 1;
      }
      p {
        font-size: 0.9rem;
        font-style: italic;
        margin: 5px;
      }
      h3 {
        margin: 10px 5px 5px 0;
      }
    }
  }
`;
