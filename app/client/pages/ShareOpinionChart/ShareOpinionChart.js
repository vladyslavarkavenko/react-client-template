import React from 'react';
import TextInput from '../../components/ui-components/Form/TextInput';
import Button from '../../components/ui-components/Form/Button';

export default function ShareOpinionChart() {
  return (
    <div>
      <Button>Cancel</Button>
      <TextInput title="Satisfaction" value={0} />
      <TextInput labelText="Importance" value={0} />
      <Button>Next</Button>
      <Button>Save</Button>
    </div>
  );
}
