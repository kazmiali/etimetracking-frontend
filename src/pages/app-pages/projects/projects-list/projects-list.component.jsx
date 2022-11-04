import React from 'react';
import ProjectEntry from './project-entry.component';

const ProjectsList = ({ projects, searchProjects }) => {
  return (
    <div className='list'>
      <div className='list-header'>PROJECTS</div>
      {projects
        .filter((item) => {
          return searchProjects(item);
        })
        .map((project) => (
          <ProjectEntry project={project} key={project.projectId} />
        ))}
    </div>
  );
};

export default ProjectsList;
