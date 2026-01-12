import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
  title,
  description,
  children,
  className = '',
  ...props
}) => {
  return (
    <form
      className={`bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 ${className}`}
      {...props}
    >
      <div className="px-4 py-6 sm:p-8">
        {title && (
          <div className="mb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">{title}</h2>
            {description && <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>}
          </div>
        )}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </form>
  );
};

export default Form;