import styled from "styled-components";

// Define an interface for your FlexBox props
interface FlexBoxProps {
  direction?: "row" | "column"; // Add more options as needed
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"; // Add more as needed
  align?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline"; // Add more as needed
  gap?: number;
}

// Use the FlexBoxProps interface with your styled component
const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  gap: ${(props) => props.gap || 0}px;
`;

export default FlexBox;
