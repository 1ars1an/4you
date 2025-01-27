import * as Form from '@radix-ui/react-form';
import { useState } from 'react';

const UpdateCat = ({ categoryId, updateCategory }) => {
  const [categoryInput, setCategoryInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    updateCategory(categoryId, categoryInput);
    setCategoryInput('');
  }

  return (
    <Form.Root onSubmit={(e) => handleSubmit(e)}>
      <Form.Field name="category">
        <div className="flex gap-5">
          <Form.Label>Update Name:</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              required
              className="box-border"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            ></input>
          </Form.Control>
        </div>
        <Form.Message match="valueMissing">
          Please enter new name!
        </Form.Message>
      </Form.Field>
      <Form.Submit asChild>
        <button>Update!</button>
      </Form.Submit>
    </Form.Root>
  );
};

export { UpdateCat };
