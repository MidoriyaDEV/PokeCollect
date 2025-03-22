import styled from "styled-components";

const StyledInputRange = styled.input`
	height: 7px;
	-webkit-appearance: none;
	margin: 10px 0;
	width: 100%;
	/* Fundo dinâmico baseado na porcentagem */
	background: ${({ percentage }) =>
		`linear-gradient(to right, #5CFF73 0%, #5CFF73 ${percentage}%, white ${percentage}%, white 100%)`};
	border-radius: 5px;
	
	&:focus {
		outline: none;
	}

	&::-webkit-slider-runnable-track {
		background: transparent;
	}

	&::-webkit-slider-thumb {
		box-shadow: 0px 0px 0px #FFFFFF;
		border: 0px solid #12B500;
		height: 1px;
		width: 1px;
		border-radius: 0px;
		background: #72FF72;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: 14px;
	}

	&::-moz-range-track {
		background: transparent;
	}

	&::-moz-range-thumb {
		box-shadow: 0px 0px 0px #FFFFFF;
		border: 0px solid #12B500;
		height: 1px;
		width: 1px;
		border-radius: 0px;
		background: #72FF72;
		cursor: pointer;
	}

	&::-ms-track {
		background: transparent;
		border-color: transparent;
		color: transparent;
	}

	&::-ms-thumb {
		margin-top: 1px;
		box-shadow: 0px 0px 0px #FFFFFF;
		border: 0px solid #12B500;
		height: 1px;
		width: 1px;
		border-radius: 0px;
		background: #72FF72;
		cursor: pointer;
	}
`;

function StyledInputRangeComponent(props) {
	const { min = 0, max = 100, value } = props;
	const percentage =
		((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

	return <StyledInputRange type="range" percentage={percentage} {...props} />;

}

export default StyledInputRangeComponent;
