import styled from 'styled-components';

export const Badge = styled.li`
	list-style-type: none;
	position: relative;

	${({ count }) =>
		count > 1 &&
		`&::before {
		content: 'x ${count}';
        background: #b71952;
        color: #fff;
        position: absolute;
        right: 4px;
        top: 4px;
        text-align: center;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: 700;
	}`}
`;
