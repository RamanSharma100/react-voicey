const findTextInDom = (json: any, searchText: string): any => {
  if (json.text?.toLowerCase().includes(searchText.toLowerCase())) {
    console.log(`Found text "${searchText}" in tag "${json.tagName}"`);
    console.log(json.attributes);
    return json;
  }

  for (const child of json.children) {
    const found = findTextInDom(child, searchText);

    if (found) return found;
  }

  return false;
};

const findAllTextInDom = (json: any, searchText: string): any => {
  let foundElements = [];

  if (json.text?.toLowerCase().includes(searchText.toLowerCase())) {
    foundElements.push(json);
  }

  for (const child of json.children) {
    foundElements = foundElements.concat(findAllTextInDom(child, searchText));
  }

  return foundElements;
};

export { findTextInDom, findAllTextInDom };
