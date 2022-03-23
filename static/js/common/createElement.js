export const createElement = (parent, tag, attribute) => {
    const element = document.createElement(tag);
    
    if(attribute) {
        for(let item in attribute) {
            element.setAttribute(item, attribute[item]);
        }
    }

    parent.appendChild(element);

    return element;
};
