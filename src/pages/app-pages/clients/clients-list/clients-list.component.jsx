import React from 'react';
import ClientEntry from './client-entry.component';

const ClientsList = ({ clients, searchClients }) => {
  return (
    <div className='list'>
      <div className='list-header'>CLIENTS</div>
      {clients
        .filter((item) => {
          return searchClients(item);
        })
        .map((client) => (
          <ClientEntry client={client} key={client.clientId} />
        ))}
    </div>
  );
};

export default ClientsList;
