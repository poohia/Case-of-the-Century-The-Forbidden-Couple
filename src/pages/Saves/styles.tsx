import styled from "styled-components";

export const SavesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-width: 700px;
  align-items: center;
  margin: 0 auto;
  padding: var(--sat) var(--sar) var(--sab) var(--sal);
  background-color: white;
  button {
    display: inline-block;
    outline: 0;
    cursor: pointer;
    text-align: center;
    border: 1px solid #babfc3;
    padding: 9px 6px;
    color: #202223;
    background: #ffffff;
    border-radius: 4px;
    font-weight: 500;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px;
    :hover {
      background: #f6f6f7;
      outline: 1px solid transparent;
    }
  }
`;

export const SavesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const SectionCreateSave = styled.div`
  border: 1px solid #a9a9a9;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  position: relative;
  > div {
    &:nth-child(1) {
      position: absolute;
      background-color: white;
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
        }
      }
    }
  }
`;
