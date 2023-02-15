// highlight text in the dom
const findDomElementWithParticularText = (domJSON: any, text: string) => {
  if (domJSON.text.includes(text)) {
    return domJSON;
  }

  for (let i = 0; i < domJSON.children.length; i++) {
    const child = domJSON.children[i];
    const found: any = findDomElementWithParticularText(child, text);

    if (found) {
      return found;
    }
  }
};

const highlightTextInDom = (domJSON: any, text: string) => {
  const domElement = findDomElementWithParticularText(domJSON, text);

  if (domElement) {
    const range = document.createRange();
    const selection: any = window.getSelection();

    range.selectNodeContents(domElement);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export default highlightTextInDom;
