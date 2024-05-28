import { FC, PropsWithChildren, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export const Modal: FC<PropsWithChildren<Dialog.DialogProps>> = ({
  children,
  ...props
}) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-50" />
        {children}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const ModalContent = forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  PropsWithChildren<Dialog.DialogContentProps>
>(({ children, ...props }, ref) => (
  <Dialog.Content
    ref={ref}
    {...props}
    className="fixed top-1/2 left-1/2 z-50 w-full max-w-md p-6 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg focus:outline-none"
  >
    {children}
  </Dialog.Content>
));

ModalContent.displayName = 'ModalContent';
export const ModalHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const ModalFooter: FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-4">{children}</div>;
};

export const ModalTitle: FC<PropsWithChildren<Dialog.DialogTitleProps>> = ({
  children,
  ...props
}) => {
  return (
    <Dialog.Title
      {...props}
      className="text-lg font-medium leading-6 text-gray-900"
    >
      {children}
    </Dialog.Title>
  );
};

export const ModalBody: FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};
