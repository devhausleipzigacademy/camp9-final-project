import { ToastOptions, toast } from 'react-toastify';

interface ToastParams extends ToastOptions {
  title: string;
  description?: string;
  status: 'success' | 'error' | 'info' | 'warning';
}

const ToastMessage = ({
  title,
  description,
}: {
  title: ToastParams['title'];
  description: ToastParams['description'];
}) => (
  <div>
    <h4 className="text-lg font-semibold">{title}</h4>
    {description && <p className="text-sm">{description}</p>}
  </div>
);

export const useToast =
  () =>
  ({ title, description, status, ...props }: ToastParams) => {
    return toast[status](
      <ToastMessage title={title} description={description} />,
      {
        ...props,
      }
    );
  };
