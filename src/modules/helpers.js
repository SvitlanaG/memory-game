function createElement(tagName, className) {
  const elem = document.createElement(tagName);
  for (let i = 0; i < className.length; i++) {
    elem.classList.add(className[i]);
  }
  return elem;
}
export { createElement };
