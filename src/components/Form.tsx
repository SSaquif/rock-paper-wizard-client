// Using Compound Component pattern
import { CSSProperties } from "@stitches/react";
import React, { ReactNode } from "react";
import {
  Form as ReactRouterForm,
  FormProps as ReactRouterFormProps,
} from "react-router-dom";
import { styled } from "../stitches-theme";

/*
 * Primary Component
 * Form
 */
interface FormProps extends ReactRouterFormProps {
  children: ReactNode;
  className?: string; // think this needed for stitches API to work in other components
  style?: CSSProperties;
}

/*
 * @todo:
 * I think I should be able do some TS trick to get the props of sub components
 * without having to re-declare them here
 */
interface IForm extends React.FC<FormProps> {
  DataRow: React.FC<
    {
      type: "real" | "fake";
      style?: CSSProperties;
      className?: string;
    } & React.PropsWithChildren
  >;
  Title: React.FC<{
    children: string;
    style?: CSSProperties;
    className?: string;
  }>;
  Label: React.FC<
    {
      style?: CSSProperties;
      className?: string;
    } & React.LabelHTMLAttributes<HTMLLabelElement>
  >;
  Input: React.FC<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;
}

const StyledForm = styled(ReactRouterForm, {
  // base styles if necessary
  // perhaps stuff for different devices
});

const Form: IForm = ({ children, className, ...props }) => {
  return (
    <StyledForm className={className} {...props}>
      {children}
    </StyledForm>
  );
};

/**
 * Sub-component
 * Form Data Row Container
 */
const StyledFormRowContainer = styled("div", {
  variants: {
    type: {
      real: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        minWidth: "fit-content",
        // border: "solid",
        "@tabletAndUp": {
          flexDirection: "row",
        },
      },
      fake: {
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        zIndex: -1,
      },
    },
  },
});

const FormRowContainer: React.FC<
  {
    type: "real" | "fake";
    style?: CSSProperties;
    className?: string;
  } & React.PropsWithChildren
> = ({ type, style, className, children }) => {
  return (
    <StyledFormRowContainer type={type} style={style} className={className}>
      {children}
    </StyledFormRowContainer>
  );
};

/**
 * Sub-component
 * Form Title
 */
const StyledFormTitle = styled("h1", {});

const FormTitle: React.FC<{
  children: string;
  style?: CSSProperties;
  className?: string;
}> = ({ children, style, className }) => {
  return (
    <StyledFormTitle style={style} className={className}>
      {children}
    </StyledFormTitle>
  );
};

/**
 * Sub-component
 * Form Label
 */
const StyledFormLabel = styled("label", {
  flexBasis: "30%",
  fontSize: "1.5rem",
  fontWeight: "900",
  // minWidth: "max-content",
});

const FormLabel: React.FC<
  {
    style?: CSSProperties;
    className?: string;
  } & React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ children, style, className }) => {
  return (
    <StyledFormLabel style={style} className={className}>
      {children}
    </StyledFormLabel>
  );
};

/**
 * Sub-component
 * Form Input
 */
const StyledFormInput = styled("input", {
  flexBasis: "50%",
  fontSize: "1.5rem",
  fontWeight: "900",
});

const FormInput: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = ({ children, style, className }) => {
  return (
    <StyledFormInput style={style} className={className}>
      {children}
    </StyledFormInput>
  );
};

Form.Title = FormTitle;
Form.DataRow = FormRowContainer;
Form.Label = FormLabel;
Form.Input = FormInput;

export default Form;
