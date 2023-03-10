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

  const allAnchorTags = findAllAnchorTags(json);

  anchorTags.push(...allAnchorTags);

  for (const anchorTag of anchorTags) {
    if (
      anchorTag.attributes.href.value.startsWith("/") ||
      anchorTag.attributes.href.value.startsWith("#")
    ) {
      routes.push(anchorTag.attributes.href.value);
    }
  }

  const uniqueRoutes = [...new Set<string>(routes)];

  return uniqueRoutes;
};

export default detectRoutes;
