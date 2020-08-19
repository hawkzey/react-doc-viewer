import React, { FC, useCallback, useContext } from "react";
import styled from "styled-components";
import { setRendererRect } from "./state/main/actions";
import { MainContext } from "./state/main/Context";
import useDocumentLoader from "./utils/useDocumentLoader";
import useWindowSize from "./utils/useWindowSize";
import { IStyledProps } from "./types";

const ProxyRenderer: FC<{}> = () => {
  const { CurrentRenderer } = useDocumentLoader();

  const size = useWindowSize();
  const { dispatch } = useContext(MainContext);

  const containerRef = useCallback(
    (node) => node && dispatch(setRendererRect(node?.getBoundingClientRect())),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size]
  );

  if (!CurrentRenderer) return null;
  return (
    <Container ref={containerRef}>
      <CurrentRenderer />
    </Container>
  );
};

export default ProxyRenderer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  /* width */
  &::-webkit-scrollbar {
    ${(props: IStyledProps) => {
      return props.theme.disableThemeScrollbar ? "" : "width: 10px";
    }};
  }
  /* Track */
  &::-webkit-scrollbar-track {
    /* background: ${(props: IStyledProps) => props.theme.secondary}; */
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${(props: IStyledProps) => props.theme.tertiary};
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${(props: IStyledProps) => props.theme.primary};
  }
`;