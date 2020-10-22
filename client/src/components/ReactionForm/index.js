import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_REACTION } from '../../utils/mutations';

const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const [addReaction, { error }] = useMutation(ADD_REACTION);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // add reaction to database
      await addReaction({
        variables: { reactionBody, thoughtId },
      });
      // clean form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reaction to this thought..."
          className="form-input col-12 col-md-9"
          value={reactionBody}
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactionForm;
