// Using Compound Component pattern

import React, { forwardRef } from "react";
import {
  Form as ReactRouterForm,
  FormProps as ReactRouterFormProps,
} from "react-router-dom";
import { styled } from "../stitches-theme";

interface FormRowContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "real" | "fake";
}

/*
 * @todo: Test to see if useRef works with this pattern
 */
interface IForm extends React.FC<ReactRouterFormProps> {
  DataRow: React.FC<FormRowContainerProps>;
  Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>>;
  // Input: React.FC<
  //   React.DetailedHTMLProps<
  //     React.InputHTMLAttributes<HTMLInputElement>,
  //     HTMLInputElement
  //   >
  // >;
  Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
}

/**
 * Main Form Component
 */
const StyledForm = styled(ReactRouterForm, {
  // @todo: perhaps add base styles for responsive design here
  border: "2px solid gold",
  padding: "1rem",
});

const Form: IForm = ({ children, ...props }) => {
  return <StyledForm {...props}>{children}</StyledForm>;
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

/**
 * Sub-component
 * Container for form data row
 * @param type - "real" | "fake"
 */
const FormRowContainer: React.FC<FormRowContainerProps> = ({
  type,
  children,
  ...props
}) => {
  return (
    <StyledFormRowContainer type={type} {...props}>
      {children}
    </StyledFormRowContainer>
  );
};

/**
 * Sub-component
 * Form Title
 */
const FormTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return <h1 {...props}>{children}</h1>;
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

const FormLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  style,
  className,
}) => {
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

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  ...props
}) => {
  return <StyledFormInput {...props}>{children}</StyledFormInput>;
};

Form.Title = FormTitle;
Form.DataRow = FormRowContainer;
Form.Label = FormLabel;
Form.Input = FormInput;

export default Form;
