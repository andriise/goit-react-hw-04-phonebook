import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const FormContainer = styled.div`
	display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
	
`

export const FormButton = styled.button`
	display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: white;
    border-radius: 5px;
    color: black;
    font-size: 16px;
    font-weight: bold;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	margin-bottom: 15px;
	&:hover {
        transform: scale(1.05);
		background-color: aquamarine;
    }
`