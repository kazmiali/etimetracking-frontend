export const filterReportArr = (
  item,
  clientFilter,
  categoryFilter,
  projectFilter,
) => {
  // console.log(item, clientFilter, categoryFilter, projectFilter);
  if (
    clientFilter === '' &&
    categoryFilter === '' &&
    projectFilter === ''
  ) {
    return true;
  }

  if (clientFilter !== '') {
    if (Object.keys(item.project).length !== 0) {
      if (Object.keys(item.project.projectClient).length !== 0) {
        return (
          clientFilter.toLowerCase() ===
          item.project.projectClient.clientName.toLowerCase()
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (categoryFilter !== '') {
    if (item.categories.length !== 0) {
      let check = false;

      item.categories.forEach((cat) => {
        if (cat.categoryName === categoryFilter) {
          check = true;
        }
      });

      return check;
    }
  }

  if (projectFilter !== '') {
    if (Object.keys(item.project).length !== 0) {
      return (
        projectFilter.toLowerCase() ===
        item.project.projectName.toLowerCase()
      );
    } else {
      return false;
    }
  }
};
