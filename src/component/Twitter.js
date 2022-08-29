import React from 'react';

const Twitter = ({ username, children }) => <>{ children(username) }</>;

export default Twitter;