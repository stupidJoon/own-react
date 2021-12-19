function createElement(type, props, ...children) {
  return {
    type, props, children
  }
}
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      textContent: text
    },
    children: [],
  }
}

function render(element, container) {
  let dom = (element.type === 'TEXT_ELEMENT') ? document.createTextNode('') : document.createElement(element.type);

  Object
    .keys(element.props)
    .forEach((key) => {
      if (key === 'style') {
        Object
          .keys(element.props.style)
          .forEach((styleKey) => {
            dom.style[styleKey] = element.props.style[styleKey];
          });
        return;
      }
      dom[key] = element.props[key];
    });

  element.children.forEach((child) => {
    render(child, dom);
  });

  container.appendChild(dom);
}

const HelloWorld = createTextElement('Hello, World!');
const center = createElement('div', { style: { 'textAlign': 'center' } }, HelloWorld);

render(center, document.body);
