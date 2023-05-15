
const domToJson = (dom: any) => {
  const children: any = Array.from(dom.children).map((child) => {
    return domToJson(child as any);
  });

  return {
    tagName: dom.tagName,
    attributes: dom.attributes,
    text: children.length === 0 ? dom.textContent : null,
    children,
  };
};

export default domToJson;
