import * as ToastPrimitive from "@radix-ui/react-toast";

type ToastProps = {
  title: string;
  content: string;
  children: React.ReactNode;
};

function Toast({ title, content, children, ...props }: ToastProps) {
  return (
    <ToastPrimitive.Root {...props}>
      <ToastPrimitive.Title>{title}</ToastPrimitive.Title>
      <ToastPrimitive.Description>{content}</ToastPrimitive.Description>
      {children}
    </ToastPrimitive.Root>
  );
}

export default Toast;
