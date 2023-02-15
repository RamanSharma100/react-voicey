const findAllAnchorTags = (json: any): any[] => {
  const anchorTags: any[] = [];

  if (json.tagName.toLowerCase() === "a") {
    anchorTags.push(json);
  }

  for (const child of json.children) {
    anchorTags.push(...findAllAnchorTags(child));
  }

  return anchorTags;
};

const detectRoutes = (json: any): string[] => {
  const routes: string[] = [],
    anchorTags: any[] = [];

  anchorTags.push(...findAllAnchorTags(json));

  for (const anchorTag of anchorTags) {
    if (anchorTag.attributes.href) {
      routes.push(anchorTag.attributes.href);
    }
  }

  const uniqueRoutes = [...new Set<string>(routes)];

  return uniqueRoutes;
};

export default detectRoutes;
