import React from 'react';
import MemberEntry from './member-entry.component';

const MemberList = ({
  selectedWorkspaceData,
  selectedWorkspace,
  searchMembers,
}) => (
  <div className='list'>
    <div className='list-header'>TEAM MEMBERS</div>
    <div className='list-sub-header'>
      <p>Name</p>
    </div>
    {Object.keys(selectedWorkspaceData).length !== 0 &&
      selectedWorkspaceData.workspaceMembers
        .filter((item) => {
          return searchMembers(item);
        })
        .map((member) => (
          <MemberEntry
            member={member}
            selectedWorkspace={selectedWorkspace}
            key={member.userId}
            workspaceOwnerId={selectedWorkspaceData.workspaceOwnerId}
            workspaceId={selectedWorkspaceData.workspaceId}
            userRole={selectedWorkspace.userRole}
          />
        ))}
  </div>
);

export default MemberList;
