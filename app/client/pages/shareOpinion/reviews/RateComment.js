import React from 'react';
import CheckboxInput from '../../../components/ui-components/Form/CheckboxInput';

/* eslint-disable */
export default class RateComment extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeText({ currentTarget }) {
    const { handleChangeText } = this.props;
    handleChangeText(currentTarget.value);
  }

  render() {
    const { topic } = this.props;

    const { name, comment } = topic;

    const isChecked = true;

    return (
      <>
        <CheckboxInput labelText={name} />
        {/*<button type="button">File</button>*/}

        {isChecked && (
          <>
            {/*<input type="file" />*/}
            <p className="opinion-form__subtitle">Your comment</p>
            <textarea
              value={comment}
              onChange={this.handleChangeText}
              className="opinion-form__text"
              placeholder={`Please, describe your situation, action.\nWhat were the consequences?\nShare all your opinion about the situation.`}
            ></textarea>
          </>
        )}
      </>
    );
  }
}
