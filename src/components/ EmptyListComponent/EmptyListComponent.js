import React from 'react';
import emptyList from '../../assets/images/empty-list.png';

const CN = 'empty-list';

function EmptyListComponent() {
  return (
    <div className={CN}>

      <img src={emptyList} alt="errorImg" className={`${CN}__image`} />
      <h2 className={`${CN}__message`}>Sorry, we couldn`t find anything for you</h2>
    </div>
  );
}

export default EmptyListComponent;
