import React from 'react';
import CreateCategory from './Create';

interface CategoryFormProps {
  form: any;
  onFinish: (values: any) => void;
  initialValues?: any;
}

const EditCategory: React.FC<CategoryFormProps> = (props) => {
  // For categories, Edit is currently same as Create
  return <CreateCategory {...props} />;
};

export default EditCategory;
